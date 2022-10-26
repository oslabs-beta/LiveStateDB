import React, { useState, useEffect, useMemo } from "react"
import InventoryList from './InventoryList.jsx'
import { changeSingleInventoryField } from '../services/inventory'
// import { handleDecrementClickHelper } from '../services/events'
import { useSubscribe } from "../../../libraries/clientlib/customHook";

//! Can pass props to Display {database, collection, query}, then just pass those variables as args into useSubscribe(database, collection, query)
const Display = () => {
  // let inventoryHookOptions = {
  //   database: 'inventoryDemo',
  //   collection: 'inventoryitems',
  //   query: {}
  // }
 
  const testHookOptions = {
    database: 'inventoryDemo',
    collection: 'inventoryitems',
    query: {item: 'iphone 13'},
  }
  const [ inventoryHookOptions, setInventoryHookOptions] = useState({
    database: 'inventoryDemo',
    collection: 'inventoryitems',
    query: {}, 
  })

  const [ inventoryList, endSubscription ] = useSubscribe(inventoryHookOptions);
  // const [ test, test2 ] = useSubscribe(testHookOptions);
  
  //increment/decrement click function
  const handleIncDecClick = (id, field, value) => {
    changeSingleInventoryField(id, field, value)
  }
  return (
    <div>
      <div className='header'>
        <h1>
        <img src="./images/transparent.png" className='rickPicLeft'></img>
          Rick Rollin' Records
        <img src="./images/transparent.png" className='rickPicRight'></img>
        </h1>
      </div>
      <div className='display'>
        <h2> Inventory Manager </h2>
        <InventoryList
          inventoryList={inventoryList}
          handleIncDecClick={handleIncDecClick}
        />
        {/* <button onClick={() => endSubscription() }> Unsubscribe </button>
        <button onClick={() => {
          const newOptions = JSON.parse(JSON.stringify(inventoryHookOptions));
          newOptions.query = {item: 'iphone 14'};
          setInventoryHookOptions(newOptions);
        }}> Change Query to item: 'iphone 14'</button>
              <button onClick={() => {
          const newOptions = JSON.parse(JSON.stringify(inventoryHookOptions));
          newOptions.query = {};
          setInventoryHookOptions(newOptions);
        }}> Change Query to object</button> */}
      </div>
    </div>
  );
}

export default Display;