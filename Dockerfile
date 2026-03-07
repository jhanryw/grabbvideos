FROM node:18-slim

# Instala dependências de sistema + yt-dlp num único RUN (melhor cache)
RUN apt-get update && apt-get install -y \
        python3 \
        ffmpeg \
        curl \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
        -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Garante que o PATH inclui o binário do yt-dlp
ENV PATH="/usr/local/bin:${PATH}" \
    NODE_ENV=production \
    PORT=3000 \
    XDG_CACHE_HOME=/tmp

EXPOSE 3000

CMD ["node", "server.js"]
