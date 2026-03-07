# ═══════════════════════════════════════════════════════════════════════════
#  GrabbVideos — Dockerfile (EasyPanel / Coolify optimised)
#  Base: node:18-slim  |  Includes: python3, ffmpeg, yt-dlp (official binary)
# ═══════════════════════════════════════════════════════════════════════════

FROM node:18-slim

# ── System dependencies ─────────────────────────────────────────────────────
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        ffmpeg \
        curl \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/* && \
    ln -s /usr/bin/python3 /usr/bin/python

# ── yt-dlp binary ───────────────────────────────────────────────────────────
RUN curl -fsSL \
        "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp" \
        -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# ── App ─────────────────────────────────────────────────────────────────────
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY server.js ./
COPY public/ ./public/

# ── Environment ─────────────────────────────────────────────────────────────
ENV NODE_ENV=production \
    PORT=3000 \
    XDG_CACHE_HOME=/tmp

EXPOSE 3000

CMD ["node", "server.js"]
