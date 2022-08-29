import React, { useRef, useState } from 'react'
// import { Input } from '../UI/Input'
import classes from './Mealsform.module.css'

export const Mealsform = (props) => {
  const [amount,setAmount]=useState(1);
  //const amountInputRef = useRef();
  const submitHandler=async (event)=>{
    event.preventDefault();
    //const enteredAmount = amountInputRef.current.value;
    const enteredFinalAmout = amount;
    // const meals = [];
    // console.log(props.id+props.title);
    // meals.push({
    //   id:props.id,
    //   name:props.title,
    //   amount:amount,
    //   price:props.price
    // })
    props.addTocart(enteredFinalAmout);
    console.log(enteredFinalAmout+'abc');
    // const response = await fetch('https://moviesapi-24fc6-default-rtdb.firebaseio.com/meals.json',{
    //   method:'POST',
    //   body:JSON.stringify(meals),
    //   headers:{
    //     'Content-type':'application/json'
    //   }
    // });
    // const data = response.json();
    // console.log(data);
  }
  const inputHandler=(event)=>{
    setAmount(event.target.value);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.input}>
            <label>Amount</label>
            <input id={`amount_`+props.id} type='number' min='1' max='5' step='1'
            //  ref={amountInputRef} 
             defaultValue='1' onChange={inputHandler}/>
        </div> 
        <button>Add</button>
    </form>
  )
}
