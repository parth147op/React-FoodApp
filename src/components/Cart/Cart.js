import React, { useContext, useState } from 'react'
import cartItems from '../store/cartItem-store'
// import { Modal } from '../UI/Modal'
import classes from './Cart.module.css'
import Checkout from './Checkout';
// const dummyCartItem = [
//     {
//         id: 'c1',
//         name: 'Vada Pav',
//         amount: 2,
//         price: 10
//     },
//     {
//         id: 'c1',
//         name: 'Vada Pav',
//         amount: 2,
//         price: 10
//     }
// ]
export const Cart = (props) => {
    const cartCtx = useContext(cartItems);
    const [orderBtn,setOrderBtn] = useState(false);
    const [removOrderBtn,setremovOrderBtn] = useState(true);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    console.log(cartCtx.items);
    const cartItemAddHandler = (item) => { 
        cartCtx.addItem({...item,amount:1});
    };
    const removeItemHandler = (item)=>{
        cartCtx.removeItem(item);
    }
    const orderbtnHandler = (event)=>{
        event.preventDefault();
        setOrderBtn(true);
        setremovOrderBtn(false);
    }
    return (
        <div className={classes.backdrop}>
            <div className={classes.modal}>
                <ul className={classes['cart-items']}>
                    {cartCtx.items.map((item)=>(
                        <li className={classes['cart-item']}>
                        <div>
                            <h2>{item.name}</h2>
                            <div className={classes.summary}>
                                <span className={classes.price}>{item.price}</span>
                                <span className={classes.amount}>x {item.amount}</span>
                            </div>
                        </div>
                        <div className={classes.actions}>
                            <button onClick={()=>removeItemHandler(item)}>−</button>
                            <button onClick={()=>cartItemAddHandler(item)}>+</button>
                        </div>
                    </li>
                    ))}
                    

                </ul>

                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                {orderBtn&&<Checkout onCancel={props.hidecart}/>}
                {removOrderBtn&&<div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.hidecart}>Close</button>
                    <button className={classes.button} onClick={orderbtnHandler}>Order</button>
                </div>}
                
            </div>
        </div>

    )
}
