import React, { useState, useEffect, useMemo, useRef } from 'react';
import uuid from 'react-uuid';
import { io } from 'socket.io-client'
// import { Socket } from './clientSocket.js'

// export class Subscribe {
//   constructor() {
//     console.log('constructor init')
//     socket = io("/", {
//       path: '/websocket',
//       transports: ["websocket"]
//     });

//     setup = (params) => socket.emit('setup', params);
//   }

const Subscribe = () => {
  const socket = io("/", {
    path: '/websocket',
    transports: ["websocket"]
  })
  const setup = (params) => socket.emit('setup', params);

const useSubscribe = ({ database, collection, query }) => {
  const [ state, setstate ] = useState({});

  const subscriptionId = useMemo(() => uuid(), [])
  const stringifiedQuery = JSON.stringify(query)
  const currSocket = useRef(null);
  const didMount = useRef(false);

  useEffect(() => {
    const params = {
      database: database,
      collection: collection,
      query: stringifiedQuery,
      subscriptionId: subscriptionId
    }

    setup(params);
    // socket.emit('setup', params)
    currSocket.current = socket;
    
    socket.on(subscriptionId, (e) => {
      console.log(JSON.parse(e));
      const {type, data} = JSON.parse(e);
      console.log('type', type);
      console.log('data', data);
      const id = data.documentKey?._id;
      switch (type) {
        case 'get':
          {
            const obj = {};
            for(let i = 0; i < data.length; i++){
              obj[data[i]._id] = data[i];
              // delete obj[data[i]._id]._id; 
            }
            setstate(obj);
            break;
          }
        case 'insert' :
          {
            const newInsertion = {};
            newInsertion[id] = data.fullDocument;
            setstate((previousstate) => 
            {
              const updatedstate = JSON.parse(JSON.stringify(previousstate));
              Object.assign(updatedstate, newInsertion);
              return updatedstate;
            });
            break;
          }
        case 'update' :
          {
            const update = data.updateDescription.updatedFields;
            setstate((previousstate) => 
            {
              const updatedstate = JSON.parse(JSON.stringify(previousstate));
              Object.assign(updatedstate[id], update);
              return updatedstate;
            });
            break;
          }
        case 'delete':
          {
            setstate((previousstate) => 
            {
              const updatedstate = JSON.parse(JSON.stringify(previousstate));
              delete updatedstate[id];
              return updatedstate;
            });
            console.log('Delete case fired');
            break;
          }
      }
    })

    return () => {
      // Unsubscribe from event stream
      //invoke stopSubscription
      endSubscription();
    }


  }, []);

  useEffect(() => {
    if (didMount.current) {
      currSocket.current.emit('depChange', {
        database: database,
        collection: collection,
        query: stringifiedQuery,
        subscriptionId: subscriptionId
      })
      //event emitter for letting the server know something has changed for subscription
      console.log('useeffect for change in deps.')
    }else didMount.current = true;
  }, [database, collection, stringifiedQuery])

  //write function that stops subscriptions
  const endSubscription = async () => {
    await currSocket.current.close();
  }

  return [ state, endSubscription ];
}
return useSubscribe;
}

const funcInvocation = Subscribe();
const obj = {};
obj.useSubscribe = funcInvocation;

export default obj;
