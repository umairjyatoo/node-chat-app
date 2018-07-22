const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server); //we get back a web socket server

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

  socket.on('createMessage', function(message, callback) {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
      console.log('User is disconnected');
  });
});//register event listener and do something when that event happens

server.listen(port, () => {
  console.log(`Connection established on port ${port}`);
});
