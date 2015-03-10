var io = require('socket.io')();

var panVal  = 0;  
var tiltVal = 0;

io.on('connection', function (socket) { 
  socket.emit('panChangeResponse', panVal);
  socket.emit('tiltChangeResponse', tiltVal);

  socket.on('panChange', function (value) {
    panVal = value;
    io.sockets.emit('panChangeResponse', value);
  });
  
  socket.on('tiltChange', function (value) {
    tiltVal = value;
    io.sockets.emit('tiltChangeResponse', value);
  });
});

module.exports = io;
