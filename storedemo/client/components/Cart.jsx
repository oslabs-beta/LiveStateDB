import React, { useState, useEffect, useMemo } from "react"
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";



const Cart = ({ quantity, handleCartClick }) => {
  console.log('quantity', quantity)
  console.log(typeof quantity)
  if(quantity > 0){
    return(
        <div className="cart">
          <button className='cartButton' onClick={() => handleCartClick()}>
          <FaShoppingCart className="cartIcon" fill="#E3242B"/>
          <div className="quantity"> {quantity} </div>
          </button>
        </div>
    )
  }else {
    return(
      <div className="cart">
        <FaShoppingCart  />
      </div>
    )
  }
  

}

export default Cart;