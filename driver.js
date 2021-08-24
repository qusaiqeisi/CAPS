'use strict';

require('dotenv').config();
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=io.connect(`${HOST}/caps`);




socket.on('driverpickup', pickupHandler);

function pickupHandler(payload){

  setTimeout(function () {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    socket.emit('in-transit', payload);
  }, 1000);

  setTimeout(function () {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    socket.emit('delivered', payload);
  }, 4000);
}

socket.emit('get_all');

socket.on('chore', msg=> {
    console.log("child got this msg: ", msg)
    socket.emit('received', msg)
})
