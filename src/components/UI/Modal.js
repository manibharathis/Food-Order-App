import  ReactDOM  from "react-dom"
import classes from './Modal.module.css'
import { Fragment } from "react"
const Backdrop=(props)=>{
return(
    <div onClick={props.onClose} className={classes.backdrop}>  
    </div>
)
}
const ModalOverLay=(props)=>{
    return(
       <div className={classes.modal}>
       <div>{props.children}</div>
       </div>
    )  
}

const portalElement = document.getElementById('overLays');
const Modal=(props)=>{
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)}
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,portalElement)}
        </Fragment>
    )
}
export default Modal