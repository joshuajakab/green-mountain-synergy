import React from 'react';
import Checkout from '../../components/Checkout';
import { useWindowWidthAndHeight } from '../../hooks';
import PhoneCheckout from '../PhoneCheckout';
import './cart.css';

const Cart = ({}) => {

    const [width, height] = useWindowWidthAndHeight();

    return (
        <div className='checkout-container'>
            
            

            <Checkout />
            

        </div>
    );
}

export default Cart;
