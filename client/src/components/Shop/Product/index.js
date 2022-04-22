import React, { useState } from 'react';
import Button from '../../defaultComponents/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions';

import './styles.css';


const Product = (product) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        documentID,
        productThumbnail,
        productName,
        price,
        productCategory,
        productDesc,
        soldOut
    } = product;


    if (!documentID || !productThumbnail || !productName ) return null;

    const configAddToCartBtn = {
        type: 'button',
    }

    const handleAddToCart = (product) => {
        if (!product) return;
        const productQuantity = 1


        dispatch(
            addProduct({
                productThumbnail,
                productName,
                productDesc,
                productCategory,
                price,
                documentID,
                productQuantity
            })
        );
        history.push('/cart');
    }



    

return (
    <div className='product'>
        <div className='thumb'>
            <Link to={`/product/${documentID}`}>
                <img className='thumb-img' src={productThumbnail} alt={productName} />
            </Link>
        </div>

        <div className='details'>
            <ul>
                <li>
                    <span className='name'>
                        <Link to={`/product/${documentID}`}>
                            <h3 className='product-info'>{productName}</h3>
                        </Link>
                    </span>
                </li>
              
                <li>
                    <span>
                        <h3 className='product-info'>${price}</h3>
                    </span>
                </li>

                <li>
                    <div className='add-to-cart'>
                    {!soldOut &&
                            <Button className='add-to-cart-button' {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                <h2>Add to cart</h2>
                            </Button>
                            }
                            {soldOut && 
                            <h3 className='sold-out'>Sorry we are temporarily sold out.</h3>
                            }
                    </div>
                </li>
            </ul>
        </div>

    </div>
);
};

export default Product;
