import React, { useState, useEffect, useId } from "react"
import InventoryList from './InventoryList.jsx'
import { getAllInventory } from '../services/inventory'
import { handleDecrementClickHelper, handleIncremementClickHelper } from '../services/events'

const Display = () => {
  const clientId = useId();
  
  const [ inventoryList, setInventoryList ] = useState({});
  

  //useEffect is called once to get initial data from DB - empty array brackets as 2nd param enables useEffect to only be called once
  useEffect(() => {
    // //create a SSE listener
    // const source = new EventSource(`/event/?id=${clientId}`);
    // // source.onmessage = e => console.log(JSON.parse(e.data)); // -> original function that logs parsed incoming JSON data but doesn't do anything with it
    // //! Add logic here
    // //! This is what returns when someone else modifies a document you're subscribed to
    // source.onmessage = e => {
    //   const parsedMessage = JSON.parse(e.data);
    //   const changedDocId = parsedMessage.documentKey._id;
    //   console.log(inventoryList.changedDocId);
    // }

    
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
      //create a SSE listener
    const source = new EventSource(`/event/?id=${clientId}`);
    // source.onmessage = e => console.log(JSON.parse(e.data)); // -> original function that logs parsed incoming JSON data but doesn't do anything with it
    //! Add logic here
    //! This is what returns when someone else modifies a document you're subscribed to
    source.onmessage = e => {
      const parsedMessage = JSON.parse(e.data);
      const changedDocId = parsedMessage.documentKey._id;
      console.log(inventoryList.changedDocId);
    }

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
    inventoryList = { inventoryList }
    handleIncDecClick = { handleIncDecClick }
    />
);
}

export default Display;