import React from 'react';
import './shipping.css';

const Shipping = props => {

    return(
        <div className='shipping-container'>
            <h2 className='shipping-title'>Shipping Policy</h2>
            <p>We offer free shipping on all orders over $50.00. Any order less than $50.00 will be subject to a $5.00 shipping charge. Please note that the total after any coupon codes are applied will be the total we base our shipping price on. <br /><br />We do our best to ship products the same day, if orders are placed before noon. If your order does not get sent the same day it is received it will be sent the next business day. We will do our best to provide fast shipping but oftentimes delays are out of our control. We appreciate your understanding!</p>
        </div>
    )
}

export default Shipping;
