"use strict";
const events = require("../events");
const supertest = require("supertest");
require('dotenv').config();
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=io.connect(`${HOST}/caps`);

require('../driver');
require('../vendor');


describe('events handler tests', () => {

    beforeEach(()=>{
        jest.useFakeTimers();
        jest.spyOn(global.console,'log');
      })

    let order = {
        orderId: uuid(),
        storeName: store,
        customerName: faker.name.findName(),
        address:faker.address.streetAddress(),
    }
    test('pick up handler test',() => {
        events.emit('pickup',order)
        jest.runAllTimers();
        expect(console.log).toHaveBeenCalled();
    })
    test('delivered handler test',() => {
        socket.emit('delivered',order)
        expect(console.log).toHaveBeenCalled();
    })
    test('in-transit handler test',() => {
        socket.emit('in-transit',order)
        jest.runAllTimers();
        expect(console.log).toHaveBeenCalled();
    })
})