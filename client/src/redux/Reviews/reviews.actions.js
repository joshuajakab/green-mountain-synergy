import reviewsTypes from "./reviews.types";

export const addReviewStart = reviewsData => ({
    type: reviewsTypes.ADD_NEW_REVIEW_START,
    payload: reviewsData
});

export const fetchReviewsStart = (filters ={}) => ({
    type: reviewsTypes.FETCH_REVIEWS_START,
    payload: filters
});

export const setReviews = reviews => ({
    type: reviewsTypes.SET_REVIEWS,
    payload: reviews
});

export const deleteReviewStart = reviewID => ({
    type: reviewsTypes.DELETE_REVIEW_START,
    payload: reviewID
});
