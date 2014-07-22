(function (root) {
  var clientSide = root.clientSide = (root.clientSide || {});
  
  var Chat = clientSide.Chat = function (socket) {
    this.socket = socket;
  };
  
  Chat.prototype.sendMessage = function (message) {
    this.socket.emit('message', { message: message } );
  };
  
  Chat.prototype.processCommand = function (command) {
    var commandArray = command.split(" ");
    if(commandArray[0] === "/nick"){
      this.socket.emit('nicknameChangeRequest', { nickname: commandArray[1] } );
    } else{
      this.socket.emit('error', { message: "Not a valid command" } );
      
    }
  };
  
})(this);