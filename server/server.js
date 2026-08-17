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
  sanitizeUsername,
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
let online = 0;
let totalConnections = 0;
let totalMessages = 0;

const logDir = process.env.LOG_DIR || path.join(__dirname, '..', 'logs');
let logFile = null;
try {
  fs.mkdirSync(logDir, { recursive: true });
  logFile = fs.createWriteStream(path.join(logDir, 'server.log'), { flags: 'a' });
  logFile.on('error', function(err) {
    console.error('log file error', err.message);
  });
} catch (err) {
  console.error('cannot open log file', err.message);
}

function log(event, details) {
  const line = `${new Date().toISOString()} ${event} ${details}`;
  console.log(line);
  if (logFile) {
    logFile.write(`${line}\n`);
  }
}

io.on('connection', function(socket) {
  online += 1;
  totalConnections += 1;
  log('connect', `online=${online} total=${totalConnections}`);
  socket.on('change_username', function(data) {
    const username = sanitizeUsername(data && data.username);
    if (!username) {
      return;
    }
    socket.username = username;
    log('join', `user=${JSON.stringify(username)} online=${online}`);
  });
  socket.on('send_message', function(message) {
    if (!allowMessage(socket)) {
      return;
    }
    const safe = sanitizeMessage(message);
    if (!safe) {
      return;
    }
    safe.id = ++id;
    totalMessages += 1;
    io.emit('send_message', safe);
    log('message', `user=${JSON.stringify(safe.username)} total=${totalMessages}`);
  });
  socket.on('disconnect', () => {
    online -= 1;
    log('disconnect', `user=${JSON.stringify(socket.username || 'anonymous')} online=${online}`);
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
