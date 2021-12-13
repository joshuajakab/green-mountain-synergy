import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../defaultComponents/Button';
import './styles.css';

const mapState = state => ({
    product: state.productsData.product
})



const ProductCard = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productID } = useParams();
    const { product } = useSelector(mapState);
    const [isChecked, setIsChecked] = useState(false)
    // const [productPrice, setProductPrice] = useState(product)

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc,
        productCategory,
        secondProductPrice
    } = product;



    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);



    const handleAddToCart = (product) => {
        if (!product) return null;
        if (isChecked) {
            dispatch(
                addProduct({
                    productThumbnail,
                    productName,
                    productDesc,
                    productCategory,
                    secondProductPrice
                })
            );
        }
        if (!isChecked) {
            dispatch(
                addProduct({
                    productThumbnail,
                    productName,
                    productDesc,
                    productCategory,
                    productPrice
                })
            );
        }
        history.push('/cart');
    }



    const configAddToCartBtn = {
        type: 'button'
    }

    return (
        <div className='productCard'>
            <div className='hero'>
                <img src={productThumbnail} />
            </div>
            <div className='productDetails'>
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    {productCategory === 'prints' && secondProductPrice !== 0 &&
                        <li>
                            8.5" x 11" <br />
                            12" x 18": <input name='largePrint' type='checkbox' checked={isChecked} onChange={(event) => setIsChecked(event.currentTarget.checked)} />
                        </li>
                    }
                    {productCategory === 'prints' && secondProductPrice === 0 &&
                        <li>
                            8.5" x 11"
                            
                            
                        </li>
                    }
                    {isChecked &&
                        <li>
                            <span>
                                ${secondProductPrice}
                            </span>
                        </li>
                    }
                    {!isChecked &&
                        <li>
                            <span>
                                ${productPrice}
                            </span>
                        </li>
                    }
                    <li>
                        <div className='addToCart'>
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span
                            className='desc'
                            dangerouslySetInnerHTML={{ __html: productDesc }}
                        >

                        </span>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default ProductCard;
