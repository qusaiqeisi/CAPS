'use strict';

const events = require('./events.js');
require('dotenv').config();
const faker = require('faker');
const uuid = require('uuid').v4;


setInterval(function() {

  let payload = {
      
    storeName : process.env.STORE,
    orderId : uuid(),
    customerName : faker.name.findName(),
    address : faker.address.streetAddress()
  }
  
events.emit('pickup', payload)

}, 5000);

//  node-version: [12.x, 14.x, 16.x]

events.on('delivered', deliveredHandler);

function deliveredHandler(payload){
  console.log(`VENDOR: Thank You for delivering ${payload.orderId}!`);
}