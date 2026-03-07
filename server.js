/**
 * GrabbVideos — Backend
 * Node.js + Express + yt-dlp-exec
 *
 * ─── Installing yt-dlp on Linux (Ubuntu) ──────────────────────────────────
 *   sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
 *        -o /usr/local/bin/yt-dlp
 *   sudo chmod a+rx /usr/local/bin/yt-dlp
 *   yt-dlp --version            # verify
 *
 *   sudo apt install ffmpeg -y  # needed for some audio/video merge cases
 * ──────────────────────────────────────────────────────────────────────────
 */

'use strict';

const express   = require('express');
const cors      = require('cors');
const path      = require('path');
const { spawn } = require('child_process');
const ytDlpExec = require('yt-dlp-exec');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middleware ─────────────────────────────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));   // serves /public

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

/* ── POST /api/info ─────────────────────────────────────────────────────── */
/*  Validates the URL and extracts video metadata using yt-dlp-exec.         */
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
    const info = await ytDlpExec(trimmed, {
      dumpSingleJson:  true,
      noWarnings:      true,
      noCallHome:      true,
      noCheckCertificates: true,
      impersonate:     'chrome',   // bypass basic bot-detection blocks
      format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    });

    const title     = info.title     || 'video';
    const thumbnail = info.thumbnail || '';
    const duration  = info.duration  || 0;
    const platform  = detectPlatform(trimmed);

    return res.json({
      success:     true,
      title,
      thumbnail,
      duration,
      platform,
      downloadUrl: `/api/download?url=${encodeURIComponent(trimmed)}`,
    });
  } catch (err) {
    console.error('[/api/info error]', err.message || err);
    return res.status(500).json({
      error:
        'Could not grab this video. Make sure the URL is valid and the content is public.',
    });
  }
});

/* ── GET /api/download ──────────────────────────────────────────────────── */
/*  Streams the video file directly to the client via yt-dlp stdout pipe.    */
app.get('/api/download', (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Missing url parameter.');
  }

  const decoded = decodeURIComponent(url);

  if (!isAllowedUrl(decoded)) {
    return res.status(400).send('Invalid URL.');
  }

  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="grabbvideos.mp4"');

  /*
   * yt-dlp flags:
   *   --no-warnings         suppress non-fatal warnings
   *   --no-check-certificates  avoid SSL issues in containers
   *   --impersonate chrome  mimic a real Chrome browser request (anti-block)
   *   --no-cache-dir        safe for containerised / read-only environments
   *   --format              prefer a ready-merged MP4 (no ffmpeg merge needed)
   *   --output  -           write video to stdout so we can pipe it to Express
   */
  const args = [
    '--no-warnings',
    '--no-check-certificates',
    '--impersonate', 'chrome',
    '--no-cache-dir',
    '--format', 'best[ext=mp4]/best',
    '--output', '-',
    decoded,
  ];

  const ytDlpProcess = spawn('yt-dlp', args, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  ytDlpProcess.stdout.pipe(res);

  ytDlpProcess.stderr.on('data', (chunk) => {
    console.error('[yt-dlp stderr]', chunk.toString().trim());
  });

  ytDlpProcess.on('error', (err) => {
    console.error('[yt-dlp spawn error]', err.message);
    if (!res.headersSent) {
      res.status(500).end('Internal server error: could not start download.');
    }
  });

  ytDlpProcess.on('close', (code) => {
    if (code !== 0 && !res.headersSent) {
      res.status(500).end('yt-dlp exited with an error.');
    }
  });

  // Kill the child process if the client disconnects early
  req.on('close', () => {
    if (!ytDlpProcess.killed) ytDlpProcess.kill('SIGKILL');
  });
});

/* ── SPA fallback ───────────────────────────────────────────────────────── */
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* ── Start ──────────────────────────────────────────────────────────────── */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀  GrabbVideos running on port ${PORT}\n`);
});
