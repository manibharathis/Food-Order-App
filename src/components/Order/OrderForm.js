import { useState,useContext } from "react"
import classes from './OrderForm.module.css'
import CartContext from '../../Store/Cart-context'
const OrderForm=(props)=>{
    const cartCtx=useContext(CartContext)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [address,setAddress]=useState("")
  const [isNameError,setIsNameError]=useState(false)
  const [isEmailError,setIsEmailError]=useState(false)
  const [isAddressError,setIsAddressError]=useState(false)
  const nameIsValid=name.trim().length>0
  const emailIsValid=email.trim().length>0
  const addressIsValid=address.trim().length>0
  
 const handleSubmit=(event)=>{
    event.preventDefault()
    if(!nameIsValid){
        setIsNameError(true)
        return
        
    }
    else
    setIsNameError(false)
    if(!emailIsValid){
        setIsEmailError(true)
        return
    }
    else
    setIsEmailError(false)
    if(!addressIsValid){
        setIsAddressError(true)
        return
    }
    else
    setIsAddressError(false)
    console.log(`name: ${name}  email: ${email}  address: ${address}`)
     
    const addressDetail={
        name:name,
        email:email,
        address:address
        }
    console.log(addressDetail)
    props.orderplaced(true,false)
    const  sendData= async(addressDetail)=>{
        const response= await fetch('https://react-http-783d8-default-rtdb.firebaseio.com/address.json',{
            method:"POST",
            body:JSON.stringify({address:addressDetail,itemdetails:cartCtx.items}),
            headers:{
              'CONTENT-TYPE':'application/json'
             }
          })
          const postdata = await response.json();
           console.log(postdata)
        }
    
        sendData(addressDetail)
        props.orderplaced(false,true)
        setIsEmailError(false)
        setIsAddressError(false)
        setName("")
        setEmail("")
        setAddress("")
        cartCtx.reset()
    }   
    
  

  const handleNameChange=(event)=>{
    setName(event.target.value)
  }
  const handleEmailChange=(event)=>{
   
        setEmail(event.target.value)
    
}
const handleAddressChange=(event)=>{
   
        setAddress(event.target.value)
    
}
  return(
    <form className={classes["cart-items"]} onSubmit={handleSubmit} >
    <div className={classes.border}></div>
    <h2 className={classes.h2}>Customer Details</h2>
      <label className={classes.label} htmlFor="name">Name </label>
      {<input className={classes.input} type="text" value={name} id="name" onChange={handleNameChange}/>}
      {isNameError&&<p className={classes.error}>enter valid name</p>}
      <label className={classes.label} htmlFor="email">E-mail </label>
      <input type="email" value={email} className={classes.input} id="email" onChange={handleEmailChange}/><br></br>
      {isEmailError&&<p className={classes.error}>enter valid email</p>}
      <label className={classes.label} htmlFor="address">Address </label>
      <textarea type="text" className={classes.input} value={address} id="address" onChange={handleAddressChange}/><br></br>
      {isAddressError&&<p className={classes.error}>enter valid address</p>}
      <button className={classes.button}>confirm</button>
      <button className={classes.button} onClick={props.onClose}>close</button>
    </form>
  )
}
export default OrderForm