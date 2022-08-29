import React, { useContext } from 'react'
import cartItems from '../store/cartItem-store'
import classes from './MealItem.module.css'
import { Mealsform } from './Mealsform'

export const MealItem = (props) => {
  const cartCtx = useContext(cartItems);
  const addCartHandler = (amount)=>{
    cartCtx.addItem({
      id:props.id,
      name:props.title,
      amount:amount,
      price:props.price
    });
    console.log(amount+'bc');
    console.log(cartCtx.items);
  }

  return (
    <li className={classes.meal}>
        <div>
        <h3>{props.title}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
        </div>
        <Mealsform id={props.id} addTocart={addCartHandler}/>
    </li>
  )
}
