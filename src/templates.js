'use strict';

/* ══════════════════════════════════════════════════════════════════════
   GrabbVideos — Server-Side HTML Template Engine
══════════════════════════════════════════════════════════════════════ */

const NATIVE_KEY = 'fcc8eca8dd1c8f4a00aad6769e6ad0a2';
const NATIVE_SRC = 'https://pl28866342.effectivegatecpm.com/fcc8eca8dd1c8f4a00aad6769e6ad0a2/invoke.js';
const BANNER_KEY = 'bdaf2212efd1c570eb92747dc8a4ae59';
const BANNER_SRC = 'https://www.highperformanceformat.com/bdaf2212efd1c570eb92747dc8a4ae59/invoke.js';
const MOBILE_KEY = '3660345d7ec8fd060c0beee5d3e4928f';
const MOBILE_SRC = 'https://www.highperformanceformat.com/3660345d7ec8fd060c0beee5d3e4928f/invoke.js';
const SOCIAL_SRC = 'https://pl28866350.effectivegatecpm.com/07/21/32/0721323b213d354fd931d51a9c5646cb.js';
const POPUNDER_SRC = 'https://pl28866286.effectivegatecpm.com/03/d2/e2/03d2e2d61f7507bbd6093e225204c195.js';
const SITE = 'https://grabbvideos.com';

/* ── Shared CSS (written once, injected in every page) ─────────────── */
const SHARED_CSS = `
  :root{--bg:#fff;--surf:#f9f9f9;--surf2:#f3f3f3;--border:#e5e5e3;--accent:#7c3aed}
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:#1a1a1a;padding-bottom:60px}
  @media(min-width:768px){body{padding-bottom:0}}
  .hero-gradient{background:linear-gradient(160deg,#1a1040 0%,#3b1d8a 55%,#5b1fa8 100%)}
  .card{background:var(--surf);border:1px solid var(--border);border-radius:1rem}
  #urlInput{background:var(--surf2);border:1.5px solid var(--border);color:#1a1a1a;border-radius:.75rem;transition:border-color .2s,box-shadow .2s}
  #urlInput::placeholder{color:#767676}
  #urlInput:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(124,58,237,.25)}
  @keyframes spin{to{transform:rotate(360deg)}}
  .spinner{animation:spin .85s linear infinite}
  .fade-in{animation:fadeIn .35s ease both}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .ig-badge{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)}
  .tt-badge{background:#111;border:1px solid #333}
  .ad-label{font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#595959;text-align:center;margin-bottom:.3rem}
  .banner-wrap{display:flex;justify-content:center;overflow:hidden}
  .rec-box{background:var(--surf);border:1px solid var(--border);border-radius:.75rem;overflow:hidden}
  .rec-header{padding:.5rem 1rem;border-bottom:1px solid var(--border);font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;color:#595959;display:flex;align-items:center;gap:.5rem}
  .rec-header::before,.rec-header::after{content:'';flex:1;height:1px;background:var(--border)}
  .loading-ad-box{background:var(--surf2);border:1px solid var(--border);border-radius:.75rem;overflow:hidden;padding:.5rem}
  .faq-item{border-bottom:1px solid var(--border)}
  .faq-item:last-child{border-bottom:none}
  .result-bg{background:#ecfdf5;border:1px solid #bbf7d0}
  .error-bg{background:#fef2f2;border:1px solid #fecaca}
  #sticky-anchor{position:fixed;bottom:0;left:0;right:0;z-index:100;display:flex;justify-content:center;align-items:center;background:#f9f9f9;border-top:1px solid var(--border);height:60px;padding:5px 0}
  @media(min-width:768px){#sticky-anchor{display:none}}
  /* Blog styles */
  .blog-layout{display:grid;grid-template-columns:1fr;gap:2rem}
  @media(min-width:1024px){.blog-layout{grid-template-columns:1fr 340px}}
  .blog-sidebar-inner{position:sticky;top:1.5rem}
  .blog-article{max-width:none}
  .blog-article h2{font-size:1.2rem;font-weight:700;color:#111;margin:1.8rem 0 .6rem}
  .blog-article h3{font-size:1rem;font-weight:600;color:#1a1a1a;margin:1.2rem 0 .4rem}
  .blog-article p{color:#374151;font-size:.9rem;line-height:1.7;margin:.5rem 0}
  .blog-article ul,.blog-article ol{color:#374151;font-size:.9rem;line-height:1.8;padding-left:1.4rem;margin:.5rem 0}
  .blog-article li{margin:.3rem 0}
  .blog-article strong{color:#111;font-weight:600}
  .blog-article code{font-size:.78rem;background:#f3f3f3;padding:.1rem .35rem;border-radius:.3rem;color:#6d28d9}
  .blog-article a{color:#7c3aed;text-decoration:underline}
  .blog-lead{font-size:1rem!important;color:#111!important;font-weight:500;line-height:1.7!important}
  .blog-meta{display:flex;gap:.75rem;align-items:center;flex-wrap:wrap;margin:1rem 0 1.5rem}
  .blog-meta span{font-size:.72rem;color:#6b7280}
  .blog-cat{background:#ede9fe;color:#5b21b6;font-size:.65rem;font-weight:600;padding:.2rem .6rem;border-radius:9999px;text-transform:uppercase;letter-spacing:.06em}
  .breadcrumb{font-size:.72rem;color:#6b7280;margin-bottom:1rem}
  .breadcrumb a{color:#7c3aed;text-decoration:none}
  .breadcrumb a:hover{text-decoration:underline}
  .tool-table{width:100%;border-collapse:collapse;font-size:.82rem;margin:.75rem 0 1.25rem}
  .tool-table th,.tool-table td{padding:.5rem .75rem;border:1px solid var(--border);text-align:left}
  .tool-table th{background:var(--surf2);font-weight:600;color:#1a1a1a;width:40%}
  .tool-table td{color:#374151}
  .cta-link{display:inline-block;background:#7c3aed;color:#fff;font-weight:700;padding:.5rem 1.2rem;border-radius:.75rem;text-decoration:none;font-size:.85rem;margin:.5rem 0}
  .cta-link:hover{background:#6d28d9}
  .faq-block{margin:.75rem 0}
  .faq-q{font-weight:600;color:#111;font-size:.87rem;margin-top:1rem;margin-bottom:.25rem}
  .faq-a{color:#4b5563;font-size:.83rem;line-height:1.65}
  /* Sidebar download form */
  .sidebar-card{background:var(--surf);border:1px solid var(--border);border-radius:1rem;padding:1.25rem}
  .sidebar-input{background:var(--surf2);border:1.5px solid var(--border);color:#1a1a1a;border-radius:.65rem;transition:border-color .2s,box-shadow .2s;width:100%;padding:.75rem 1rem;font-size:.83rem}
  .sidebar-input::placeholder{color:#767676}
  .sidebar-input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(124,58,237,.2)}
  /* Tool page */
  .tool-hero{background:#f5f3ff;border-bottom:1px solid #ede9fe;padding:2rem 0}
`;

/* ── Reusable HTML fragments ────────────────────────────────────────── */
function igSvg() {
  return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
}

function ttSvg() {
  return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`;
}

function downloadSvg() {
  return `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`;
}

/* ── Head section ───────────────────────────────────────────────────── */
function renderHead(page) {
  const ldJson = page.type === 'blog'
    ? `{"@context":"https://schema.org","@type":"Article","headline":${JSON.stringify(page.h1)},"description":${JSON.stringify(page.description)},"url":${JSON.stringify(page.canonical)},"datePublished":${JSON.stringify(page.datePublished)},"dateModified":${JSON.stringify(page.dateModified)},"author":{"@type":"Organization","name":"GrabbVideos","url":"${SITE}"},"publisher":{"@type":"Organization","name":"GrabbVideos","url":"${SITE}"}}`
    : `{"@context":"https://schema.org","@type":"WebApplication","name":"GrabbVideos","url":${JSON.stringify(page.canonical)},"description":${JSON.stringify(page.description)},"applicationCategory":"UtilitiesApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}`;

  return `<!DOCTYPE html>
<html lang="${page.lang || 'en'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(page.title)}</title>
  <meta name="description" content="${escAttr(page.description)}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="GrabbVideos" />
  <link rel="canonical" href="${escAttr(page.canonical)}" />
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="${escAttr(page.canonical)}" />
  <meta property="og:title"       content="${escAttr(page.title)}" />
  <meta property="og:description" content="${escAttr(page.description)}" />
  <meta property="og:image"       content="${escAttr(page.ogImage || SITE + '/og-image.png')}" />
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${escAttr(page.title)}" />
  <meta name="twitter:description" content="${escAttr(page.description)}" />
  <meta name="twitter:image"       content="${escAttr(page.ogImage || SITE + '/og-image.png')}" />
  <script type="application/ld+json">${ldJson}</script>
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  <link rel="preconnect" href="https://scripts.clarity.ms" />
  <link rel="preconnect" href="https://pl28866342.effectivegatecpm.com" crossorigin />
  <link rel="preconnect" href="https://www.highperformanceformat.com" crossorigin />
  <script async data-cfasync="false" src="${NATIVE_SRC}"></script>
  <script>
    window.addEventListener('load', function() {
      (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","vs3g2w2n2i");
    });
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-J0QCK44RS8"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-J0QCK44RS8');</script>
  <link rel="stylesheet" href="/styles.css" />
  <style>${SHARED_CSS}</style>
</head>`;
}

/* ── Sitewide navigation header ─────────────────────────────────────── */
function renderHeader(page) {
  const isHome = !page.slug || page.slug === 'pt' || page.slug === 'es' || page.slug === 'de';
  const showBanner = true;

  return `
<header class="hero-gradient text-white">
  <div class="max-w-4xl mx-auto px-4 pt-6 pb-8 text-center">
    <a href="/" class="inline-flex items-center gap-2 mb-4">
      <svg class="w-8 h-8" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="9" fill="white" fill-opacity=".12"/><path d="M12 28V16l8-6 8 6v12H24v-7h-8v7H12Z" fill="white"/></svg>
      <span class="text-xl font-extrabold tracking-tight">GrabbVideos</span>
    </a>
    ${showBanner ? `
    <div class="hidden md:flex justify-center my-3">
      <div>
        <div class="ad-label" style="color:#c4b5fd">Advertisement</div>
        <script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script>
        <script async src="${BANNER_SRC}"></script>
      </div>
    </div>` : ''}
    <nav class="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-purple-200/70 mt-2">
      <a href="/" class="hover:text-white transition-colors">Home</a>
      <a href="/reels-downloader" class="hover:text-white transition-colors">Reels</a>
      <a href="/story-saver" class="hover:text-white transition-colors">Stories</a>
      <a href="/photo-downloader" class="hover:text-white transition-colors">Photos</a>
      <a href="/video-downloader" class="hover:text-white transition-colors">Videos</a>
      <a href="/blog" class="hover:text-white transition-colors">Blog</a>
    </nav>
  </div>
</header>`;
}

/* ── Download widget (shared across all page types) ─────────────────── */
function renderDownloadWidget(opts = {}) {
  const placeholder = opts.placeholder || 'https://www.instagram.com/p/… or https://www.tiktok.com/@…';
  const btnLabel    = opts.btnLabel    || 'Grab Video';
  const processing  = opts.processing  || 'Processing…';
  const grabbing    = opts.grabbing    || 'Grabbing your video…';
  const videoReady  = opts.videoReady  || '✓ Video ready';
  const downloadBtn = opts.downloadBtn || 'Download MP4';
  const idPrefix    = opts.idPrefix    || '';

  return `
  <div id="${idPrefix}urlInput" class="flex flex-col sm:flex-row gap-2.5">
    <input
      id="${idPrefix}urlField"
      type="url"
      placeholder="${escAttr(placeholder)}"
      class="flex-1 px-4 py-3 text-sm sidebar-input"
      autocomplete="off"
      spellcheck="false"
    />
    <button
      id="${idPrefix}downloadBtn"
      class="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-bold px-5 py-3 rounded-xl transition-all duration-200 text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
    >
      ${downloadSvg()}
      <span id="${idPrefix}btnLabel">${escHtml(btnLabel)}</span>
    </button>
  </div>

  <div id="${idPrefix}loadingState" class="hidden mt-4 fade-in">
    <div class="flex flex-col items-center gap-2 mb-4">
      <div class="relative w-10 h-10">
        <div class="spinner absolute inset-0 rounded-full border-[3px] border-violet-200 border-t-violet-600"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/></svg>
        </div>
      </div>
      <p class="text-gray-900 font-semibold text-sm">${escHtml(grabbing)}</p>
      <p class="text-[#6b7280] text-xs" id="${idPrefix}countdownText">Please wait</p>
    </div>
    <div class="loading-ad-box">
      <p class="text-center text-[10px] text-[#595959] uppercase tracking-widest mb-2" aria-hidden="true">Sponsored — While you wait</p>
      <div class="banner-wrap">
        <div class="hidden md:block"><script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script><script src="${BANNER_SRC}"></script></div>
        <div class="block md:hidden"><script>atOptions={'key':'${MOBILE_KEY}','format':'iframe','height':50,'width':320,'params':{}};</script><script src="${MOBILE_SRC}"></script></div>
      </div>
    </div>
  </div>

  <div id="${idPrefix}resultState" class="hidden mt-4 fade-in">
    <div class="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl result-bg">
      <img id="${idPrefix}thumbnail" src="" alt="Video thumbnail" width="90" height="64" class="w-24 h-16 object-cover rounded-lg flex-shrink-0" onerror="this.style.display='none'" />
      <div class="flex-1 text-center sm:text-left min-w-0">
        <p class="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-0.5">${escHtml(videoReady)}</p>
        <p id="${idPrefix}videoTitle" class="font-semibold text-gray-900 text-xs mb-1 line-clamp-2"></p>
        <p id="${idPrefix}videoDuration" class="text-xs text-[#6b7280] mb-2"></p>
        <a id="${idPrefix}downloadLink" href="#" class="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg transition-all text-xs shadow" download="grabbvideos.mp4">
          ${downloadSvg()} ${escHtml(downloadBtn)}
        </a>
      </div>
    </div>
  </div>

  <div id="${idPrefix}errorState" class="hidden mt-4 fade-in">
    <div class="flex items-start gap-2 p-3 rounded-xl error-bg">
      <svg class="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 8v4m0 4h.01"/></svg>
      <div>
        <p class="font-semibold text-red-700 text-xs mb-0.5">Could not grab this video</p>
        <p id="${idPrefix}errorMessage" class="text-red-500 text-xs"></p>
      </div>
    </div>
  </div>`;
}

/* ── Shared footer ──────────────────────────────────────────────────── */
function renderFooter() {
  return `
<footer style="background:#f3f4f6;border-top:1px solid #e5e5e3;" class="text-[#595959] py-8 px-4 mt-8">
  <div class="max-w-5xl mx-auto text-center space-y-3">
    <p class="text-gray-900 font-bold tracking-tight">GrabbVideos</p>
    <p class="text-xs max-w-md mx-auto">Free tool to download Instagram and TikTok videos. Only download content you own or have permission to use.</p>
    <div class="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs pt-1">
      <a href="/" class="hover:text-gray-900 transition-colors">Home</a>
      <a href="/reels-downloader" class="hover:text-gray-900 transition-colors">Reels Downloader</a>
      <a href="/story-saver" class="hover:text-gray-900 transition-colors">Story Saver</a>
      <a href="/photo-downloader" class="hover:text-gray-900 transition-colors">Photo Downloader</a>
      <a href="/video-downloader" class="hover:text-gray-900 transition-colors">Video Downloader</a>
      <a href="/blog" class="hover:text-gray-900 transition-colors">Blog</a>
      <a href="/privacy.html" class="hover:text-gray-900 transition-colors">Privacy</a>
      <a href="/terms.html" class="hover:text-gray-900 transition-colors">Terms</a>
      <a href="mailto:hello@grabbvideos.com" class="hover:text-gray-900 transition-colors">Contact</a>
    </div>
    <div class="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs pt-1">
      <a href="/pt" class="hover:text-gray-900 transition-colors">Português</a>
      <a href="/es" class="hover:text-gray-900 transition-colors">Español</a>
      <a href="/de" class="hover:text-gray-900 transition-colors">Deutsch</a>
    </div>
    <p class="text-xs text-[#595959]">© <span id="year"></span> GrabbVideos. All rights reserved.</p>
  </div>
</footer>`;
}

/* ── Sticky anchor + bottom scripts ─────────────────────────────────── */
function renderStickyAndScripts(extraJs = '') {
  return `
<div id="sticky-anchor">
  <script>atOptions={'key':'${MOBILE_KEY}','format':'iframe','height':50,'width':320,'params':{}};</script>
  <script async src="${MOBILE_SRC}"></script>
</div>

<script async src="${SOCIAL_SRC}"></script>
<script async src="${POPUNDER_SRC}"></script>

<script>
document.getElementById('year').textContent = new Date().getFullYear();

function makeDownloadWidget(prefix) {
  const urlField    = document.getElementById(prefix + 'urlField');
  const btn         = document.getElementById(prefix + 'downloadBtn');
  const btnLbl      = document.getElementById(prefix + 'btnLabel');
  const countdown   = document.getElementById(prefix + 'countdownText');
  if (!urlField || !btn) return;

  function fmt(secs) {
    if (!secs) return '';
    const m = Math.floor(secs/60), s = Math.floor(secs%60);
    return 'Duration: ' + m + ':' + String(s).padStart(2,'0');
  }
  function show(id) {
    ['loadingState','resultState','errorState'].forEach(n => {
      var el = document.getElementById(prefix + n);
      if (el) el.classList.add('hidden');
    });
    if (id) { var el = document.getElementById(prefix + id); if (el) el.classList.remove('hidden'); }
  }
  function tick(secs) {
    return new Promise(function(resolve) {
      var t = secs;
      countdown.textContent = 'Please wait ' + t + 's\u2026';
      var iv = setInterval(function() {
        t--;
        if (t <= 0) { clearInterval(iv); countdown.textContent = 'Almost there!'; resolve(); }
        else { countdown.textContent = 'Please wait ' + t + 's\u2026'; }
      }, 1000);
    });
  }
  async function grab() {
    var url = urlField.value.trim();
    if (!url) { urlField.focus(); return; }
    show('loadingState');
    btn.disabled = true;
    btnLbl.textContent = 'Processing\u2026';
    await tick(3);
    try {
      var resp = await fetch('/api/info', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({url}) });
      var data = await resp.json();
      if (!resp.ok || !data.success) throw new Error(data.error || 'Could not process this video.');
      var thumb = document.getElementById(prefix + 'thumbnail');
      var title = document.getElementById(prefix + 'videoTitle');
      var dur   = document.getElementById(prefix + 'videoDuration');
      var link  = document.getElementById(prefix + 'downloadLink');
      if (thumb) thumb.src = data.thumbnail || '';
      if (title) title.textContent = data.title || 'Video';
      if (dur)   dur.textContent   = fmt(data.duration);
      if (link)  link.href         = data.downloadUrl;
      show('resultState');
    } catch(err) {
      var errEl = document.getElementById(prefix + 'errorMessage');
      if (errEl) errEl.textContent = err.message || 'An unexpected error occurred.';
      show('errorState');
    } finally {
      btn.disabled = false;
      btnLbl.textContent = btn.dataset.label || 'Grab Video';
    }
  }
  btn.addEventListener('click', grab);
  urlField.addEventListener('keydown', function(e) { if (e.key === 'Enter') grab(); });
  urlField.addEventListener('paste', function() { setTimeout(function() { if (urlField.value.trim()) grab(); }, 120); });
}

makeDownloadWidget('');
makeDownloadWidget('sb_');
${extraJs}
</script>`;
}

/* ══════════════════════════════════════════════════════════════════════
   TOOL PAGE RENDERER
══════════════════════════════════════════════════════════════════════ */
function renderToolPage(page) {
  const igBadge = page.platform !== 'tiktok' ? `
  <span class="ig-badge flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full">${igSvg()} Instagram</span>` : '';
  const ttBadge = page.platform !== 'instagram' ? `
  <span class="text-purple-400 text-lg font-thin">+</span>
  <span class="tt-badge flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full">${ttSvg()} TikTok</span>` : '';

  const howToSteps = page.howTo.map((s, i) => {
    const badge = `bg-violet-100 text-violet-700 border-violet-200`;
    const midAd = (i === 1 && page.howTo.length > 2) ? `
    <div class="rec-box my-4">
      <div class="rec-header">Recommended Content</div>
      <div class="p-3"><div id="container-${NATIVE_KEY}"></div></div>
    </div>` : '';
    return `
    <li class="flex gap-3">
      <span class="flex-shrink-0 w-7 h-7 ${badge} rounded-full flex items-center justify-center font-bold text-xs border">${s.step}</span>
      <div>
        <p class="font-semibold text-gray-900 text-sm">${escHtml(s.title)}</p>
        <p class="text-[#6b7280] text-xs mt-0.5">${escHtml(s.desc)}</p>
      </div>
    </li>${midAd}`;
  }).join('');

  const faqItems = page.faq.map((f, i) => `
  <div class="${i < page.faq.length - 1 ? 'faq-item' : ''} py-4">
    <h3 class="font-semibold text-gray-900 text-sm mb-1">${escHtml(f.q)}</h3>
    <p class="text-[#6b7280] text-xs leading-relaxed">${escHtml(f.a)}</p>
  </div>`).join('');

  return renderHead(page) + `
<body class="font-sans antialiased min-h-screen">
${renderHeader(page)}

<div class="tool-hero">
  <div class="max-w-4xl mx-auto px-4 text-center py-2">
    <div class="flex items-center justify-center gap-2 mb-3">${igBadge}${ttBadge}</div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">${escHtml(page.h1)}</h1>
    <p class="text-[#6b7280] text-sm max-w-lg mx-auto">${escHtml(page.subtitle)}</p>
  </div>
</div>

<main class="max-w-4xl mx-auto px-4 py-8 space-y-6">

  <section class="card p-5 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 text-center mb-1">Paste your video link below</h2>
    <p class="text-[#6b7280] text-center text-xs mb-5">${escHtml(page.inputPlaceholder || 'Instagram · TikTok')}</p>
    ${renderDownloadWidget({ placeholder: page.inputPlaceholder, btnLabel: 'Grab Video' })}
    <div class="mt-5 rec-box">
      <div class="rec-header">Recommended Content</div>
      <div class="p-3"><div id="container-${NATIVE_KEY}-tool"></div></div>
    </div>
  </section>

  <div class="my-6">
    <p class="ad-label mb-2">Advertisement</p>
    <div class="banner-wrap">
      <div class="hidden md:block"><script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script><script src="${BANNER_SRC}"></script></div>
      <div class="block md:hidden"><script>atOptions={'key':'${MOBILE_KEY}','format':'iframe','height':50,'width':320,'params':{}};</script><script src="${MOBILE_SRC}"></script></div>
    </div>
  </div>

  <section class="card p-5 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 mb-5">How to use the ${escHtml(page.h1)}</h2>
    <ol class="space-y-4">${howToSteps}</ol>
  </section>

  <section class="card p-5 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
    <div>${faqItems}</div>
  </section>

  <div class="my-6">
    <p class="ad-label mb-2">Sponsored</p>
    <div class="rec-box p-3">
      <div class="banner-wrap">
        <div class="hidden md:block"><script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script><script src="${BANNER_SRC}"></script></div>
        <div class="block md:hidden"><script>atOptions={'key':'${MOBILE_KEY}','format':'iframe','height':50,'width':320,'params':{}};</script><script src="${MOBILE_SRC}"></script></div>
      </div>
    </div>
  </div>

</main>
${renderFooter()}
${renderStickyAndScripts()}
</body></html>`;
}

/* ══════════════════════════════════════════════════════════════════════
   BLOG PAGE RENDERER
══════════════════════════════════════════════════════════════════════ */
function renderBlogPage(page) {
  const articleSchema = `{"@context":"https://schema.org","@type":"Article","headline":${JSON.stringify(page.h1)},"description":${JSON.stringify(page.description)},"url":${JSON.stringify(page.canonical)},"datePublished":${JSON.stringify(page.datePublished)},"dateModified":${JSON.stringify(page.dateModified)},"author":{"@type":"Organization","name":"GrabbVideos","url":"${SITE}"},"publisher":{"@type":"Organization","name":"GrabbVideos","url":"${SITE}"}}`;
  const breadcrumbSchema = `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE}"},{"@type":"ListItem","position":2,"name":"Blog","item":"${SITE}/blog"},{"@type":"ListItem","position":3,"name":${JSON.stringify(page.h1)},"item":${JSON.stringify(page.canonical)}}]}`;

  return renderHead(page) + `
<body class="font-sans antialiased min-h-screen">
${renderHeader(page)}

<main class="max-w-6xl mx-auto px-4 py-8">

  <!-- Breadcrumb -->
  <nav class="breadcrumb mb-4" aria-label="Breadcrumb">
    <a href="/">Home</a> › <a href="/blog">Blog</a> › ${escHtml(page.category)}
  </nav>

  <div class="blog-layout">

    <!-- ── ARTICLE ──────────────────────────────────────────────── -->
    <article class="blog-article card p-5 sm:p-8">
      <div class="blog-meta">
        <span class="blog-cat">${escHtml(page.category)}</span>
        <span>${formatDate(page.datePublished)}</span>
        <span>·</span>
        <span>${escHtml(page.readingTime)}</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug mb-5">${escHtml(page.h1)}</h1>
      ${page.bodyHtml}
    </article>

    <!-- ── SIDEBAR ──────────────────────────────────────────────── -->
    <aside>
      <div class="blog-sidebar-inner space-y-4">

        <!-- Download widget -->
        <div class="sidebar-card">
          <h3 class="font-bold text-gray-900 text-sm mb-1">Download a Video Now</h3>
          <p class="text-[#6b7280] text-xs mb-3">Free · No watermark · No signup</p>
          ${renderDownloadWidget({ idPrefix: 'sb_', placeholder: 'Paste Instagram or TikTok URL…', btnLabel: 'Grab Video' })}
        </div>

        <!-- Quick links -->
        <div class="sidebar-card">
          <p class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Quick Tools</p>
          <ul class="space-y-2 text-xs">
            <li><a href="/reels-downloader" class="text-violet-600 hover:text-violet-800 font-medium">→ Reels Downloader</a></li>
            <li><a href="/story-saver" class="text-violet-600 hover:text-violet-800 font-medium">→ Story Saver</a></li>
            <li><a href="/photo-downloader" class="text-violet-600 hover:text-violet-800 font-medium">→ Photo Downloader</a></li>
            <li><a href="/video-downloader" class="text-violet-600 hover:text-violet-800 font-medium">→ Video Downloader</a></li>
          </ul>
        </div>

        <!-- Sidebar banner -->
        <div class="text-center">
          <p class="ad-label mb-2">Advertisement</p>
          <div class="hidden md:block"><script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script><script src="${BANNER_SRC}"></script></div>
          <div class="block md:hidden"><script>atOptions={'key':'${MOBILE_KEY}','format':'iframe','height':50,'width':320,'params':{}};</script><script src="${MOBILE_SRC}"></script></div>
        </div>

        <!-- Related posts -->
        <div class="sidebar-card">
          <p class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Related Articles</p>
          <ul class="space-y-2 text-xs">
            <li><a href="/blog/how-to-download-instagram-reels-android-iphone" class="text-[#374151] hover:text-violet-600">Download Reels on Android & iPhone</a></li>
            <li><a href="/blog/how-to-view-instagram-stories-anonymously" class="text-[#374151] hover:text-violet-600">View Stories Anonymously</a></li>
            <li><a href="/blog/best-instagram-video-downloader-pc-2026" class="text-[#374151] hover:text-violet-600">Best Downloader for PC 2026</a></li>
            <li><a href="/blog/how-to-download-private-instagram-videos" class="text-[#374151] hover:text-violet-600">Private Instagram Videos</a></li>
          </ul>
        </div>

      </div>
    </aside>

  </div>
</main>

<script type="application/ld+json">${articleSchema}</script>
<script type="application/ld+json">${breadcrumbSchema}</script>

${renderFooter()}
${renderStickyAndScripts()}
</body></html>`;
}

/* ══════════════════════════════════════════════════════════════════════
   BLOG INDEX PAGE RENDERER
══════════════════════════════════════════════════════════════════════ */
function renderBlogIndex(blogs) {
  const page = {
    lang: 'en',
    type: 'blog-index',
    canonical: `${SITE}/blog`,
    title: 'GrabbVideos Blog — Instagram & TikTok Tips, Guides & Reviews',
    description: 'Expert guides on downloading Instagram Reels, Stories, and TikTok videos. Tips, reviews, and tutorials for social media power users.',
    ogImage: `${SITE}/og-image.png`,
    h1: 'GrabbVideos Blog',
  };

  const cards = Object.values(blogs).map(b => `
  <a href="/blog/${b.slug}" class="card p-5 hover:shadow-md transition-shadow block">
    <span class="blog-cat">${escHtml(b.category)}</span>
    <h2 class="text-gray-900 font-bold text-base mt-2 mb-1 leading-snug">${escHtml(b.h1)}</h2>
    <p class="text-[#6b7280] text-xs leading-relaxed line-clamp-2">${escHtml(b.description)}</p>
    <p class="text-xs text-[#9ca3af] mt-3">${formatDate(b.datePublished)} · ${escHtml(b.readingTime)}</p>
  </a>`).join('');

  return renderHead(page) + `
<body class="font-sans antialiased min-h-screen">
${renderHeader(page)}
<main class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl font-extrabold text-gray-900 mb-2">GrabbVideos Blog</h1>
  <p class="text-[#6b7280] text-sm mb-8">Instagram & TikTok tips, guides, and reviews.</p>
  <div class="grid sm:grid-cols-2 gap-4">${cards}</div>
</main>
${renderFooter()}
${renderStickyAndScripts()}
</body></html>`;
}

/* ══════════════════════════════════════════════════════════════════════
   i18n HOME PAGE RENDERER
══════════════════════════════════════════════════════════════════════ */
function renderI18nPage(page) {
  const featureIcons = [
    `<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
    `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
    `<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>`,
    `<path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>`,
    `<path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>`,
    `<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>`,
  ];

  const featureCards = page.features.map((f, i) => `
  <div class="flex flex-col items-center text-center gap-2 p-3 rounded-xl" style="background:var(--surf2)">
    <div class="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center border border-violet-200">
      <svg class="w-5 h-5 text-violet-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${featureIcons[i] || featureIcons[0]}</svg>
    </div>
    <p class="text-gray-900 font-semibold text-sm">${escHtml(f.title)}</p>
    <p class="text-[#6b7280] text-xs">${escHtml(f.desc)}</p>
  </div>`).join('');

  const steps = page.steps.map((s, i) => `
  <li class="flex gap-3">
    <span class="flex-shrink-0 w-7 h-7 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-xs border border-violet-200">${i + 1}</span>
    <div>
      <p class="font-semibold text-gray-900 text-sm">${escHtml(s.title)}</p>
      <p class="text-[#6b7280] text-xs mt-0.5">${escHtml(s.desc)}</p>
    </div>
  </li>`).join('');

  const faqItems = page.faq.map((f, i) => `
  <div class="${i < page.faq.length - 1 ? 'faq-item' : ''} py-4">
    <h3 class="font-semibold text-gray-900 text-sm mb-1">${escHtml(f.q)}</h3>
    <p class="text-[#6b7280] text-xs leading-relaxed">${escHtml(f.a)}</p>
  </div>`).join('');

  return renderHead(page) + `
<body class="font-sans antialiased min-h-screen">
<header class="hero-gradient text-white">
  <div class="max-w-4xl mx-auto px-4 pt-8 pb-10 text-center">
    <a href="/" class="inline-flex items-center gap-2 mb-4">
      <svg class="w-8 h-8" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="9" fill="white" fill-opacity=".12"/><path d="M12 28V16l8-6 8 6v12H24v-7h-8v7H12Z" fill="white"/></svg>
      <span class="text-xl font-extrabold tracking-tight">GrabbVideos</span>
    </a>
    <div class="hidden md:flex justify-center my-4">
      <div>
        <div class="ad-label" style="color:#c4b5fd">Advertisement</div>
        <script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script>
        <script async src="${BANNER_SRC}"></script>
      </div>
    </div>
    <div class="flex items-center justify-center gap-2 mb-4">
      <span class="ig-badge flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full">${igSvg()} Instagram</span>
      <span class="text-purple-400 text-lg font-thin">+</span>
      <span class="tt-badge flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full">${ttSvg()} TikTok</span>
    </div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3">
      ${escHtml(page.h1)}<br/><span class="text-violet-300">No Watermark. Free.</span>
    </h1>
    <p class="text-purple-200/80 text-sm sm:text-base max-w-lg mx-auto">${escHtml(page.subtitle)}</p>
  </div>
</header>

<main class="max-w-4xl mx-auto px-4 py-8 space-y-8">

  <section class="card p-5 sm:p-8">
    <h2 class="text-xl font-bold text-gray-900 text-center mb-1">${escHtml(page.toolCardTitle || 'Paste your video link below')}</h2>
    <p class="text-[#6b7280] text-center text-xs mb-6">${escHtml(page.toolCardSubtitle || 'Instagram · TikTok')}</p>
    ${renderDownloadWidget({ placeholder: page.placeholder, btnLabel: page.btnLabel, processing: page.processing, grabbing: page.grabbing, videoReady: page.videoReady, downloadBtn: page.downloadBtn })}
    <div class="mt-6 rec-box">
      <div class="rec-header">Recommended Content</div>
      <div class="p-3"><div id="container-${NATIVE_KEY}"></div></div>
    </div>
  </section>

  <section class="card p-5 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 text-center mb-6">${escHtml(page.howToTitle)}</h2>
    <ol class="space-y-4">${steps}</ol>
  </section>

  <section class="card p-5 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 text-center mb-2">Why GrabbVideos?</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">${featureCards}</div>
  </section>

  <div class="my-8">
    <p class="ad-label mb-2">Sponsored</p>
    <div class="rec-box p-3">
      <div class="banner-wrap">
        <div class="hidden md:block"><script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script><script src="${BANNER_SRC}"></script></div>
        <div class="block md:hidden"><script>atOptions={'key':'${MOBILE_KEY}','format':'iframe','height':50,'width':320,'params':{}};</script><script src="${MOBILE_SRC}"></script></div>
      </div>
    </div>
  </div>

  <section class="card p-5 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 mb-6">FAQ</h2>
    <div>${faqItems}</div>
  </section>

</main>
${renderFooter()}
${renderStickyAndScripts()}
</body></html>`;
}

/* ── Utilities ─────────────────────────────────────────────────────── */
function escHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escAttr(str) {
  return String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ── Main export ───────────────────────────────────────────────────── */
function renderPage(page, blogs) {
  if (page.type === 'tool')       return renderToolPage(page);
  if (page.type === 'blog')       return renderBlogPage(page);
  if (page.type === 'i18n')       return renderI18nPage(page);
  if (page.type === 'blog-index') return renderBlogIndex(blogs);
  return '<h1>Page not found</h1>';
}

module.exports = { renderPage, renderBlogIndex };