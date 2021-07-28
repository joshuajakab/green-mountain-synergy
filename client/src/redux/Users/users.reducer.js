import usersTypes from '../Users/users.types';

const INITIAL_STATE = {
    currentUser: null,
    resetPasswordSuccess: false,
    userErr: []
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case usersTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: []
            }
        case usersTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        case usersTypes.USER_ERROR:
            return {
                ...state,
                userErr: action.payload
            }
        case usersTypes.RESET_USER_STATE:
        case usersTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state;
    }
};

export default userReducer;