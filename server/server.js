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

/*
 * Vars
 */
const app = express();
app.set('trust proxy', 1);
const port = Number(process.env.PORT) || config.port || 3000;
const corsOrigin = process.env.CORS_ORIGIN || '*';
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
    origin: corsOrigin,
    methods: ['GET', 'POST'],
  },
});

/*
 * Express
 */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', corsOrigin);
  res.header('Access-Control-Allow-Credentials', corsOrigin !== '*');
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
  console.log('>> socket.io -An user is connected');
  socket.on('send_message', function(message) {
    message.id = ++id;
    io.emit('send_message', message);
    console.log(message);
  });
  socket.on('disconnect', () => {
    console.log('>> socket.io -An user was disconnected');
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
