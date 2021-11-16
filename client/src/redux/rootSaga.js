import { all, call } from 'redux-saga/effects';

import usersSagas from './Users/users.sagas';
import productsSagas from './Products/products.sagas';
import blogsSagas from './Blogs/blogs.sagas';

export default function* rootSaga() {
    yield all([
        call(usersSagas),
        call(productsSagas),
        call(blogsSagas)
    ])
}