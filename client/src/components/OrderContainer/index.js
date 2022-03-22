import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../redux/Orders/orders.actions';
import OrderHistory from '../Orders';

const mapState = ({ user, orderData }) => ({
    currentUser: user.currentUser,
    ordersHistory: orderData.ordersHistory.orders
})

const OrdersContainer = props => {
    const dispatch = useDispatch();
    const { currentUser, ordersHistory } = useSelector(mapState);
    const { data } = ordersHistory;

    useEffect(() => {
        dispatch(
            getOrderHistory()
        )
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            <OrderHistory orders={data} />
        </div>
    )
};

export default OrdersContainer;
