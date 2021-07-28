import { all, call } from 'redux-saga/effects';

import usersSagas from './Users/users.sagas';
import productsSagas from './Products/products.sagas';

export default function* rootSaga() {
    yield all([
        call(usersSagas),
        call(productsSagas)
    ])
}