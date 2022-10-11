import React, { useState, useEffect, useMemo } from 'react';
import uuid from 'react-uuid';

const useSubscribe = (database, collection, query) => {
  const [inventoryList, setInventoryList] = useState({});
  const clientId = useMemo(() => uuid(), []);
  
  useEffect(() => {
    //adding list of params to query
    //   const params = {
    //     type: 'public',
    //     app_id: APP_ID,
    //     app_key: APP_KEY,
    //     q: id,
    // }
    // fetch(URL + new URLSearchParams(params))
    // const source = new EventSource(`/event/?id=${userId}`);

    //return object from message 
    // { type: (get, update, insert, delete)
    //   data: if get --> normal query response 
    //         else --> change stream
    // }
    const source = new EventSource(
      `https://localhost:3001/event/?id=${clientId}&database=inventoryDemo&collection=inventoryitems&query={}`
    );

    source.onmessage = e => {
      const {type, data} = JSON.parse(e.data);
      const id = data.documentKey?._id;
      switch (type) {
        case 'get':
          {
            const obj = {};
            for(let i = 0; i < data.length; i++){
              obj[data[i]._id] = data[i];
              // delete obj[data[i]._id]._id; 
            }
            setInventoryList(obj);
            break;
          }
        case 'insert' :
          {
            const newInsertion = {};
            newInsertion[id] = data.fullDocument;
            setInventoryList((previousInventoryList) => 
            {
              const updatedInventoryList = JSON.parse(JSON.stringify(previousInventoryList));
              Object.assign(updatedInventoryList, newInsertion);
              return updatedInventoryList;
            });
            break;
          }
        case 'update' :
          {
            const update = data.updateDescription.updatedFields;
            setInventoryList((previousInventoryList) => 
            {
              const updatedInventoryList = JSON.parse(JSON.stringify(previousInventoryList));
              Object.assign(updatedInventoryList[id], update);
              return updatedInventoryList;
            });
            break;
          }
        case 'delete':
          {
            setInventoryList((previousInventoryList) => 
            {
              const updatedInventoryList = JSON.parse(JSON.stringify(previousInventoryList));
              delete updatedInventoryList[id];
              return updatedInventoryList;
            });
            console.log('Delete case fired');
            break;
          }
      }

      // const updatedInventoryList = JSON.parse(JSON.stringify(InventoryList));

    }

    return () => {
      // Unsubscribe from event stream
    }
  }, [clientId, database, collection, query]);

  return {inventoryList, clientId};
}

export default useSubscribe;
