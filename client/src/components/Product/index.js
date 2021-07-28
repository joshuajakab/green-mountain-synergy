import React, { useState } from 'react';
import Button from '../../../components/forms/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions'


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
                <img src={productThumbnail} alt={productName} />
            </Link>
        </div>

        <div className='details'>
            <ul>
                <li>
                    <span className='name'>
                        <Link to={`/product/${documentID}`}>
                            {productName}
                        </Link>
                    </span>
                </li>
                <li>
                    {productCategory}
                </li>
                {fiveHundredPrice &&
                    <li>
                        <span>
                            ${fiveHundredPrice}
                        </span>
                    </li>
                }
                {oneThousandPrice &&
                    <li>
                        <span>
                            ${oneThousandPrice}
                        </span>
                    </li>
                }
                {twoThousandPrice &&
                    <li>
                        <span>
                            ${twoThousandPrice}
                        </span>
                    </li>
                }

                <li>
                    <div className='addToCart'>
                        <Button {...configAddToCartButton} onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </Button>
                    </div>
                </li>
            </ul>
        </div>

    </div>
);
};

export default Product;
