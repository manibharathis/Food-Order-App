import CartContext from "./Cart-context";
import { useReducer } from "react";
const defaultCart={
    items:[],
    totalAmount:0
}
const cartReducer=(state,action)=>{
    if(action.type==="ADD-ITEM"){
       const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id)
       const existingCartItem=state.items[existingCartItemIndex]
       let updatedItem
       let updatedItems
       if(existingCartItem){
        console.log("item exists")
        updatedItem={
            ...existingCartItem,
            amount:existingCartItem.amount+action.item.amount
        }
        updatedItems=[...state.items]
        updatedItems[existingCartItemIndex]=updatedItem
       
       }
       else{
        updatedItems=state.items.concat(action.item)
       }
       const updatedTotalAmount=state.totalAmount+action.item.amount*action.item.price
       console.log(action.item)
       console.log(`updated items ${updatedItems.length}`)
       console.log(`updatedTotalAmount ${updatedTotalAmount}`)
       return{
        items:updatedItems,
        totalAmount:updatedTotalAmount
       }
    }
    if(action.type==="REMOVE-ITEM"){
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id)
        const existingCartItem=state.items[existingCartItemIndex]
        let updatedTotalAmount=state.totalAmount-existingCartItem.price
        if(updatedTotalAmount<0){
            updatedTotalAmount=0
        }
        if(existingCartItem){
            let updatedItems=[...state.items]
            let updatedAmount=existingCartItem.amount-1
            if(updatedAmount===0 || updatedAmount<0){
                   updatedItems=state.items.filter(item=>item.id!=action.id)
                   return{
                    items:updatedItems,
                    totalAmount:updatedTotalAmount
                   }
            }
           else{
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount-1
            }
            updatedItems[existingCartItemIndex]=updatedItem
            
           }
          
            
           
            return{
                items:updatedItems,
                totalAmount:updatedTotalAmount
            }
        }
        
       

    }
    if(action.type==="ADD-SINGLE-ITEM"){
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id)
        const existingCartItem=state.items[existingCartItemIndex]
        const updatedItem={
            ...existingCartItem,
            amount:existingCartItem.amount+1
        }
        const updatedItems=[...state.items]
        updatedItems[existingCartItemIndex]=updatedItem
        const updatedTotalAmount=state.totalAmount+action.item.price
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }

    }
    return defaultCart
}
const CartProvider=(props)=>{
   const [cart,dispatchCartAction]=useReducer(cartReducer,defaultCart)
    const addItemHanlder=(item)=>{
       dispatchCartAction({
        type:"ADD-ITEM",
        item:item
       })
    }
    const removeItemHandler=(id)=>{
        dispatchCartAction({
            type:"REMOVE-ITEM",
            id:id
           })
    }
    const addSingleItemHandler=(item)=>{
        dispatchCartAction({
            type:"ADD-SINGLE-ITEM",
            item:item
           })
    }
    const cartContext={
        items:cart.items,
        totalAmount:cart.totalAmount,
        addItem:addItemHanlder,
        removeItem:removeItemHandler,
        addSingleItem:addSingleItemHandler
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider