(function (root) {
  var clientSide = root.clientSide = (root.clientSide || {});
  
  var Chat = clientSide.Chat = function (socket) {
    this.socket = socket;
    var that = this;

    this.socket.on("roomSet", function (data) {
      Chat.prototype.roomSet(data.room);
    });
    
    this.socket.on("nameSet", function(data) {
      socket.emit("nicknameChangeResult", {
        success: true,
        message: data.nickname
      });
    });
  };
  
  Chat.prototype.roomSet = function(room){
    this.room = room;
  }
  
  Chat.prototype.sendMessage = function (message) {
    this.socket.emit('message', { message: message, room: this.room } );
  };
  
  Chat.prototype.processCommand = function (command) {
    var commandArray = command.split(" ");
    if(commandArray[0] === "/nick"){
      this.socket.emit('nicknameChangeRequest', { nickname: commandArray[1] } );
    } else if(commandArray[0] === "/join"){
      this.socket.emit('handleRoomChangeRequest', { room: commandArray[1] } );
    } else{
      this.socket.emit('error', { message: "Not a valid command" } );
    }
  };
  
})(this);