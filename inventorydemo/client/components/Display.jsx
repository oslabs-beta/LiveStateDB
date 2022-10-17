import React, { useState, useEffect } from "react"
import InventoryList from './InventoryList.jsx'
import { changeSingleInventoryField } from '../services/inventory'
// import { handleDecrementClickHelper } from '../services/events'
import useSubscribe from "../../libraries/clientlib/customHook";

//! Can pass props to Display {database, collection, query}, then just pass those variables as args into useSubscribe(database, collection, query)
const Display = () => {
  const inventoryHookOptions = {
    database: 'inventoryDemo',
    collection: 'inventoryitems',
    query: {}
  }
  
  const testHookOptions = {
    database: 'inventoryDemo',
    collection: 'inventoryitems',
    query: {item: 'iphone 14'}
  }

  const [ inventoryList, stateId ] = useSubscribe(inventoryHookOptions);
  // const [ test, test2 ] = useSubscribe(testHookOptions);
  
  //increment/decrement click function
  const handleIncDecClick = (id, field, value) => {
    changeSingleInventoryField(id, field, value)
  }

  return (
    <InventoryList
      inventoryList={inventoryList}
      handleIncDecClick={handleIncDecClick}
    />
);
}

export default Display;