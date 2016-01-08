'use strict';

process.on('uncaughtException', function(err) {
  console.error('uncaughtException');
  console.error(err);

  process.exit(1);
});

var express = require('express'),
    socketio = require('socket.io');

var app = express(),
    server, io;

app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

server = app.listen(3000, function() {
  console.log('server starting at 127.0.0.1:3000');
});

var progresses = {};

io = socketio(server);
io.on('connection', function(socket) {
  if (!progresses[socket.id]) {
    progresses[socket.id] = 0;
  }

  setInterval(function() {
    progresses[socket.id]++;

    if (progresses[socket.id] > 100) {
      progresses[socket.id] = 0;
    }

    socket.emit('update progress', {
      value: progresses[socket.id]
    });
  }, 200);
});
