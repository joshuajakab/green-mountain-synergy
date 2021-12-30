import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '../MenuIcon';
import Menu from '../Menu';
import Cart from '../../media/cart.svg';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import './styles.css';

const mapState = (state) => ({

    totalNumCartItems: selectCartItemsCount(state)

});

const PhoneHeader = props => {

    const { totalNumCartItems } = useSelector(mapState);

    return (
        <div className='phone-header' >
            
            <Link to='/' className='title' onClick={props.click}>Green Mountain Synergy</Link> 
            <Link className='phone-cart' to='/cart'>
                <img className='cart-img' src={Cart} alt='cart' />
            </Link>
        </div>
    )
};

export default PhoneHeader;
