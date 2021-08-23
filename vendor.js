'use strict';

require('dotenv').config();
const faker = require('faker');
const uuid = require('uuid').v4;
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=io.connect(`${HOST}/caps`);


setInterval(function() {

  let payload = {
      
    storeName : process.env.STORE,
    orderId : uuid(),
    customerName : faker.name.findName(),
    address : faker.address.streetAddress()
  }
  
  socket.emit('pickup', payload)

}, 5000);

//  node-version: [12.x, 14.x, 16.x]

socket.on('delivered', deliveredHandler);

function deliveredHandler(payload){
  console.log(`VENDOR: Thank You for delivering ${payload.orderId}!`);
}