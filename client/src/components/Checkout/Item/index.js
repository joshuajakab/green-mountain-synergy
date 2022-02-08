import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem, addOneProduct, reduceCartItem } from '../../../redux/Cart/cart.actions';
import { useWindowWidthAndHeight } from '../../../hooks';
import './styles.css';


const Item = (product) => {
    const dispatch = useDispatch();
    const [width, height] = useWindowWidthAndHeight();

    const {
        productName,
        productThumbnail,
        fiveHundredPrice,
        oneThousandPrice,
        twoThousandPrice,
        quantity,
        price,
        productDesc,
        documentID
    } = product;

    const handleRemoveCartItem = (product) => {
        dispatch(
            removeCartItem(
                product
            )
        );
    }

    const handleAddOneProduct = (product) => {
        dispatch(
            addOneProduct(product)
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

            {width > 1000 ?
            <div className='full-width-checkout'>
            <h3 className='product-name'>{productName}</h3>

            <div className='quantity-container'>

                <div className='cartBtn' onClick={() => handleReduceItem(product)}>
                    <h3 className='quantity-buttons'>{`< `}</h3>
                </div>
                <div>
                    <h3 className='quantity-buttons'>{quantity}</h3>
                </div>
                <div className='cartBtn' onClick={() => handleAddOneProduct(product)}>
                    <h3 className='quantity-buttons'>{` >`}</h3>
                </div>
                

            </div>
            </div>
            :
            <div className='cart-product-container'>
            <h2>Product</h2>
            <h3 className='product-name'>{productName}</h3>
            <h2>Quantity</h2>
            <div className='quantity-container'>

                <div className='cartBtn' onClick={() => handleReduceItem(product)}>
                    <h3 className='quantity-buttons'>{`< `}</h3>
                </div>
                <div>
                    <h3 className='quantity-buttons'>{quantity}</h3>
                </div>
                <div className='cartBtn' onClick={() => handleAddOneProduct(product)}>
                    <h3 className='quantity-buttons'>{` >`}</h3>
                </div>
            </div>
                
            <h2>Price</h2>
            </div>
}
            <div className='price-container'>
            
          {/*  {fiveHundredPrice > 0 &&
                <h3 className='price'>
                    ${fiveHundredPrice}
                </h3>
            }
            {oneThousandPrice > 0 &&
                <h3 className='price'>
                    ${oneThousandPrice}
                </h3>
            }
            {twoThousandPrice > 0 &&
                <h3 className='price'>
                    ${twoThousandPrice}
                </h3>
            } */}
            <h3 className='price'>${price}</h3>
            </div>

            <div className='cart-button' onClick={() => handleRemoveCartItem(product)}>
                <h3 className='remove-button'>Remove</h3>
            </div>

        
        </div>

    );
}

export default Item;
