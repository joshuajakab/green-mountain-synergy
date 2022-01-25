import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../defaultComponents/Button';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
        productThumbnailTwo,
        productThumbnailThree,
        productName,
        fiveHundredPrice,
        oneThousandPrice,
        twoThousandPrice,
        price,
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
                price,
                documentID
            })
        );
        history.push('/cart');
    }



    const configAddToCartBtn = {
        type: 'button'
    }

    return (
        <div className='product-card'>
            <div className='carousel-container'>
            <Carousel>
                <div>
                    <img className='product-img' src={productThumbnail} />
                </div>
                <div>
                    <img className='product-img' src={productThumbnailTwo} />
                </div>
                <div>
                    <img className='product-img' src={productThumbnailThree} />
                </div>
            </Carousel>
            </div>
            <div className='product-details'>
                <ul>
                    <li>
                        <h2>
                            {productName}
                        </h2>
                    </li>
                    <li>
                       {/* {fiveHundredPrice > 0 &&
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
                        <h3 className='price'>
                            ${price}
                        </h3>
                    </li>
                    <li>
                        <div className='addToCart'>
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                <h2>Add to cart</h2>
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
