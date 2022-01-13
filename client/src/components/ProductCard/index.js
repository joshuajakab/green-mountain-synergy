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
        fiveHundredPrice,
        oneThousandPrice,
        twoThousandPrice,
        productDesc,
        productCategory,
        documentID
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
                        <h2>
                            {productName}
                        </h2>
                    </li>
                    <li>
                        {fiveHundredPrice > 0 &&
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
                        }
                    </li>
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
