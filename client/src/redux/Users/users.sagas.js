import usersTypes from './users.types';
import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from '../Users/users.actions';
import { handleResetPasswordAPI } from '../Users/users.helpers';

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
    } catch (err) {
        //console.log(err)
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {

        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)


    } catch (err) {
        //console.log(err)
        alert('Incorrect email or password')
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(usersTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (err) {
        console.log(err)
        
    }
}

export function* onCheckUserSession() {
    yield takeLatest(usersTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
    } catch (err) {
        //console.log(err)
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(usersTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
} }) {
    if (password !== confirmPassword) {
        const err = ['Passwords Don\'t Match'];
        yield put(
            userError(err)
        );
        return;
    }

    try {

        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = { displayName };
        yield getSnapshotFromUserAuth(user, additionalData);


    } catch (err) {
        //console.log(err);
    }
}

export function* onSignUpUserStart() {
    yield takeLatest(usersTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email } }) {
    try {
        yield call(handleResetPasswordAPI, email);
        yield put(
            resetPasswordSuccess()
        )

        } catch(err) {
            yield put(
                userError(err)
            )
            //console.log(err)
        }
}

export function* onResetPasswordStart() {
    yield takeLatest(usersTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(GoogleProvider);
        yield getSnapshotFromUserAuth(user);
        
    } catch (err) {
        console.log(err)
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(usersTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
    yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
    ])
}