'use strict';


console.log('Hello from Toyes Us Shop');
require('dotenv').config();
const port=process.env.PORT || 3000;
const io=require('socket.io')(port);
const caps =io.of('/caps');


require('./vendor.js');
// require('./driver.js');


io.on('connection',socket=>{
    console.log('CONNECTED SUCCESSFULLY ',socket.id);
});

caps.on('connection',socket=>{

socket.on('pickup', (payload) => {logIt('pickup', payload)
caps.emit('driverpickup',payload)
});

socket.on('in-transit', (payload) => logIt('in-transit', payload));

socket.on('delivered', (payload) => logIt('delivered', payload));

});

function logIt(socket, payload) {
  console.log('EVENT', { socket, time: new Date().toLocaleString(), payload });
}

