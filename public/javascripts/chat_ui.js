(function(root) { 
  var clientSide = root.clientSide = (root.clientSide || {});
  
  var socket = clientSide.socket = io.connect();

  var chat = new clientSide.Chat(socket);
  
  var getMessage = clientSide.getMessage = function(){
    var data = $("textarea").val();
    return data;
  };
  
  var sendMessage = clientSide.sendMessage = function(message){
    chat.sendMessage(message);
  };
  
  var postMessage = clientSide.postMessage = function(message){
    var $li = $("<li>");
    $li.text(message);
    
    $("#log").append($li);
  };
  
})(this)