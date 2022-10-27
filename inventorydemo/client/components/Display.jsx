import React, { useState, useEffect, useMemo } from "react"
import InventoryList from './InventoryList.jsx'
import { changeSingleInventoryField } from '../services/inventory'
import { useSubscribe } from "../../../libraries/clientlib/customHook";

//! Can pass props to Display {database, collection, query}, then just pass those variables as args into useSubscribe(database, collection, query)
const Display = () => {

  const [ inventoryHookOptions, setInventoryHookOptions] = useState({
    database: 'inventoryDemo',
    collection: 'inventoryitems',
    query: {}, 
  })

  console.log('we are in Display React Component')
  const [ inventoryList, endSubscription ] = useSubscribe({
    database: 'inventoryDemo',
    collection: 'inventoryitems',
    query: {}, 
  });
  
  //increment/decrement click function
  const handleIncDecClick = (id, field, value) => {
    changeSingleInventoryField(id, field, value)
  }

  return (
    <div>
      <div className='header'>
        <h1>
        <img src="build/images/transparent.png" className='rickPicLeft'></img>
          Rick Rollin' Records
        <img src="build/images/transparent.png" className='rickPicRight'></img>
        </h1>
      </div>
      <div className='display'>
        <h2> Inventory Manager </h2>
        <InventoryList
          inventoryList={inventoryList}
          handleIncDecClick={handleIncDecClick}
        />
      </div>
    </div>
  );
}

export default Display;