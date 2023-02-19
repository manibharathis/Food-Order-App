import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartItem from '../Cart/CartItem/CartItem'
import { useContext,useState,React } from 'react'
import CartContext from '../../Store/Cart-context'
import OrderForm from '../Order/OrderForm'
import { Fragment } from 'react'
const Cart=(props)=>{
    const cartCtx=useContext(CartContext) 
    const [isOrderPlace,setOrderPlace]=useState(false)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [isSubmitted,setIsSubmitted]=useState(false)
    const onAdd=(item)=>{
        cartCtx.addSingleItem(item)
    }
    const onRemove=(id)=>{
        cartCtx.removeItem(id)
    }
    const handleOrder=()=>{
        setOrderPlace(true)  
    }
    const handleOrderPlaced=(isSubmitting,isSubmitted)=>{
       setIsSubmitting(isSubmitting)
       setIsSubmitted(isSubmitted)
    }
    
    const cartItem=<ul className={classes["cart-items"]}>{cartCtx.items.map((e,i)=><CartItem key={i} name={e.name} 
    price={e.price} amount={e.amount} onAdd={onAdd.bind(null,e)} onRemove={onRemove.bind(null,e.id)}/>)}</ul>
    const isItemAdded=cartCtx.items.length>0
    const modalitems=<div> {cartItem}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$ ${cartCtx.totalAmount.toFixed(2)}`}</span>
    </div>
    <div className={classes.actions}>
    {isOrderPlace?<OrderForm onClose={props.onClose} orderplaced={handleOrderPlaced}/>:<div><div><br></br></div>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
     {isItemAdded&&<button className={classes.button} onClick={handleOrder}>Order</button>}</div> }
    </div> </div>
    return(

        <Modal onClose={props.onClose}>
            {isSubmitting&&<div className={classes.actions}><span className={classes.total}>Placing order</span>
           <button className={classes['button--alt']} onClick={props.onClose}>Close</button>:
           </div>}
           {isSubmitted?<div className={classes.actions}><span className={classes.total}>Order placed Successfully</span>
           <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
           </div>:modalitems  }
        
          
        </Modal>
    )   
}
export default Cart;