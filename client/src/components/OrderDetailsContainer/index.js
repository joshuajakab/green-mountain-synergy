import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart } from '../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../../components/OrderDetails';

const mapState = ({ orderData }) => ({
    orderDetails: orderData.orderDetails
})

const Order = () => {
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal, orderedBy, firstName, lastName, address } = orderDetails;
    
    
 
    useEffect(() => {
        dispatch(
            getOrderDetailsStart(orderID)
        );

    }, [])

    return (
        <div>
            <h1>
                Order ID: #{orderID}
            </h1>
            <h2>
                Customer Email: {orderedBy}
            </h2>

            <OrderDetails order={orderDetails} />

            <h3>
                Total: ${orderTotal}
            </h3>
            <div className='shipping-address-container'>
                <h2>Shipping Address</h2>
                <h3>{firstName} {lastName}</h3>
                <h3>{address.line1}</h3>
                <h3>{address.line2}</h3>
                <h3>{address.city} {address.state} {address.zip_code}</h3>
                <h3>{address.phone}</h3>
            </div>

        </div>
    );
}

export default Order;
