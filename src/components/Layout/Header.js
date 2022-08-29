import React,{Fragment} from 'react'
import MealImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import { HeaderCartButton } from './HeaderCartButton'
export const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>Foodzap</h1>
            <HeaderCartButton showcart={props.cart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={MealImage} alt='A table full of delicious food' />
        </div>
    </Fragment>
  )
}
