import ordersTypes from './orders.types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleSaveOrder, handleGetUserOrderHistory, handleGetOrder, handleGetOrderHistory } from './orders.helpers';
import { auth } from '../../firebase/utils';
import { clearCart } from '../Cart/cart.actions';
import { setUserOrderHistory, setOrderDetails, setOrderHistory } from './orders.actions'

export function* getUserOrderHistory({ payload }) {
    try {
        const history = yield handleGetUserOrderHistory(payload);
        yield put(
            setUserOrderHistory(history)
        );

    } catch (err) {
        console.log(err)
    }
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY, getUserOrderHistory)
};

export function* getOrderHistory({ payload }) {
    try {
        const history = yield handleGetOrderHistory(payload);
        yield put(
            setOrderHistory(history)
        );
    } catch (err) {
        console.log(err)
    }
}

export function* onGetOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_ORDER_HISTORY, getOrderHistory)
}

export function* saveOrder({ payload }) {
    try {
        const timestamps = new Date();
        yield handleSaveOrder({
            ...payload,
            //orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps
        });
        yield put(
            clearCart()
        )
        
    } catch (err) {
        console.log(err)
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getOrderDetails({ payload }) {
    try {
        const order = yield handleGetOrder(payload);
        yield put(
            setOrderDetails(order)
        )
    } catch (err) {
        //console.log(err)
    }
} 

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails)
}

export default function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
        call(onGetOrderHistoryStart),
    ])
};
