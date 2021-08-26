'use strict';

const client = require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=client.connect(`${HOST}/caps`);
const uuid = require('uuid').v4;
const faker = require("faker");


setInterval(() => {

 const payload={

   store : process.env.STORE,
    orderID : uuid(),
    customer : faker.name.findName(),
    address : faker.address.streetAddress()
  }
 
  socket.emit('new_Order', payload);
  socket.emit('pickUp', payload);
  }, 5000);

socket.on('added',payload=>{

  console.log('thank you for adding the order to  pucket ', payload.orderID)

}) 

socket.on('deliveredV',delivered)
function delivered(payload){
   
    console.log('thank you for delevering ', payload)
}