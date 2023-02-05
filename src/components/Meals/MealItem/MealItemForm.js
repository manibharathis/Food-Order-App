import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef,useState } from 'react'
const MealItemForm=(props)=>{
    const [amountIsValid,setAmountIsValid]=useState(true)
    const amountInputRef=useRef();
    const handleSubmit=(e)=>{
         e.preventDefault()
         const enteredAmount=amountInputRef.current.value
         const enteredAmountNumber=+enteredAmount
         if(enteredAmount.trim().length===0||enteredAmountNumber<1||enteredAmountNumber>5){
            setAmountIsValid(false);
            return
         }
         else{
            setAmountIsValid(true)
         }
         props.onAddToCart(enteredAmountNumber)


    }
return(
       <form className={classes.form} onSubmit={handleSubmit}>
       <Input label='Amount' input={{
        ref:amountInputRef,
        id:"amount"+props.id,
        min:'0',
        max:'10',
        type :'number',
        step:'1',
        defaultValue:1
       }}/>
       <button>+ add</button>
      {amountIsValid===false && <p>please enter valid amount(1-5)</p>} 
       </form>
)
}
export default MealItemForm