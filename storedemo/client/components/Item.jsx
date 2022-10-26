import React, { useState } from "react"

const Item = (
  { item, 
    description, 
    quantity, 
    price, 
    handleIncDecClick,
    id,
    imageUrl,
    pressedCart,
    shoppingCart
  }) => {
  
  if(quantity > 0){
  return(
    <div className='card'>
      {pressedCart === false &&
      <img
      src= { imageUrl}
      onError={(e) => e.currentTarget.src = './images/logo.png'}
      /> 
      }
      {pressedCart === true && shoppingCart === false &&
        <img
        src= { imageUrl}
        onError={(e) => e.currentTarget.src = './images/logo.png'}
        /> 
      }
      {pressedCart === true && shoppingCart === true &&
      <iframe  
      src="https://www.youtube.com/embed/eBGIQ7ZuuiU?controls=0&autoplay=1&mute=1"
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen></iframe>
      }
      {pressedCart === true && shoppingCart === 'sound' &&
      <iframe  
      src="https://www.youtube.com/embed/eBGIQ7ZuuiU?controls=0&autoplay=1&muted=1"
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen></iframe>
      }

      <div className= 'values'>
        {item}
      </div>
      <div className = 'values'>
        {description}
      </div>
      {/* <div className = 'values' id='quantity'>
        {quantity}
      </div> */}
      <div className = 'values'>
        ${price}
      </div>
      <div>
        <button onClick={() => handleIncDecClick(id, 'quantity', -1)}>
          Add to Cart
        </button>
      </div>
    </div>
  )}else {
    return ( <></>)
  }
}

export default Item;