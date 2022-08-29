import React from 'react'
import { createPortal } from 'react-dom'
import classes from './Module.module.css'
const Backdrop = (props)=>{
    return(<div className={classes.backdrop}></div>)
}
const ModelOverlay = (props)=>{
    return(
        <div className={classes.modal}>
            <div className={classes.modal}>{props.children}</div>
        </div>
    )
}
export const Modal = (props) => {
  return (
    <React.Fragment>
        {createPortal(<Backdrop/>,document.getElementById('overlays'))}
        {createPortal(<ModelOverlay>{props.children}</ModelOverlay>,document.getElementById('overlays'))}
    </React.Fragment>
  )
}
