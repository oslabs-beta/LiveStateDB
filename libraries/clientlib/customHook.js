import React, { useState, useEffect, useMemo, useRef } from 'react';
import uuid from 'react-uuid';
import { io } from 'socket.io-client'

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
        const {type, data} = JSON.parse(e);
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
              break;
            }
        }
      })

      return () => {
        // Unsubscribe from event stream
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

export const useSubscribe = Subscribe();
