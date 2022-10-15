import React, { useState, useEffect, useMemo } from 'react';
import uuid from 'react-uuid';

const useSubscribe = ({ database, collection, query }) => {
  const [inventoryList, setInventoryList] = useState({});
  const stateId = useMemo(() => uuid(), [])
  useEffect(() => {
    const url = 'https://localhost:3001/event/?'
    const params = {
      database: database,
      collection: collection,
      query: JSON.stringify(query),
      id: stateId
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
  }, [stateId]);

  return {inventoryList, stateId};
}

export default useSubscribe;
