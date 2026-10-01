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

The production stack is `app` (Node + Socket.io) behind the VPS **Nginx**. The app is bound to localhost; Nginx handles HTTPS and WebSocket proxying.

### 1. DNS

Create an **A** record from `funny-tchat.omalige.dev` to the VPS public IP. Ports **80** and **443** must be open.

### 2. Env file

```bash
cp .env.example .env
```

Set the production origin:

```env
CORS_ORIGIN=https://funny-tchat.omalige.dev
```

### 3. Start

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
```

Configure the Nginx virtual host from `deploy/nginx.host.conf.example`, replacing its certificate paths if needed. Issue the certificate with Certbot, enable the site, and reload Nginx. The app is then available at `https://funny-tchat.omalige.dev`.

Do not set `CORS_ORIGIN=*`. Messages are size-limited and rate-limited on the server.

Useful commands:

```bash
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml down
```

The example Nginx config includes the required WebSocket headers. This production Compose file binds the app to `127.0.0.1:3000` so it is not directly exposed to the internet. See `deploy/nginx.host.conf.example`.

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
docker-compose.prod.yml  # VPS: app bound to localhost behind Nginx
deploy/                  # Caddyfile + Nginx example
```

## License

MIT — see [LICENSE](./LICENSE).
