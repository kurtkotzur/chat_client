var socketio = require("socket.io");

var guestNumber = 1;

var nicknames = {};
var currentRooms = {};


function createChat (server) {
  var listener = socketio.listen(server);
  
  listener.on('connection', function (socket) { 
    var that = this
  
    function joinRoom(room) {
      socket.join(room);
      currentRooms[socket.id] = room;
      socket.emit("roomSet", {
        room: room
      });
    };
    
    joinRoom("lobby");
    
    //free up nickname on user leave
    socket.on('disconnect',function() {
    	delete nicknames[socket.id]
    });
    
    guestNumber += 1;
    var guestNickname = "guest" + guestNumber;
    nicknames[socket.id] = guestNickname;
    socket.emit("nameSet", {
      nickname: guestNickname
    });
    
    console.log('socket connected!');
    
    //handle message submission
    socket.on('message', function (data) {
      if(data.message){
        message = nicknames[socket.id] + ": " + data.message ;
        var room = data.room
        listener.sockets.in(room).emit('fromNodeEvent', {
          message: message 
        });
      }
    });
    
    //switch rooms
    socket.on('handleRoomChangeRequest', function (data) {
      var room = data.room;
      joinRoom(room);
      
    })
    
    //handle nickname request
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