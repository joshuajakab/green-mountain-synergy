import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../defaultComponents/Button';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './styles.css';
import FormSelect from '../defaultComponents/Select';

const mapState = state => ({
    product: state.productsData.product,
    totalNumCartItems: selectCartItemsCount(state)
})



const ProductCard = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productID } = useParams();
    const { product } = useSelector(mapState);
    const [isChecked, setIsChecked] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1);
    const totalNumCartItems = useSelector(mapState);
    
    // const [productPrice, setProductPrice] = useState(product)

    

    

    

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

    const handleQuantity = e => {
       
        setProductQuantity(parseInt(e.target.value, 10));
        
    }

    

    const {
        productThumbnail,
        productThumbnailTwo,
        productThumbnailThree,
        productName,
        price,
        productDesc,
        productCategory,
        documentID,
        quantity
    } = product;

   

    const handleAddToCart = (product) => {
        if (!productQuantity) setProductQuantity(1);
        //console.log(productQuantity)
        if (!product) return;
        
        
        dispatch(
            addProduct({
                productThumbnail,
                productThumbnailTwo,
                productThumbnailThree,
                productName,
                price,
                productDesc,
                productCategory,
                documentID,
                quantity,
                productQuantity
            })
        );
        history.push('/cart');
    }

    const configQuantitySelect = {
        defaultValue: productQuantity,
        options: [{
            name: '1',
            value: 1
        }, {
            name: '2',
            value: 2
        }, {
            name: '3',
            value: 3
        }, {
            name: '4',
            value: 4
        }],
        handleChange: handleQuantity
    };

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
                            {/*<form>
                            <select className='quantity' name='productQuantity' value={productQuantity} onChnage={e => setProductQuantity(parseInt(e.target.value, 10))}>
                                <option selected value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                            </form>*/}
                            <FormSelect {...configQuantitySelect} />
                            <Button className='add-to-cart-button' {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
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
