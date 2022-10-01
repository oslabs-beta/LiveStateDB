import React, { useState } from "react"

const Item = (
  { item, 
    description, 
    quantity, 
    price, 
    handleIncremementClick,
    handleDecrementClick,
    id 
  }) => {
  
  return(
    <ul>
      <li>
        {item}
      </li>
      <li>
        {description}
      </li>
      <li>
        {quantity}
      </li>
      <li>
        {price}
      </li>
      <li>
        <button onClick={() => handleIncremementClick(id, 'quantity', 1)}>
          Increment
        </button>
      </li>
      <li>
        <button onClick={() => handleDecrementClick(id, 'quantity', -1)}>
          Decrement
        </button>
      </li>
    </ul>
  )
}

export default Item;