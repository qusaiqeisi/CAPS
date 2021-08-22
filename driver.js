'use strict';

const events = require('./events.js');

events.on('pickup', pickupHandler);

function pickupHandler(payload){

  setTimeout(function () {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout(function () {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    events.emit('delivered', payload);
  }, 4000);
}


events.on('pickup', (payload) => logIt('pickup', payload));
events.on('in-transit', (payload) => logIt('in-transit', payload));
events.on('delivered', (payload) => logIt('delivered', payload));

function logIt(event, payload) {
  console.log('EVENT', { event, time: new Date().toLocaleString(), payload });
}