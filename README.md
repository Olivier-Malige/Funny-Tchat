# Funny Tchat

Real-time chat, no authentication, just for fun.

End-of-training **React** project (2018), modernized in 2026: up-to-date stack, a chat that actually works, and a one-command Docker start.

## Features

- Free nickname, no account
- Real-time messages (Socket.io)
- Emoji picker and text color
- Messenger-style UI with animations

## Stack

| Layer | Then (2018) | Now |
| --- | --- | --- |
| Front | React 16, Webpack 4, Babel 6 | React 18, Vite 8 |
| State | Redux 4 | Redux 5 |
| Real-time | Socket.io 2 | Socket.io 4 |
| Prod | Homegrown HTTPS server | Node 22 + Docker |

The original architecture is kept (components / containers / Redux middlewares): this is the exam codebase, not a from-scratch rewrite.

## Run with Docker (recommended)

Requires [Docker](https://docs.docker.com/get-docker/) and Docker Compose.

```bash
docker compose up --build
```

Open [http://localhost:3009](http://localhost:3009). The frontend and the Socket.io server are served together.

Stop with `Ctrl+C`, then `docker compose down`.

## Production on a VPS

The production stack is `app` (Node + Socket.io) behind **Caddy** (automatic HTTPS via Let's Encrypt). The Node port is not exposed on the public internet.

### 1. DNS

Create an **A** record from your hostname (e.g. `tchat.example.com`) to the VPS public IP. Ports **80** and **443** must be open.

### 2. Env file

```bash
cp .env.example .env
```

Set at least:

```env
DOMAIN=tchat.example.com
CORS_ORIGIN=https://tchat.example.com
ACME_EMAIL=you@example.com
```

### 3. Start

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
```

The app is then available at `https://tchat.example.com`. Certificates are issued automatically.

Useful commands:

```bash
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml down
```

### Already using Nginx on the VPS?

Keep Caddy disabled: run only the app, bound to localhost, and proxy with the host Nginx (WebSocket headers included):

```yaml
# docker-compose.yml
ports:
  - "127.0.0.1:3000:3000"
```

```bash
docker compose up -d --build
```

See `deploy/nginx.host.conf.example`.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

- Vite frontend: [http://localhost:5173](http://localhost:5173)
- API / WebSocket: `http://localhost:3000` (proxied by Vite)

Production build, then a single server:

```bash
npm run build
npm run start:server
```

Then [http://localhost:3000](http://localhost:3000).

## Structure

```
src/                     # React + Redux
server/                  # Express + Socket.io
Dockerfile               # App image (Vite build + Node)
docker-compose.yml       # Local Docker
docker-compose.prod.yml  # VPS: app + Caddy (HTTPS)
deploy/                  # Caddyfile + Nginx example
```

## License

MIT — see [LICENSE](./LICENSE).
