/*
 * Require
 */
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
// config Json
const config = require('./config');
const {
  sanitizeMessage,
  allowMessage,
  connectionGuard,
  corsOrigin,
} = require('./security');

/*
 * Vars
 */
const app = express();
app.set('trust proxy', 1);
const port = Number(process.env.PORT) || config.port || 3000;
const allowedOrigin = corsOrigin();
const enableHttps = Boolean(
  config.enableHttps && config.https && config.https.privkey && config.https.cert,
);
const isProd = process.env.NODE_ENV === 'production';

/*
 * Server
 */
let server;
if (enableHttps) {
  server = https.createServer({
    key: fs.readFileSync(config.https.privkey),
    cert: fs.readFileSync(config.https.cert),
  }, app);
} else {
  server = http.createServer(app);
}

const io = new Server(server, {
  cors: {
    origin: allowedOrigin || false,
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 8192,
});
io.use(connectionGuard());

/*
 * Express
 */
app.use(function(req, res, next) {
  if (allowedOrigin) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Credentials', allowedOrigin !== '*');
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.get('/health', function(req, res) {
  res.json({ status: 'ok' });
});

const distCandidates = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, '../dist'),
];
const distDir = distCandidates.find(function(dir) {
  return fs.existsSync(path.join(dir, 'index.html'));
});

if (distDir) {
  app.use(express.static(distDir));
}

/*
 * Socket.io
 */
let id = 0;
io.on('connection', function(socket) {
  if (!isProd) {
    console.log('>> socket.io -An user is connected');
  }
  socket.on('send_message', function(message) {
    if (!allowMessage(socket)) {
      return;
    }
    const safe = sanitizeMessage(message);
    if (!safe) {
      return;
    }
    safe.id = ++id;
    io.emit('send_message', safe);
  });
  socket.on('disconnect', () => {
    if (!isProd) {
      console.log('>> socket.io -An user was disconnected');
    }
  });
});

if (distDir) {
  app.get('*', function(req, res) {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

server.listen(port, '0.0.0.0', function() {
  console.log(`Funny Tchat listening on port ${port}`);
});
