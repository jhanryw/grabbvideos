'use strict';

const express     = require('express');
const cors        = require('cors');
const path        = require('path');
const compression = require('compression');
const { spawn }   = require('child_process');
const pages       = require('./src/pages');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Compressão Gzip ────────────────────────────────────────────────────── */
app.use(compression());

/* ── Sitemap & Robots ───────────────────────────────────────────────────── */
app.get('/sitemap.xml', (_req, res) => {
  res.type('text/xml').sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

/* ── Configuração yt-dlp ────────────────────────────────────────────────── */
const YT_DLP = process.env.YT_DLP_PATH || '/usr/local/bin/yt-dlp';

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

/* ── Hosts Permitidos ───────────────────────────────────────────────────── */
const ALLOWED_HOSTS = [
  'instagram.com', 'www.instagram.com',
  'tiktok.com', 'www.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com', 'm.tiktok.com',
];

function isAllowedUrl(rawUrl) {
  try {
    const { hostname } = new URL(rawUrl);
    return ALLOWED_HOSTS.includes(hostname.toLowerCase());
  } catch { return false; }
}

function detectPlatform(rawUrl) {
  try {
    const { hostname } = new URL(rawUrl);
    if (hostname.includes('instagram')) return 'instagram';
    if (hostname.includes('tiktok'))    return 'tiktok';
  } catch {}
  return null;
}

/* ── Helper yt-dlp ──────────────────────────────────────────────────────── */
function ytDlpJson(url) {
  return new Promise((resolve, reject) => {
    const args = [
      ...BASE_ARGS,
      '--dump-single-json',
      '--format', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
      url,
    ];
    const proc = spawn(YT_DLP, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.on('close', (code) => {
      if (code !== 0) return reject(new Error(`Exit code ${code}`));
      try { resolve(JSON.parse(stdout)); } catch (e) { reject(e); }
    });
  });
}

/* ── API Endpoints ──────────────────────────────────────────────────────── */
app.post('/api/info', async (req, res) => {
  const { url } = req.body || {};
  if (!url || !isAllowedUrl(url)) return res.status(400).json({ error: 'URL inválida.' });

  try {
    const info = await ytDlpJson(url.trim());
    return res.json({
      success: true,
      title: info.title || 'video',
      thumbnail: info.thumbnail || '',
      platform: detectPlatform(url),
      downloadUrl: `/api/download?url=${encodeURIComponent(url.trim())}`,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao processar vídeo.' });
  }
});

app.get('/api/download', (req, res) => {
  const { url } = req.query;
  if (!url || !isAllowedUrl(decodeURIComponent(url))) return res.status(400).send('URL inválida.');

  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="grabbvideos.mp4"');

  const args = [...BASE_ARGS, '--format', 'best[ext=mp4]/best', '--output', '-', decodeURIComponent(url)];
  const proc = spawn(YT_DLP, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  proc.stdout.pipe(res);
  req.on('close', () => { if (!proc.killed) proc.kill(); });
});

/* ── Rotas Dinâmicas (i18n e SPA) ────────────────────────────────────────── */

// Rota para idiomas (/pt, /es, /en)
if (pages && pages.i18n) {
  Object.keys(pages.i18n).forEach((slug) => {
    app.get(`/${slug}`, (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  });
}

// Fallback para qualquer outra rota (Garante que o site não dê 404)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* ── Inicialização ──────────────────────────────────────────────────────── */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀  GrabbVideos rodando com sucesso na porta ${PORT}`);
  console.log(`    yt-dlp: ${YT_DLP}\n`);
});