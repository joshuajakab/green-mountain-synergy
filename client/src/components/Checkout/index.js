import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, selectOtherCartTotal } from '../../redux/Cart/cart.selectors';
import { useWindowWidthAndHeight } from '../../hooks';
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
    const [width, height] = useWindowWidthAndHeight();
    

    const realTotal = ((total * .06) + total) + 5
    const freeShipTotal = ((total * .06) + total)
    const tax = (total * .06)

    return (
        <div className='checkout'>
            
            <h1>
                Checkout
            </h1>
            <div className='cart'>
                {cartItems.length > 0 ? (
                    <div className='checkout-flex-container'>
                        {width > 1000 ?
                                <div className='checkout-header'>

                                                <h2 className='cart-titles-spacer'>-</h2>
                                    
                                                <h2 className='cart-titles'>Product:</h2>
                                         
                                                <h2 className='cart-titles'>Quantity:</h2>
                                        
                                                <h2 className='cart-titles'>Price:</h2>
                                         
                                                <h2 className='cart-titles-spacer'>-</h2>
                                         
                                </div>
                                :
                                null
                        }
                            
                                <div className='item-container'>
                                    
                                        {cartItems.map((item, pos) => {
                                            return (
                                                <ul key={pos} className='list-item-container'>
                                                    <li className='list-item'>
                                                        <Item {...item} />
                                                    </li>
                                                </ul>
                                            );
                                        })}
                                    
                                </div>
                            
                                <div className='total-container'>
                                    
                                            {total < 40 &&
                                                <h3>
                                                    
                                                    Subtotal: ${total} <br />
                                                    Shipping: $5 <br/>
                                                    6% Sales Tax: ${tax}<br/>
                                                    Total: ${realTotal}

                                                </h3>
                                            }

                                            {total >= 40 &&
                                            <h3>
                                                    
                                            Subtotal: ${total} <br />
                                            Shipping: FREE <br/>
                                            6% Sales Tax: ${tax} <br/>
                                            Total: ${freeShipTotal}

                                        </h3>}

                                           
                                            <div className='checkout-button-container'>
                                                
                                                            <Button onClick={() => history.goBack()}>
                                                                <h3>Continue Shopping</h3>
                                                        </Button>
                                                       
                                                            <Button onClick={() => history.push('/payment')}>
                                                                <h3>Checkout</h3>
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
