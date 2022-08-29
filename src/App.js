import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import './App.css'
import { Meals } from './components/Meals/Meals';
import { Cart } from './components/Cart/Cart';
import {CartProvider} from './components/store/cartItem-store';
function App() {
  const [cartShow,setCartShow]=useState(false);
  const showCartHandler = ()=>{
    setCartShow(true);
  }
  const hideCartHandler = ()=>{
    setCartShow(false);
  }
  return (
    <CartProvider>
      {cartShow && <Cart hidecart={hideCartHandler}/>}
      <Header cart={showCartHandler}/>
      <Meals/>
    </CartProvider>  
    );
}

export default App;
