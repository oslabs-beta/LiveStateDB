import React, { useState } from "react"

const Item = (
  { item, 
    description, 
    quantity, 
    price, 
    handleIncDecClick,
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
        <button onClick={() => handleIncDecClick(id, 'quantity', 1)}>
          Increment
        </button>
      </li>
      <li>
        <button onClick={() => handleIncDecClick(id, 'quantity', -1)}>
          Decrement
        </button>
      </li>
    </ul>
  )
}

export default Item;