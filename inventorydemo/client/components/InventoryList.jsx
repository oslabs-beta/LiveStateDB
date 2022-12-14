import React, { useState, useEffect } from "react"
import Item from './Item.jsx'


const InventoryList = ({ inventoryList, handleIncDecClick }) => {


  const inventory = [];
  let i = 0;

  inventory.push(
    <Item
    key = { 'description_row' }
    id = { 'descriptionRow' } 
    item = { 'Album' }
    description = { 'Description' } 
    quantity = { 'Quantity'}
    price = { 'Price' }
    className = { 'label' }  
    />
  )

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
      className = { 'row' }    
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