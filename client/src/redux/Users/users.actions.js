import usersTypes from './users.types';


export const emailSignInStart = userCredentials => ({
    type: usersTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
});

export const signInSuccess = user => ({
    type: usersTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const checkUserSession = () => ({
    type: usersTypes.CHECK_USER_SESSION
})

export const signOutUserStart = () => ({
    type: usersTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
    type: usersTypes.SIGN_OUT_USER_SUCCESS
})

export const signUpUserStart = userCredentials => ({
    type: usersTypes.SIGN_UP_USER_START,
    payload: userCredentials
})

export const userError = err => ({
    type: usersTypes.USER_ERROR,
    payload: err
})

export const resetPasswordStart = userCredentials => ({
    type: usersTypes.RESET_PASSWORD_START,
    payload: userCredentials
});

export const resetPasswordSuccess = () => ({
    type: usersTypes.RESET_PASSWORD_SUCCESS,
    payload: true
})

export const resetUserState = () => ({
    type: usersTypes.RESET_USER_STATE
})

export const googleSignInStart = () => ({
    type: usersTypes.GOOGLE_SIGN_IN_START
})
