var socketio = require("socket.io");

var guestNumber = 1;


var nicknames = {};

function createChat (server) {
  var listener = socketio.listen(server);
  
  listener.on('connection', function (socket) { 
    
    socket.on('disconnect',function() {
    	delete nicknames[socket.id]
    });
    
    
    guestNumber += 1;
    var guestNickName = "guest" + guestNumber;
    nicknames[socket.id] = guestNickName;
    
    console.log('socket connected!');
    
    socket.on('message', function (data) {
      if(data.message){
        message = nicknames[socket.id] + ": " + data.message ;
        listener.sockets.emit('fromNodeEvent', {
          message: message 
        });
      }
    });
    
    socket.on('nicknameChangeRequest', function (data) {
      var nickname = data.nickname;
      var nicknameTaken = false;
      
      if (nickname.substring(0,6) === "guest") {
        socket.emit('nicknameChangeResult', {
          success: false,
          message: "Nickname cannot begin with 'guest.'"
        });
      }
      
      for(var key in nicknames){
        if(nickname === nicknames[key]){
          nicknameTaken = true
          socket.emit('nicknameChangeResult', {
            success: false,
            message: 'Nickname already taken.'
          });
        }
      }
      
      if(nicknameTaken===false) {
        socket.emit('nicknameChangeResult', {
          success: true,
          message: nickname
        }); 
        nicknames[socket.id] = nickname;
      };
      
    });
  });
};

exports.createChat = createChat;