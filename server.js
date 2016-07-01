var express = require('express');
var app = express();

// added next two lines for socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongooose = require('mongoose');
require('dotenv').config();
var config = require('./config');
var routes = require('./routes.js');

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.static('node_modules'));

mongooose.connect(config.getDBConnectionString(), function(err, data) {
    if(err) throw err;
    console.log("*** connected to database ***")
});

// Socket.io connection
io.on('connection', function (socket) {
  console.log("a client connnected to the server");

  // user requests a new stock
  socket.on('add stock', function (result) {
      console.log('a client requested a new stock');
      socket.broadcast.emit('broadcast new stock', result.data);
  });
  // user deletes a stock
  socket.on('delete stock', function (result) {
      console.log('a client deleted a stock');
      socket.broadcast.emit('broadcast delete stock', result.data);
  }); 
});

routes(app);

// without socket.io this would be app.listen(...)
server.listen(port, function(){
  //and... we're live
  console.log('Server is running on port ' + port);
});