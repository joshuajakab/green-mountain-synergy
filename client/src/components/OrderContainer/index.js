import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../redux/Orders/orders.actions';
import OrderHistory from '../Orders';

const mapState = ({ user, orderData }) => ({
    currentUser: user.currentUser,
    ordersHistory: orderData.ordersHistory.data
})

const OrdersContainer = props => {
    const dispatch = useDispatch();
    const { currentUser, ordersHistory } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            getOrderHistory()
        )
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            <OrderHistory orders={ordersHistory} />
        </div>
    )
};

export default OrdersContainer;
