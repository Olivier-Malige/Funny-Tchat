const USERNAME_MAX = 32;
const MESSAGE_MAX = 2000;
const RATE_WINDOW_MS = 10000;
const RATE_MAX = 15;
const MAX_CONNECTIONS_PER_IP = 20;
const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const net = require('net');

/** Returns a trimmed nickname, or an empty string. */
function sanitizeUsername(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().slice(0, USERNAME_MAX);
}

/** Returns a safe chat payload, or null when the input is invalid. */
function sanitizeMessage(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return null;
  }
  const username = sanitizeUsername(payload.username);
  const message = typeof payload.message === 'string'
    ? payload.message.trim().slice(0, MESSAGE_MAX)
    : '';
  if (!username || !message) {
    return null;
  }
  return {
    username,
    message,
    color: HEX_COLOR.test(payload.color) ? payload.color : '#000',
  };
}

/** Per-socket send rate limiter. */
function allowMessage(socket) {
  const now = Date.now();
  socket.rateStamps = (socket.rateStamps || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (socket.rateStamps.length >= RATE_MAX) {
    return false;
  }
  socket.rateStamps.push(now);
  return true;
}

function clientIp(socket) {
  // The app is bound to localhost behind Nginx, which overwrites X-Real-IP.
  // Never trust the client-supplied X-Forwarded-For chain for rate limiting.
  const forwarded = socket.handshake.headers['x-real-ip'];
  if (typeof forwarded === 'string' && net.isIP(forwarded.trim())) {
    return forwarded.trim();
  }
  return socket.handshake.address;
}

/** Socket.io middleware that caps concurrent connections per IP. */
function connectionGuard() {
  const counts = new Map();
  return (socket, next) => {
    const ip = clientIp(socket);
    const count = (counts.get(ip) || 0) + 1;
    if (count > MAX_CONNECTIONS_PER_IP) {
      next(new Error('too many connections'));
      return;
    }
    counts.set(ip, count);
    socket.on('disconnect', () => {
      const left = (counts.get(ip) || 1) - 1;
      if (left <= 0) {
        counts.delete(ip);
      } else {
        counts.set(ip, left);
      }
    });
    next();
  };
}

function corsOrigin() {
  const value = process.env.CORS_ORIGIN;
  if (process.env.NODE_ENV === 'production') {
    if (!value || value === '*') {
      return false;
    }
    return value;
  }
  return value || '*';
}

module.exports = {
  sanitizeUsername,
  sanitizeMessage,
  allowMessage,
  connectionGuard,
  corsOrigin,
};
