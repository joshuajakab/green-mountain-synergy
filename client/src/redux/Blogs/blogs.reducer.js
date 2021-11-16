import blogsTypes from "./blogs.types";

const INITIAL_STATE = {
    blogs: [],
    blog: {}
};

const blogsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case blogsTypes.SET_BLOGS:
            return {
                ...state,
                blogs: action.payload
            }
        case blogsTypes.SET_BLOG:
            return {
                ...state,
                blog: action.payload
            }
        default:
            return state;
    }
};

export default blogsReducer;
