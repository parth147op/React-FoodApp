import React,{ useRef,useContext } from 'react';
import cartItems from '../store/cartItem-store';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    //const [formvalidity,setFormValidity]=useState({name:true,street:true,city:true,postalcode:true});
    const cartCtx = useContext(cartItems);
    const isEmpty = (value)=>value.trim()==='';
    const length5 = (value)=>value.trim().length===6;
    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();
    const confirmHandler = async(event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;
    //setFormValidity(!isEmpty(name),!isEmpty(street),!isEmpty(city),length5(postal));
    const formvalidity = !isEmpty(name)&&!isEmpty(street)&&!isEmpty(city)&&length5(postal);
    if(!formvalidity){
        alert('Invalid form inputs!!!!')
        return;
    }
    await fetch('https://meals-378cc-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:{
          name:name,
          street:street,
          postal:postal,
          city:city
        },
        orderedItems:cartCtx.items
      })
    });
    alert('Order Placed Successfully!!!');
    console.log('success');
    props.onCancel();
    cartCtx.clearCart();
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='number' id='postal' ref={postalRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        {<button className={classes.submit}>Confirm</button>};
      </div>
    </form>
  );
};

export default Checkout;