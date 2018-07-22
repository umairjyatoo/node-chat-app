var socket = io();//creates a connection and returns a socket

socket.on('connect', function() {
   console.log('Connected to server');

});

socket.on('disconnect', function() {
   console.log('Disconnected from server');
});
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
