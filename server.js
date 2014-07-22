var http = require('http'),
  chatServer = require('./lib/chat_server.js'),
  static = require('node-static');

var file = new static.Server('./public');

var server = http.createServer(function (req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(8080);

chatServer.createChat(server);