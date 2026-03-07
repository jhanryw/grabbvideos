# ═══════════════════════════════════════════════════════════════════════════
#  GrabbVideos — Dockerfile
#  Optimised for Coolify / Docker Compose deployment
#  Base: node:18-slim  |  Includes: python3, ffmpeg, yt-dlp (official binary)
# ═══════════════════════════════════════════════════════════════════════════

FROM node:18-slim

# ── Labels ──────────────────────────────────────────────────────────────────
LABEL maintainer="GrabbVideos <hello@grabbvideos.com>" \
      description="Instagram & TikTok video downloader powered by yt-dlp" \
      version="1.0.0"

# ── System dependencies ──────────────────────────────────────────────────────
#   python3  → required by yt-dlp for certain extractor features
#   ffmpeg   → audio/video merging (best quality formats)
#   curl     → download the yt-dlp binary
#   ca-certificates → HTTPS support in containers
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        ffmpeg \
        curl \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/* && \
    ln -s /usr/bin/python3 /usr/bin/python

# ── Install yt-dlp official binary ──────────────────────────────────────────
#   Always fetches the LATEST stable release from GitHub Releases.
#   chmod a+rx → readable & executable by all users (including node non-root)
RUN curl -fsSL \
        "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp" \
        -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# ── Verify binary installations ──────────────────────────────────────────────
RUN yt-dlp --version && \
    ffmpeg -version 2>&1 | head -1 && \
    python3 --version

# ── Working directory ────────────────────────────────────────────────────────
WORKDIR /app

# ── Install Node dependencies ────────────────────────────────────────────────
#   Copy package files first to leverage Docker layer caching.
#   npm install --production  → installs only production dependencies
COPY package*.json ./
RUN npm install --production

# ── Copy application source ──────────────────────────────────────────────────
COPY server.js   ./
COPY public/     ./public/

# ── Non-root user for security ───────────────────────────────────────────────
#   yt-dlp binary is at /usr/local/bin with a+rx so the node user can execute it.
#   /tmp is used for yt-dlp's cache (writable by all users).
RUN groupadd --system --gid 1001 appgroup && \
    useradd  --system --uid 1001 --gid 1001 --no-create-home appuser && \
    chown -R appuser:appgroup /app

USER appuser

# ── Environment ──────────────────────────────────────────────────────────────
ENV NODE_ENV=production \
    PORT=3000 \
    # Tell yt-dlp to store cache in /tmp so the non-root user can write to it
    XDG_CACHE_HOME=/tmp

# ── Port ─────────────────────────────────────────────────────────────────────
EXPOSE 3000

# ── Health check ─────────────────────────────────────────────────────────────
#   Coolify uses this to determine container readiness.
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -fsS http://localhost:3000 > /dev/null || exit 1

# ── Start ─────────────────────────────────────────────────────────────────────
CMD ["node", "server.js"]
