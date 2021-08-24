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
  socket.emit('new_chore', "new order");
}, 2000);


socket.on('added', payload=> {
  console.log("Thank you for adding : ", payload , " to the queue");
  socket.disconnect();
});
//  node-version: [12.x, 14.x, 16.x]

socket.on('chore', msg=> {
  console.log("recived from driver: ", msg)
  socket.emit('received', msg)
})


socket.on('delivered', deliveredHandler);

function deliveredHandler(payload){
  console.log(`VENDOR: Thank You for delivering ${payload.orderId}!`);
}