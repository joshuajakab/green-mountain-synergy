import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, selectOtherCartTotal } from '../../redux/Cart/cart.selectors';
import { useWindowWidthAndHeight } from '../../hooks';
import { createStructuredSelector } from 'reselect';
import './styles.css';
import Button from '../defaultComponents/Button';
import Item from './Item';
import FormInput from '../defaultComponents/Input';


const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const Checkout = ({ }) => {
    const history = useHistory();

    const { cartItems, total } = useSelector(mapState);
    const [width, height] = useWindowWidthAndHeight();
    const [discountCode, setDiscountCode] = useState('');

    const currencyFormatter = () => {

    }


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

                                <h2 className='cart-titles'>Product</h2>

                                <h2 className='cart-titles'>Quantity</h2>

                                <h2 className='cart-titles'>Price</h2>

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
                                <div className='total'>
                                    <h2>

                                        Subtotal: ${total.toFixed(2)} <br />
                                        Shipping: $5.00 <br />
                                        6% Sales Tax: ${tax.toFixed(2)}<br />
                                        Total: ${realTotal.toFixed(2)}

                                    </h2>
                                </div>
                            }

                            {total >= 40 &&
                                <div className='total'>
                                    <h2>

                                        Subtotal: ${total.toFixed(2)} <br />
                                        Shipping: FREE <br />
                                        6% Sales Tax: ${tax.toFixed(2)} <br />
                                        Total: ${freeShipTotal.toFixed(2)}

                                    </h2>
                                </div>}


                            <div className='checkout-button-container'>

                                <Button className='checkout-button' onClick={() => history.push('/shop')}>
                                    <h2>Continue Shopping</h2>
                                </Button>

                                <Button className='checkout-button' onClick={() => history.push('/payment')}>
                                    <h2>Checkout</h2>
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
