'use strict';

const client = require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=client.connect(`${HOST}/caps`);


socket.emit('get_all');

socket.on('order', payload=> {
  console.log("i got the order and i will deleverd it : ", payload)
  socket.emit('received', payload)

 

  setTimeout(() => {
    console.log("Driver: picked up ");
    socket.emit("in-transit", payload);
  }, 1500);
  setTimeout(() => {
    console.log("Driver: delivered", payload);
    socket.emit("delivered", payload);
  }, 3000);


})