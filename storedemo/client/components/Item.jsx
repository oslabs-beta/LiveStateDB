import React, { useState } from "react"

const Item = (
  { item, 
    description, 
    quantity, 
    price, 
    handleIncDecClick,
    id 
  }) => {
  
  if(quantity > 0 || quantity === 'quantity') return(
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
      {handleIncDecClick &&
        <button onClick={() => handleIncDecClick(id, 'quantity', -1)}>
          Purchase
        </button>
      }
      </li>
      
    </ul>
  )
}

export default Item;