var socket = io();//creates a connection and returns a socket

socket.on('connect', function() {
   console.log('Connected to server');

   socket.emit('createMessage', {
     from: "Umair",
     text: "Hey, What is going on?"
   });

});

socket.on('disconnect', function() {
   console.log('Disconnected from server');
});
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
