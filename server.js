'use strict';

const express     = require('express');
const cors        = require('cors');
const path        = require('path');
const compression = require('compression');
const { spawn }   = require('child_process');
const pages       = require('./src/pages');
const { renderPage, renderBlogIndex } = require('./src/templates');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Gzip compression for all responses ─────────────────────────────────── */
app.use(compression());

/* ── Explicit routes for sitemap & robots (ensure correct MIME types) ────── */
app.get('/sitemap.xml', (_req, res) => {
  res.type('text/xml').sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

/* ── yt-dlp binary path ─────────────────────────────────────────────────── */
/* Always use the explicit path installed by Dockerfile curl step.           */
const YT_DLP = process.env.YT_DLP_PATH || '/usr/local/bin/yt-dlp';

/* ── Common yt-dlp flags (anti-block) ──────────────────────────────────── */
const BASE_ARGS = [
  '--no-warnings',
  '--no-check-certificates',
  '--no-cache-dir',
  '--user-agent',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  '--add-header', 'Accept-Language:en-US,en;q=0.9',
  '--add-header', 'Accept:text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
];

/* ── Middleware ─────────────────────────────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  etag:   true,
}));

/* ── Allowed hosts ──────────────────────────────────────────────────────── */
const ALLOWED_HOSTS = [
  'instagram.com',
  'www.instagram.com',
  'tiktok.com',
  'www.tiktok.com',
  'vm.tiktok.com',
  'vt.tiktok.com',
  'm.tiktok.com',
];

function isAllowedUrl(rawUrl) {
  try {
    const { hostname } = new URL(rawUrl);
    return ALLOWED_HOSTS.includes(hostname.toLowerCase());
  } catch {
    return false;
  }
}

function detectPlatform(rawUrl) {
  try {
    const { hostname } = new URL(rawUrl);
    if (hostname.includes('instagram')) return 'instagram';
    if (hostname.includes('tiktok'))    return 'tiktok';
  } catch {}
  return null;
}

/* ── Helper: run yt-dlp and collect stdout as string ───────────────────── */
function ytDlpJson(url) {
  return new Promise((resolve, reject) => {
    const args = [
      ...BASE_ARGS,
      '--dump-single-json',
      '--format', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
      url,
    ];

    console.log(`[yt-dlp] ${YT_DLP} ${args.join(' ')}`);

    const proc = spawn(YT_DLP, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => {
      stderr += d.toString();
      console.error('[yt-dlp stderr]', d.toString().trim());
    });

    proc.on('error', (err) => {
      console.error('[yt-dlp spawn error]', err.message);
      reject(new Error(`yt-dlp spawn failed: ${err.message}`));
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.error(`[yt-dlp] exited with code ${code}. stderr: ${stderr.slice(0, 500)}`);
        reject(new Error(`yt-dlp exited with code ${code}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        reject(new Error('Failed to parse yt-dlp JSON output'));
      }
    });
  });
}

/* ── POST /api/info ─────────────────────────────────────────────────────── */
app.post('/api/info', async (req, res) => {
  const { url } = req.body || {};

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'No URL provided.' });
  }

  const trimmed = url.trim();

  if (!isAllowedUrl(trimmed)) {
    return res.status(400).json({
      error: 'Invalid URL. Only Instagram and TikTok links are supported.',
    });
  }

  try {
    const info = await ytDlpJson(trimmed);

    return res.json({
      success:     true,
      title:       info.title       || 'video',
      thumbnail:   info.thumbnail   || '',
      duration:    info.duration    || 0,
      platform:    detectPlatform(trimmed),
      downloadUrl: `/api/download?url=${encodeURIComponent(trimmed)}`,
    });
  } catch (err) {
    console.error('[/api/info error]', err.message);
    return res.status(500).json({
      error: 'Could not grab this video. Make sure the URL is valid and the content is public.',
    });
  }
});

/* ── GET /api/download ──────────────────────────────────────────────────── */
app.get('/api/download', (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).send('Missing url parameter.');

  const decoded = decodeURIComponent(url);

  if (!isAllowedUrl(decoded)) return res.status(400).send('Invalid URL.');

  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="grabbvideos.mp4"');

  const args = [
    ...BASE_ARGS,
    '--format', 'best[ext=mp4]/best',
    '--output', '-',
    decoded,
  ];

  const proc = spawn(YT_DLP, args, { stdio: ['ignore', 'pipe', 'pipe'] });

  proc.stdout.pipe(res);

  proc.stderr.on('data', (chunk) => {
    console.error('[yt-dlp download stderr]', chunk.toString().trim());
  });

  proc.on('error', (err) => {
    console.error('[yt-dlp download spawn error]', err.message);
    if (!res.headersSent) res.status(500).end('Could not start download.');
  });

  proc.on('close', (code) => {
    if (code !== 0 && !res.headersSent) {
      res.status(500).end('Download failed.');
    }
  });

  req.on('close', () => {
    if (!proc.killed) proc.kill('SIGKILL');
  });
});

/* ── Tool pages ─────────────────────────────────────────────────────────── */
Object.entries(pages.tools).forEach(([slug, page]) => {
  app.get(`/${slug}`, (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(renderPage(page));
  });
});

/* ── Blog index ──────────────────────────────────────────────────────────── */
app.get('/blog', (_req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(renderBlogIndex(pages.blogs));
});

/* ── Blog posts ──────────────────────────────────────────────────────────── */
Object.entries(pages.blogs).forEach(([slug, page]) => {
  app.get(`/blog/${slug}`, (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(renderPage(page));
  });
});

/* ── i18n home pages ─────────────────────────────────────────────────────── */
Object.entries(pages.i18n).forEach(([lang, page]) => {
  app.get(`/${lang}`,  (_req, res) => res.send(renderPage(page)));
  app.get(`/${lang}/`, (_req, res) => res.send(renderPage(page)));
});

/* ── SPA fallback ───────────────────────────────────────────────────────── */
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* ── Start ──────────────────────────────────────────────────────────────── */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀  GrabbVideos running on port ${PORT}`);
  console.log(`    yt-dlp binary: ${YT_DLP}\n`);
});
