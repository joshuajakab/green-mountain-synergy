import reviewsTypes from "./reviews.types";

const INITIAL_STATE = {
    reviews: []
};

const reviewsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case reviewsTypes.SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }
        default:
            return state;
    }
};

export default reviewsReducer;
