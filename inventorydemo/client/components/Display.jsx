import React, { useState, useEffect } from "react"
import InventoryList from './InventoryList.jsx'
import { getAllInventory } from '../services/inventory'
import { handleDecrementClickHelper, handleIncremementClickHelper } from '../services/events'
import uuid from 'react-uuid';
import useSubscribe from "../clientlib/customHook.js";

//! Can pass props to Display {database, collection, query}, then just pass those variables as args into useSubscribe(database, collection, query)
const Display = () => {
  const { inventoryList, clientId} = useSubscribe('inventoryDemo', 'inventoryitems', {});
  const { test, test2 } = useSubscribe('inventoryDemo', 'inventoryitems', {item: 'iphone 14'});
  //increment/decrement click function
  const handleIncDecClick = (id, field, value) => {
    handleDecrementClickHelper(id, field, value)
      // .then((data) => {
        //update the state, must copy object so React updates state
        // const obj = JSON.parse(JSON.stringify(inventoryList));
        // obj[data[0]._id] = data[0];
        // setInventoryList(obj);
    // })
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
      clientId={clientId} 
      inventoryList={inventoryList}
      handleIncDecClick={handleIncDecClick}
      // setClientId={setClientId}
    />
);
}

export default Display;