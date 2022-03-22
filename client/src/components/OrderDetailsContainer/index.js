import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart, setOrderDetails } from '../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import './orderDetailsContainer.css';

import OrderDetails from '../../components/OrderDetails';

const mapState = ({ orderData }) => ({
    orderDetails: orderData.orderDetails
})

const Order = () => {

    
    
    

    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal, orderedBy, firstName, lastName, address, discount } = orderDetails;
    //const { line1, line2, city, state, zip_code, phone } = address;
    const [order, setOrder] = useState([])
    
    
    
    useEffect(() => {
        dispatch(
            getOrderDetailsStart(orderID)
        );
        
    }, [])

    useEffect(() => {
        console.log(address)
        console.log(orderDetails)
    }, [])

 

    return (
        <div className='receipt-container'>
          
            <div >
                 <h1>
                    Order ID: #{orderID}
                </h1>
                <h3 className='email'>
                    Customer Email: {orderedBy}
                </h3>

                <OrderDetails order={orderDetails} />

                <h3 className='total'>
                    Total: ${orderTotal}
                </h3>
                <div className='shipping-address-container'>
                    <h2>Ship To:</h2>
                    <h3>{firstName} {lastName}</h3>
                    
                </div>
                <div className='shipping-address-container'>
                    {/*<h3>{line1}</h3>
                    <h3>{line2}</h3>
                    <h3>{city} {state} {zip_code}</h3>
    <h3>{phone}</h3>*/}
                    
                    <h3>Disount Code</h3>
                    {discount &&
                    <h3>{discount}</h3>
}       
                </div>


            </div> 

        </div>
    );
}

export default Order;
