'use strict';


console.log('Hello from Toyes Us Shop');
require('dotenv').config();
const uuid = require('uuid').v4;
const port=process.env.PORT || 3000;
const io=require('socket.io')(port);
const caps =io.of('/caps');


require('./vendor.js');
// require('./driver.js');

const msgQueue = {
  chores : {}
}

io.on('connection',socket=>{
    console.log('CONNECTED SUCCESSFULLY ',socket.id);
});

caps.on('connection',socket=>{

socket.on('pickup', (payload) => {logIt('pickup', payload)
caps.emit('driverpickup',payload)
});

socket.on('in-transit', (payload) => logIt('in-transit', payload));

socket.on('delivered', (payload) => logIt('delivered', payload));

socket.on('new_chore', payload=> {
  console.log("adding a new task ....")
  const id = uuid();
  console.log("id ====> ", id)
  msgQueue.chores[id] = payload;
  socket.emit('added', payload); // telling the parent a task was added
  caps.emit('chore', {id: id, payload: msgQueue.chores[id]});
  console.log("after add msgQueue ========> ", msgQueue)
});

socket.on('get_all', ()=> {
  console.log("get_all : child wants to get its msgs ")
  Object.keys(msgQueue.chores).forEach(id=> {
      socket.emit('chore', {id: id, payload: msgQueue.chores[id] })
  });
});

socket.on('received', msg => {
  console.log("received on queue will remove it ...")
  // he child confirmed receiving , remove from queue
  delete msgQueue.chores[msg.id];
  console.log("after delete msgQueue @@@@@@@@@@ ", msgQueue)
})

});

function logIt(socket, payload) {
  console.log('EVENT', { socket, time: new Date().toLocaleString(), payload });
}

