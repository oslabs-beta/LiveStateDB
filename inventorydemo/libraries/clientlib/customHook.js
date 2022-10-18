import React, { useState, useEffect, useMemo, useRef } from 'react';
import uuid from 'react-uuid';

const useSubscribe = ({ database, collection, query }) => {
  const [ state, setstate ] = useState({});
  const subscriptionId = useMemo(() => uuid(), [])
  // const [ source, setSource ] = useState();
  const stringifiedQuery = JSON.stringify(query)
  const source = useRef()

  useEffect(() => {
    const url = 'https://localhost:3001/event/?'
    const params = {
      database: database,
      collection: collection,
      query: stringifiedQuery,
      subscriptionId: subscriptionId
    }
    
    source.current = new EventSource(url + new URLSearchParams(params))
    console.log('source.current: ', source.current);
    // const newSource = new EventSource(url + new URLSearchParams(params));
    // setSource(newSource);
    
    source.current.onmessage = e => {
      const {type, data} = JSON.parse(e.data);
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
    }



   

    return () => {
      // Unsubscribe from event stream
      //invoke stopSubscription
      endSubscription();
    }


  }, [database, collection, stringifiedQuery]); 



  //write function that stops subscriptions
  const endSubscription = () => {
    console.log('in endSubscription')
    // send delete request to Fastify server with subscription ID
    fetch('https://localhost:3001/event/?subscriptionId=' + subscriptionId , {
      method: 'DELETE',
    })
      .then(async (res) => {
        console.log(source);
        const eventClose = await source.current.close()
        console.log('eventClose ', eventClose)
      })
      .finally(() => console.log('after endSubscription has ran'))
  }

  return [ state, endSubscription ];
}

export default useSubscribe;
