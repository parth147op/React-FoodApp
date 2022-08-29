import React,{ useReducer } from 'react';
const cartItems = React.createContext({
    items:[],
    totalAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}
})
const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    //const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if(existingCartItem){
      const updatedItem={
        ...existingCartItem,
        amount:1*existingCartItem.amount+1*action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex]=updatedItem;
    }
    else{
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if(action.type==='REMOVE'){
    const removeItemIndex = state.items.findIndex((item)=>item.id===action.item.id);
    const itemForBeRemoved = state.items[removeItemIndex];
    const updatedTotalAmount = state.totalAmount-itemForBeRemoved.price;
    let updatedItems;
    if(itemForBeRemoved.amount===1){
      updatedItems=state.items.filter((item)=>item.id!==action.item.id);
    }
    else{
      const updatedItem = {...itemForBeRemoved,amount:itemForBeRemoved.amount-1};
      updatedItems = [...state.items];
      updatedItems[removeItemIndex]=updatedItem;
    }
    return{
      items:updatedItems,
      totalAmount:updatedTotalAmount
    }
  }
  if(action.type==='CLEAR'){
    return defaultCartState;
  }
  return defaultCartState;
};

export const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };
    
  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({type: 'REMOVE',item: item});
  };

  const clearCartHandler = ()=>{
    dispatchCartAction({type:'CLEAR'});
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };
  console.log(cartItems.items);
  return (
    <cartItems.Provider value={cartContext}>
      {props.children}
    </cartItems.Provider>
  );
};

export default cartItems;

