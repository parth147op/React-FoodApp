import React, { useContext, useEffect, useState} from 'react'
import { CartIcon } from '../Cart/CartIcon'
import cartItems from '../store/cartItem-store'
import classes from './HeaderCartButton.module.css'
export const HeaderCartButton = (props) => {
  const cartCtx = useContext(cartItems);
  const totalitems = cartCtx.items.length;
  const [btnHighlight,setbtnHighlight]=useState(true);
  useEffect(()=>{
    setbtnHighlight(true);
    const timer = setTimeout(()=>{
      setbtnHighlight(false);
    },300);
    return ()=>{
      clearTimeout(
        timer
      );
    }
  },[cartCtx.items]);
  const btnClasses = `${btnHighlight?classes.bump:''}`;
  console.log(btnClasses);
  return (
    <div className={btnClasses}>
    <button className={classes.button} onClick={props.showcart}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalitems}</span>
    </button>
    </div>
  )
}
