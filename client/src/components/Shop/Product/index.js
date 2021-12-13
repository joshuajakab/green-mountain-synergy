import React, { useState } from 'react';
import Button from '../../defaultComponents/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions'
import './styles.css';


const Product = (product) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        documentID,
        productThumbnail,
        productName,
        fiveHundredPrice,
        oneThousandPrice,
        twoThousandPrice,
        productCategory,
        productDesc
    } = product;


    if (!documentID || !productThumbnail || !productName || typeof fiveHundredPrice === 'undefined') return null;

    const configAddToCartButton = {
        type: 'button',
    }

    const handleAddToCart = (product) => {
        if (!product) return;


        dispatch(
            addProduct({
                productThumbnail,
                productName,
                productDesc,
                productCategory,
                fiveHundredPrice,
                oneThousandPrice,
                twoThousandPrice,
                documentID
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
                
                {fiveHundredPrice > 0 &&
                    <li>
                        <span>
                        <h3 className='product-info'>${fiveHundredPrice}</h3>
                        </span>
                    </li>
                }
                {oneThousandPrice > 0 &&
                    <li>
                        <span>
                        <h3 className='product-info'>${oneThousandPrice}</h3>
                        </span>
                    </li>
                }
                {twoThousandPrice > 0 &&
                    <li>
                        <span>
                        <h3 className='product-info'>${twoThousandPrice}</h3>
                        </span>
                    </li>
                }

                <li>
                    <div className='add-to-cart'>
                        <Button {...configAddToCartButton} onClick={() => handleAddToCart(product)}>
                            <h3>Add to Cart</h3>
                        </Button>
                    </div>
                </li>
            </ul>
        </div>

    </div>
);
};

export default Product;