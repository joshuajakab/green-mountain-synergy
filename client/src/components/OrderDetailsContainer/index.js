import React, { useEffect, useState } from 'react';
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
    const [order, setOrder] = useState('')
    
    

    useEffect(() => {
        dispatch(
            getOrderDetailsStart(orderID)
        );
        setOrder(orderDetails.address)
        
    }, [order])

 

    return (
        <div>
          
            <div >
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
                    <h2>Ship To:</h2>
                    <h3>{firstName} {lastName}</h3>
                    
                </div>
                <div>
                    <h3>{order.line1}</h3>
                    <h3>{order.line2}</h3>
                    <h3>{order.city} {order.state} {order.zip_code}</h3>
                    <h3>{order.phone}</h3>
                </div>


            </div> 

        </div>
    );
}

export default Order;
