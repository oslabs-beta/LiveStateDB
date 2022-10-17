import React, { useState, useEffect, useMemo } from 'react';
import uuid from 'react-uuid';

const useSubscribe = ({ database, collection, query }) => {
  const [ state, setstate ] = useState({});
  const subscriptionId = useMemo(() => uuid(), [])
  useEffect(() => {
    const url = 'https://localhost:3001/event/?'
    const params = {
      database: database,
      collection: collection,
      query: JSON.stringify(query),
      subscriptionId: subscriptionId
    }

    const source = new EventSource(url + new URLSearchParams(params));

    source.onmessage = e => {
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

      // const updatedstate = JSON.parse(JSON.stringify(state));

    }

    return () => {
      // Unsubscribe from event stream
    }
  }, [subscriptionId]);

  return [ state, subscriptionId ];
}

export default useSubscribe;
