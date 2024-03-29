import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../Store/Cart-context'
import { useContext } from 'react'
const MealItem=(props)=>{
    const price=`$${props.price.toFixed(2)}`
    const cartCtx=useContext(CartContext)
    const handleAddToCart=(amount)=>{
       cartCtx.addItem({
        id:props.id,
        amount:amount,
        name:props.name,
        price:props.price
       })
    }
  return(
    <li className={classes.meal}>
        <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        </div>
        <div>
        <MealItemForm id={props.id} onAddToCart={handleAddToCart}/>
        </div>
        
    </li>
  )
}
export default MealItem