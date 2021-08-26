'use strict'

const port=process.env.PORT||3000
const io =require('socket.io')(port)
const uuid = require('uuid').v4;

// msg queue to check the connection between the client .
const msgQueue = {
  orders : {}
}

// the home router that we connect the caps.
const caps=io.of('/caps')

caps.on('connection',socket=>{

  console.log("CONNECTED Sucsses", socket.id)

  socket.on("pickUp", pickup);



// pickup function for let the driver that ther are order .

  function pickup(payload) {

    console.log("adding a new order....", payload.orderID)
    const id = uuid();
    console.log("id ====> ", id)
    msgQueue.orders[id]=payload
    socket.emit('added', payload);
    caps.emit('order', {id: id, payload: msgQueue.orders.id}); 
    console.log("after add msgQueue ========> ", msgQueue.orders)
    let order = {
      event: "pickup",
      time: new Date(),
      payload,
    };
    console.log("Event", order);
    
  }


// function to let the driver know that git all order 
socket.on('get_all', ()=> {

  console.log("get_all : driver wants to get hes orders to deliver ===>   ")
  Object.keys(msgQueue.orders).forEach(id=> {
      socket.emit('order',  {id: id, payload: msgQueue.orders.id })

  });
});


// recive msg 
socket.on('received', msg => {

  console.log("received on queue will remove it ...")
  delete msgQueue.orders[msg.id];
  console.log("after delete msgQueue @@@@@@@@@@ ", msgQueue.orders)

})
 
  
//  order in transit to deliver 
  socket.on("in-transit", inTransit);
  function inTransit(payload) {
    let order = {
      event: "in-transit",
      time: new Date(),
      payload,
    };
    console.log("Event", order);
  }


// finally the order was delivered .

  socket.on("delivered", delivered);
  function delivered(payload) {
    let order = {
      event: "delivered",
      time: new Date(),
      payload,
    };
    console.log("Event", order);
    caps.emit('deliveredV',payload)
  }
    
   
})