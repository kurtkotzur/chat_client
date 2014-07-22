(function (root) {
  var clientSide = root.clientSide = (root.clientSide || {});
  
  var Chat = clientSide.Chat = function (socket) {
    this.socket = socket;
  };
  
  Chat.prototype.sendMessage = function (message) {
    this.socket.emit('message', { message: message } );
  }
  
})(this);