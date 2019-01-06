/*
 * Require
 */
const express = require('express');
const Server = require('http').Server;
const socket = require('socket.io');
// config Json
const config = require('./config');

/*
 * Vars
 */
const app = express();
const server = Server(app);
const io = socket(server);


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

/*
 * Server
 */
if (config.http.enable) {
  http.createServer(app).listen(config.http.port);
}

if (config.https.enable) {
  https.createServer({
    key: fs.readFileSync(config.https.privkey),
    cert: fs.readFileSync(config.https.cert),
  }, app).listen(config.https.port);
}
