var socketio = require("socket.io");

function createChat (server) {
  var listener = socketio.listen(server);
  listener.on('connection', function (socket) { 
    console.log('socket connected!');
    
    socket.on('message', function (data) {
      listener.sockets.emit('fromNodeEvent', { message: data.message} )
    });
  });
};

exports.createChat = createChat;