import { auth } from '../../firebase/utils';
import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { fetchReviewsStart, setReviews } from './reviews.actions';
import { handleAddReview, handleFetchReviews, handleDeleteReview } from './reviews.helpers';
import reviewsTypes from './reviews.types';

export function* addReview({ payload }) {

    try {
        const timestamp = new Date();
        yield handleAddReview({
            ...payload,
            createdDate: timestamp
        });
        yield put(
            fetchReviewsStart()
        );
    } catch (err) {
        console.log(err)
    }
}

export function* onAddReviewStart() {
    yield takeLatest(reviewsTypes.ADD_NEW_REVIEW_START, addReview)
}

export function* fetchReviews({ payload }) {
    try {
        const reviews = yield handleFetchReviews(payload);
        yield put(
            setReviews(reviews)
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onFetchReviewsStart() {
    yield takeLatest(reviewsTypes.FETCH_REVIEWS_START, fetchReviews)
}

export function* deleteReview({ payload }) {
    try {
        yield handleDeleteReview(payload);
        yield put(
            fetchReviewsStart()
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onDeleteReviewStart() {
    yield takeLatest(reviewsTypes.DELETE_REVIEW_START, deleteReview)
}

export default function* reviewsSagas() {
    yield all([
        call(onAddReviewStart),
        call(onFetchReviewsStart),
        call(onDeleteReviewStart)
    ])
};
