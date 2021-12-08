import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem, addProduct, reduceCartItem } from '../../../redux/Cart/cart.actions';
import './styles.css';


const Item = (product) => {
    const dispatch = useDispatch();

    const {
        productName,
        productThumbnail,
        fiveHundredPrice,
        oneThousandPrice,
        twoThousandPrice,
        quantity,
        documentID
    } = product;

    const handleRemoveCartItem = (product) => {
        dispatch(
            removeCartItem(
                product
            )
        );
    }

    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        );
    }

    const handleReduceItem = (product) => {
        dispatch(
            reduceCartItem(product)
        );
    }

    return (
        <div className='cart-items' >

            <img className='cart-thumb' src={productThumbnail} alt={productName} />

            <h3 className='product-name'>{productName}</h3>

            <div className='quantity-container'>

                <div className='cartBtn' onClick={() => handleReduceItem(product)}>
                    <h3>{`< `}</h3>
                </div>
                <div>
                    <h3>{quantity}</h3>
                </div>
                <div className='cartBtn' onClick={() => handleAddProduct(product)}>
                    <h3>{` >`}</h3>
                </div>
            </div>
            <div className='price-container'>
            {fiveHundredPrice > 0 &&
                <h3>
                    ${fiveHundredPrice}
                </h3>
            }
            {oneThousandPrice > 0 &&
                <h3>
                    ${oneThousandPrice}
                </h3>
            }
            {twoThousandPrice > 0 &&
                <h3>
                    ${twoThousandPrice}
                </h3>
            }
            </div>

            <div className='cart-button' onClick={() => handleRemoveCartItem(product)}>
                <h3>X</h3>
            </div>


        </div>
    );
}

export default Item;
