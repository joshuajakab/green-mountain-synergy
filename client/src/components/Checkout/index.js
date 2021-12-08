import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, selectOtherCartTotal } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import './styles.css';
import Button from '../defaultComponents/Button';
import Item from './Item';


const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const Checkout = ({ }) => {
    const history = useHistory();
    const { cartItems, total } = useSelector(mapState);
    

    const realTotal = total + 5

    return (
        <div className='checkout'>
            <h1>
                Checkout
            </h1>
            <div className='cart'>
                {cartItems.length > 0 ? (
                    <div>
                                <div className='checkout-header'>
                                    
                                                <h2 className='cart-titles'>Product</h2>
                                         
                                                <h2 className='cart-titles'>Description</h2>
                                         
                                                <h2 className='cart-titles'>Quantity</h2>
                                        
                                                <h2 className='cart-titles'>Price</h2>
                                         
                                                <h2 className='cart-titles'>Remove</h2>
                                         
                                </div>
                            
                                <div>
                                    
                                        {cartItems.map((item, pos) => {
                                            return (
                                                <ul key={pos}>
                                                    <li>
                                                        <Item {...item} />
                                                    </li>
                                                </ul>
                                            );
                                        })}
                                    
                                </div>
                            
                                <div>
                                    
                                            {total < 40 &&
                                                <h3>
                                                    
                                                    Subtotal: ${total} <br />
                                                    Shipping: $5 <br/>
                                                    Total: ${realTotal}

                                                </h3>
                                            }

                                            {total >= 40 &&
                                            <h3>
                                                    
                                            Subtotal: ${total} <br />
                                            Shipping: FREE <br/>
                                            Total: ${total}

                                        </h3>}

                                           
                                            <div>
                                                
                                                            <Button onClick={() => history.goBack()}>
                                                                Continue Shopping
                                                        </Button>
                                                       
                                                            <Button onClick={() => history.push('/payment')}>
                                                                Checkout
                                                            </Button>

                                                       
                                            </div>
                                        
                                </div>
                           

                    </div>
                ) : (
                        <p>
                            Your cart is empty.
                        </p>
                    )}

            </div>
        </div>
    );
};

export default Checkout;
