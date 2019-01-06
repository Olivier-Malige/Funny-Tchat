/*
 * Require
 */
const express = require('express');
const socket = require('socket.io');
const http = require ('http');
const https = require ('https');
const fs = require('fs');
// config Json
const config = require('./config');

/*
 * Vars
 */
const app = express();
/*
 * Server
 */
let server;
if (config.enableHttps) {
  server = https.createServer({
    key: fs.readFileSync(config.https.privkey),
    cert: fs.readFileSync(config.https.cert),
  }, app)
    .listen(config.port);
}
else {
    server = http.createServer(app).listen(config.port);
  }

/*
 * Express
 */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/*
 * Socket.io
 */
const io = socket(server);
let id = 0;
let numUsers = 0;
io.on('connection', function(socket) {
  ++numUsers;
  console.log('>> socket.io -An user is connected');
  socket.on('send_message', function(message) {
    message.id = ++id;
    io.emit('send_message', message);
    console.log(message);
  });
  socket.on('disconnect', () => {
    console.log('>> socket.io -An user was disconnected');
    --numUsers;
    });
});

