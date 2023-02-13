import React, {Fragment}from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/food-spread.jpg';
import HeaderCartButton from './HeaderCartButton';

export default function Header(props) {
    return (
        <Fragment>
            <header className= {classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClicked ={props.onShowCart}/>
            </header>
            <div className= {classes['main-image']}>
                <img src={mealsImage} alt= "A spread of food!"/>
            </div>
        </Fragment>
    )
}
