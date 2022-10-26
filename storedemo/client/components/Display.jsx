import React, { useState, useEffect, useMemo, useRef } from "react"
import InventoryList from './InventoryList.jsx'
import { changeSingleInventoryField } from '../services/inventory'
// import { handleDecrementClickHelper } from '../services/events'
import { useSubscribe } from "../../../libraries/clientlib/customHook";
import { FaShoppingCart } from "react-icons/fa";
import Cart from './Cart.jsx'


//! Can pass props to Display {database, collection, query}, then just pass those variables as args into useSubscribe(database, collection, query)
const Display = () => {

  const [ inventoryHookOptions, setInventoryHookOptions] = useState({
    database: 'inventoryDemo',
    collection: 'inventoryitems',
    query: {}, 
  })

  const [ inventoryList, endSubscription ] = useSubscribe(inventoryHookOptions);
  // const [ cart, setCart ] = useState(0);
  const [ shoppingCart, setShoppingCart ] = useState({length: 0});
  const [ pressedCart, setPressedCart ] = useState(false);
  const counter = useRef(0);


  const addToCard = (id) => {
    setShoppingCart((oldCart) => {
      console.log(counter.current);
      const newCart = JSON.parse(JSON.stringify(oldCart));
      (counter.current === 0 || newCart[id] === 'sound') ? newCart[id] = 'sound' : newCart[id] = true
      counter.current++;
      return newCart;
    })
  }



  //increment/decrement click function
  const handleIncDecClick = (id, field, value) => {
    changeSingleInventoryField(id, field, value)
      // .then(setCart((prev) => prev + 1))
      .then(addToCard(id))
  }
  
  const handleCartClick = () => {
    setPressedCart(true);
  }

    return (
      <div>
        <div className='header'>
          <h1>
          <img src="./images/transparent.png" className='rickPicLeft'></img>
            Rick Rollin' Records
          <img src="./images/transparent.png" className='rickPicRight'></img>
          </h1>
        </div>
          <div className='display'>
          <Cart 
            quantity={counter.current}
            handleCartClick={handleCartClick}/>
          <h2> Record Shop </h2>
          <InventoryList
            inventoryList={inventoryList}
            handleIncDecClick={handleIncDecClick}
            pressedCart={pressedCart}
            shoppingCart={shoppingCart}
          />
        </div>
      </div>
    ); 
}

export default Display;