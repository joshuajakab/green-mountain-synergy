import React from 'react';
import { Rating } from '@mui/material';
import './review.css';

const Review = (review) => {

    const { reviewName, reviewText, rating } = review;

    if (!reviewName || !reviewText || !rating) return null;

    return (
        <div className='review'>
            <h2>{reviewName}</h2>
            <Rating
                name="customized-color"
                defaultValue={2}
                precision={0.5}
                value={rating}
                readOnly={true}
            />
            <h3>{reviewText}</h3>
        </div>
    )
};

export default Review;
