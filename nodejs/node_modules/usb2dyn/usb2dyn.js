var ffi        = require('ffi');

// importing usb2dynamixel library
var usb2dyn = ffi.Library('/usr/lib/libdxl', {

  'dxl_initialize' : [ 'int',  [ 'int', 'int' ] ],
  'dxl_terminate'  : [ 'void', [              ] ],

  'dxl_set_txpacket_id'          : [ 'void', [ 'int'        ] ],
  'dxl_set_txpacket_instruction' : [ 'void', [ 'int'        ] ],
  'dxl_set_txpacket_parameter'   : [ 'void', [ 'int', 'int' ] ],
  'dxl_set_txpacket_length'      : [ 'void', [ 'int'        ] ],

  'dxl_get_rxpacket_error'     : [ 'int', [ 'int'  ] ],
  'dxl_get_rxpacket_length'    : [ 'int', [ 'void' ] ],
  'dxl_get_rxpacket_parameter' : [ 'int', [ 'int'  ] ],
  
  'dxl_makeword'     : [ 'int', [ 'int', 'int' ] ],
  'dxl_get_lowbyte'  : [ 'int', [ 'int'        ] ],
  'dxl_get_highbyte' : [ 'int', [ 'int'        ] ],

  'dxl_tx_packet'   : [ 'void', [ 'void' ] ],
  'dxl_rx_packet'   : [ 'void', [ 'void' ] ],
  'dxl_txrx_packet' : [ 'void', [        ] ],
  'dxl_get_result'  : [ 'int',  [ 'void' ] ],

  'dxl_ping'       : [ 'void', [ 'int'               ] ],
  'dxl_read_byte'  : [ 'int',  [ 'int', 'int'        ] ],
  'dxl_write_byte' : [ 'void', [ 'int', 'int', 'int' ] ],
  'dxl_read_word'  : [ 'int',  [ 'int', 'int'        ] ],
  'dxl_write_word' : [ 'void', [ 'int', 'int', 'int' ] ],

  'dxl_init_sync_write' : [ 'void', [                     ] ],
  'dxl_set_pos'         : [ 'void', [ 'int', 'int', 'int' ] ],
  'dxl_sync_write'      : [ 'void', [                     ] ]
  
});
exports.usb2dyn = usb2dyn;
