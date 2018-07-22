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

  socket.emit('newMessage', {
      from: "Admin",
      text: "Welcome to the chat App",
      createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
      from: "Admin",
      text: "New user joined",
      createdAt: new Date().getTime()
  });

  socket.on('createMessage', function(message) {
    console.log('createMessage', message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createAt: new Date().getTime()
    // });

  });
  socket.on('disconnect', () => {
      console.log('User is disconnected');
  });
});//register event listener and do something when that event happens

server.listen(port, () => {
  console.log(`Connection established on port ${port}`);
});
