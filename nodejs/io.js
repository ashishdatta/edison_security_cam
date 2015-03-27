var io        = require('socket.io')();
var dynamixel = require('usb2dyn');

var panVal  = 0;  
var tiltVal = 0;

// initializing communication with usb2dynamixel servo controller
usb2dyn = dynamixel.usb2dyn;
usb2dyn.dxl_initialize(0, 1);

// resetting servos to initial position
usb2dyn.dxl_init_sync_write();
usb2dyn.dxl_set_pos(1, 512, 0);
usb2dyn.dxl_set_pos(2, 512, 0);
usb2dyn.dxl_sync_write();

// socket server connection callback
io.on('connection', function (socket) { 

  // making sure that clients are updated with current pan/tilt values
  // when they first connect
  socket.emit('panChangeResponse', panVal);
  socket.emit('tiltChangeResponse', tiltVal);

  // whenever a client makes a change to pan knob, emit change
  // to all clients and update servo position
  socket.on('panChange', function (value) {
    panVal = value;

    usb2dyn.dxl_init_sync_write();
    usb2dyn.dxl_set_pos(2, Math.floor(map(panVal, -180, 180, 0, 1023)), 0);
    usb2dyn.dxl_sync_write();

    io.sockets.emit('panChangeResponse', value);
  });

  // whenever a client makes a change to tilt knob, emit change
  // to all clients and update servo position
  socket.on('tiltChange', function (value) {
    tiltVal = value;

    usb2dyn.dxl_init_sync_write();
    usb2dyn.dxl_set_pos(1, Math.floor(map(tiltVal, -180, 180, 0, 1023)), 0);
    usb2dyn.dxl_sync_write();

    io.sockets.emit('tiltChangeResponse', value);
  });
});

// remapping value from one range to another
function map(value, fromLow, fromHigh, toLow, toHigh) {
      return (value - fromLow) * (toHigh / (fromHigh - fromLow))
}

module.exports = io;
