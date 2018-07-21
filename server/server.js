const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server); //we get back a web socket server

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
      console.log('User is disconnected');
  });
});//register event listener and do something when that event happens

server.listen(port, () => {
  console.log(`Connection established on port ${port}`);
});
