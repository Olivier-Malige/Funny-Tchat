/*
 * Require
 */
var express = require('express');
var join = require('path').join;
var Server = require('http').Server;
var socket = require('socket.io');


/*
 * Vars
 */
var app = express();
var server = Server(app);
var io = socket(server);


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
server.listen(3009, function() {
  console.log('listening on *:3009');
});
