import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import { addReviewStart, fetchReviewsStart, setReviews } from '../../redux/Reviews/reviews.actions';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../defaultComponents/Button';
import { Carousel } from 'react-responsive-carousel';
import { Rating } from '@mui/material';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './styles.css';
import FormSelect from '../defaultComponents/Select';
import FormInput from '../defaultComponents/Input';
import TextArea from '../defaultComponents/Textarea';
import Review from './Review';
import { addReview } from '../../redux/Reviews/reviews.sagas';

const mapState = state => ({
    product: state.productsData.product,
    totalNumCartItems: selectCartItemsCount(state),
    reviews: state.reviewsData.reviews
})



const ProductCard = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productID } = useParams();
    const { product, reviews } = useSelector(mapState);
    const [isChecked, setIsChecked] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1);
    const totalNumCartItems = useSelector(mapState);
    const [reviewName, setReviewName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    


    // const [productPrice, setProductPrice] = useState(product)







    useEffect(() => {
        console.log(reviews)
        dispatch(
            fetchProductStart(productID),
            fetchReviewsStart(productID)
        )

        return () => {
            dispatch(
                setProduct({}),
                setReviews([])
            )
        }
    }, [productID]);

    const handleQuantity = e => {

        setProductQuantity(parseInt(e.target.value, 10));

    }



    const {
        productThumbnail,
        productThumbnailTwo,
        productThumbnailThree,
        productName,
        price,
        subscriptionPrice,
        productDesc,
        productCategory,
        documentID,
        quantity,
        planID
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
                productQuantity,
                planID
            })
        );
        history.push('/cart');
    }

    const handleAddSubscriptionToCart = (product) => {
        if (!productQuantity) setProductQuantity(1);
        //console.log(productQuantity)
        if (!product) return;


        dispatch(
            addProduct({
                productThumbnail,
                productThumbnailTwo,
                productThumbnailThree,
                productName,
                subscriptionPrice,
                productDesc,
                productCategory,
                documentID,
                quantity,
                productQuantity,
                planID
            })
        );
        history.push('/cart');
    }

    

    const handleAddReview = () => {
        
        
        dispatch(
            addReviewStart({
                reviewName,
                reviewText,
                rating,
                productID
            })
        )
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
        }, {
            name: '5',
            value: 5
        }, {
            name: '6',
            value: 6
        }, {
            name: '7',
            value: 7
        }, {
            name: '8',
            value: 8
        }, {
            name: '9',
            value: 9
        }],
        handleChange: handleQuantity
    };

    const configAddToCartBtn = {
        type: 'button'
    }

    //if (!Array.isArray(reviews)) return null;

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
                            {/*<h3>Subscribe Monthly and save 20%</h3>
                            <Button className='add-subscription-to-cart-button' {...configAddToCartBtn} onClick={() => handleAddSubscriptionToCart(product)}>
                                <h2>Subscribe</h2>
                        </Button>*/}
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
            {/*<div className='review-container'>
                <h2>Customer Reviews</h2>
                <div className='review-list-container'>
                {reviews.map((review, pos) => {
                    const { reviewName, reviewText, rating, productID } = review;
                    //if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                    
                    const configReview = {
                        ...review
                    }

                    return (
                        <Review key={pos} {...configReview} />
                    )
                })}
                </div>
                <div className='review-post-container'>
                    <h2>Add a Review</h2>
                    
                    <FormInput
                        label='Your Name'
                        type='text'
                        value={reviewName}
                        handleChange={e => setReviewName(e.target.value)}
                    />
                    <Rating
                        name="customized-color"
                        defaultValue={2}
                        precision={0.5}
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    />
                    <TextArea
                        className='shipping-notes'
                        type='text'
                        value={reviewText}
                        handleChange={e => setReviewText(e.target.value)}
                    />
                    <Button className='review-button' onClick={handleAddReview}><h2>Submit</h2></Button>
                </div>
            </div> */}
        </div>

    );
}

export default ProductCard;
