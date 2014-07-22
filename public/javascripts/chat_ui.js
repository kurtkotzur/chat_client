(function(root) { 
  var clientSide = root.clientSide = (root.clientSide || {});
  
  var socket = clientSide.socket = io.connect();

  var chat = new clientSide.Chat(socket);
  
  var getMessage = clientSide.getMessage = function(){
    var data = $("textarea").val();
    
    if(data[0] === "/"){
      chat.processCommand(data);
    } else {
      return data;
    }
  };
  
  var sendMessage = clientSide.sendMessage = function(message){
    chat.sendMessage(message);
  };
  
  var postMessage = clientSide.postMessage = function(message){
    var $p = $("<p>");
    $p.text(message);
    
    $("#log").append($p);
  };
  
})(this)