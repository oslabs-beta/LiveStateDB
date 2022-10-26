import React, { useState } from "react"

const Item = (
  { item, 
    description, 
    quantity, 
    price, 
    handleIncDecClick,
    id,
    className 
  }) => {
  
  return(
    <div class={ className }>
      <span class = 'values'>
        {item}
      </span>
      <span class = 'values'>
      {description}
      </span>
      <span class = 'values' id='quantity'>
      {quantity}
      <div className='buttonContainer'>
        {handleIncDecClick && 
          <button className='button' onClick={() => handleIncDecClick(id, 'quantity', 1)}>
            +
          </button>
        }
        {handleIncDecClick &&
          <button className='button' onClick={() => handleIncDecClick(id, 'quantity', -1)}>
            -
          </button>
        }
      </div>
      </span>
      <span class = 'values'>
        {price}
      </span>
    </div>
  )
}

export default Item;