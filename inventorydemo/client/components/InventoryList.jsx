import React, { useState, useEffect } from "react"
import Item from './Item.jsx'


const InventoryList = ({ inventoryList, handleIncremementClick, handleDecrementClick }) => {

  const inventory = [];
  let i = 0;
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
      handleIncremementClick = { handleIncremementClick }
      handleDecrementClick = { handleDecrementClick }     
      />
    )
    i++;
  }

  return (
    <div>
      { inventory }
    </div>

);
}

export default InventoryList;