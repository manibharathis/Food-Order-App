import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../Store/Cart-context"
import { useContext,useEffect, useState } from "react"
const HeaderCartButton=props=>{
    const cartCtx=useContext(CartContext)
    const {items} =cartCtx
    const [buttonBump,setbuttonBump]=useState(false)
    const cartCount=items.reduce((curNumber,item)=>{
        return curNumber+item.amount;
    },0)
    useEffect(()=>{
      if(items.length===0){
        return 
    }
    setbuttonBump(true)
    const timer=setTimeout(() => {
        setbuttonBump(false)
    }, 300);
    return()=>{
        clearTimeout(timer)
    }
    
    },[items]) 
    const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ''}`;
    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>your cart</span>
            <span className={classes.badge}>{cartCount}</span>
        </button>
    )
}
export default HeaderCartButton