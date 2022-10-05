import React, { useState, useEffect, useId } from "react"
import InventoryList from './InventoryList.jsx'
import { getAllInventory } from '../services/inventory'
import { handleDecrementClickHelper, handleIncremementClickHelper } from '../services/events'
import uuid from 'react-uuid';

const Display = () => {
  const clientId = useId();
  
  const [ inventoryList, setInventoryList ] = useState({});
  const [ userId, setUserId ] = useState(uuid());
  

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
    const source = new EventSource(`/event/?id=${userId}&db=inventoryDemo&collection=inventoryitems&query={}`);
    source.onmessage = e => console.log(JSON.parse(e.data));

  }, [userId])

  //useEffect is called once to get initial data from DB - empty array brackets as 2nd param enables useEffect to only be called once
  useEffect(() => {
    getAllInventory()
      .then((data) => {
        //the result from getAllInventory is an array, it needs to be converted to an object before setting state
        const obj = {};
        for(let i = 0; i < data.length; i++){
          obj[data[i]._id] = data[i];
          // delete obj[data[i]._id]._id; 
        }
        setInventoryList(obj);
      })
  }, [])

  //increment/decrement click function
  const handleIncDecClick = (id, field, value) => {
    handleDecrementClickHelper(id, field, value)
      .then((data) => {
        //update the state, must copy object so React updates state
        const obj = JSON.parse(JSON.stringify(inventoryList));
        obj[data[0]._id] = data[0];
        setInventoryList(obj);
    })
  }

  //increment click function
  // const handleIncremementClick = async (id, field, value) => {
  //   await handleIncremementClickHelper(id, field, value)
  //     .then((data) => {
  //       //update the state
  //       const obj = JSON.parse(JSON.stringify(inventoryList));
  //       obj[data[0]._id] = data[0];
  //       setInventoryList(obj);
  //     })
  // }

  return (
    <InventoryList
    userId = { userId } 
    inventoryList = { inventoryList }
    handleIncDecClick = { handleIncDecClick }
    setUserId = { setUserId }
    />
);
}

export default Display;