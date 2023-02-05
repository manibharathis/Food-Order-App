import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartItem from '../Cart/CartItem/CartItem'
import { useContext } from 'react'
import CartContext from '../../Store/Cart-context'
const Cart=(props)=>{
    const cartCtx=useContext(CartContext) 
    const onAdd=(item)=>{
        cartCtx.addSingleItem(item)
    }
    const onRemove=(id)=>{
        cartCtx.removeItem(id)
    }
    const cartItem=<ul className={classes["cart-items"]}>{cartCtx.items.map((e,i)=><CartItem key={i} name={e.name} 
    price={e.price} amount={e.amount} onAdd={onAdd.bind(null,e)} onRemove={onRemove.bind(null,e.id)}/>)}</ul>
    const isItemAdded=cartCtx.items.length>0
    return(
        <Modal onClose={props.onClose}>
             
           {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`$ ${cartCtx.totalAmount.toFixed(2)}`}</span>
            </div>
            <div className={classes.actions}>

            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {isItemAdded&&<button className={classes.button}>Order</button>}
            </div> 
        </Modal>
    )   
}
export default Cart;