import React, { useState, useEffect } from "react"
import Item from './Item.jsx'


const InventoryList = ({ inventoryList, handleIncDecClick }) => {


  const inventory = [];
  let i = 0;

  // inventory.push(
  //   <Item
  //   key = { i }
  //   id = { inventoryList[items]._id } 
  //   item = { inventoryList[items].item }
  //   description = { inventoryList[items].description } 
  //   quantity = { inventoryList[items].quantity }
  //   price = { inventoryList[items].price}
  //   handleIncDecClick = { handleIncDecClick }    
  //   />
  // )

  //for every item in the database we add an item component for rendering
  for(let items in inventoryList){
    inventory.push(
      <Item
      key = { i }
      id = { inventoryList[items]._id } 
      item = { inventoryList[items].item }
      description = { inventoryList[items].description } 
      quantity = { inventoryList[items].quantity }
      price = { inventoryList[items].price}
      handleIncDecClick = { handleIncDecClick }    
      />
    )
    i++;
  }

  return (
    <div>
      <form onSubmit= { e => handleUserSubmit(e) }>
        <input type='text' placeholder='user name' name='user'></input>
        <button type='submit'>save</button>
      </form>
      { inventory }
    </div>
);
}

export default InventoryList;