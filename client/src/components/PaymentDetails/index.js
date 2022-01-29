import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../defaultComponents/Input';
import Button from '../defaultComponents/Button';
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from '../../Utils';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors';
import { saveOrderHistory } from '../../redux/Orders/orders.actions';
import { clearCart } from '../../redux/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor } from 'ckeditor4-react';
import { SquarePaymentsForm, 
    CreditCardInput,
  } from 'react-square-web-payments-sdk';
import './payment.css'






const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone: '',
    email: ''
}

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems
});



const PaymentDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { total, itemCount, cartItems } = useSelector(mapState);
    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
    const [recipientName, setRecipientName] = useState('');
    const [firstNameOnCard, setFirstNameOnCard] = useState('');
    const [lastNameOnCard, setLastNameOnCard] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [notes, setNotes] = useState('');
    const realTotal = ((total * .06) + total)
    const shipTotal = ((total * .06) + total + 5)
    


    useEffect(() => {

        if (itemCount < 1) {
            history.push('/dashboard')
        }
        

    }, [itemCount])

    const handleTotal = (total) => {
        if (total < 40) {
            const realTotal = ((total * .06) + total + 5)
            return realTotal
        }
        else {
            const realTotal = ((total * .06) + total)
            return realTotal
        }
        
    }

    const handleShipping = evt => {
        const { name, value } = evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        });
    };

    const handleBilling = evt => {
        const { name, value } = evt.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        });
    };

    const handleFormSubmit = async evt => {
        evt.preventDefault();

        if (
            !shippingAddress.line1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.zip_code ||
            !shippingAddress.country || billingAddress.line1 ||
            !billingAddress.city || !billingAddress.state ||
            !billingAddress.zip_code || !billingAddress.country ||
            !recipientName || !firstNameOnCard ||
            !lastNameOnCard || !billingAddress.email ||
            !billingAddress.phone
        ) {
            return;
        }

    };

    const cardTokenizeResponseReceived = (errors, token, buyer, cardData, buyerVerificationToken) => {
        
            console.info({ token, buyer });
          

        if (errors) {
            //setErrorMessages(errors.map(error => error.message))
            alert({errors})
            return
        }

        setErrorMessages([])
        //alert(`nonce created: ${nonce}, nothing is changing for some reason buyerVerificationToken: ${buyerVerificationToken}, amount: ${total}`)
        apiInstance.post('/process-payment', { token: buyerVerificationToken, amount: total }).then(() => {

            const configOrder = {
                orderTotal: realTotal,
                orderItems: cartItems.map(item => {
                    const { documentID, productThumbnail, productName, price, quantity } = item;
                    return {
                        documentID,
                        productThumbnail,
                        productName,
                        price,
                        quantity
                    }
                    /*if (fiveHundredPrice) {
                        return {
                            documentID,
                            productThumbnail,
                            productName,
                            fiveHundredPrice,
                            quantity
                        }
                    }

                    if (oneThousandPrice) {
                        return {
                            documentID,
                            productThumbnail,
                            productName,
                            oneThousandPrice,
                            quantity
                        }
                    }

                    

                    else { 
                        return {
                            documentID,
                            productThumbnail,
                            productName,
                            twoThousandPrice,
                            quantity
                        }
                    } */

                })

            }


            dispatch(

                saveOrderHistory(configOrder)

            )
        }).then(() => {

            alert("Payment Successful");
            //apiInstance.post('/access', { email: billingAddress.email, total: realTotal, recipientName: recipientName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
        })
    }

    const createVerificationDetails = () => {
        const finalTotal = realTotal * 100

        return {
            amount: `${finalTotal}`,
            currencyCode: "USD",
            intent: "CHARGE",
            billingContact: {
                familyName: billingAddress.lastNameOnCard,
                givenName: billingAddress.firstNameOnCard,
                email: billingAddress.email,
                country: billingAddress.country,
                city: billingAddress.city,
                addressLines: [billingAddress.line1, billingAddress.line2],
                postalCode: billingAddress.postalCode,
                phone: billingAddress.phone
            }
        }
    }



    return (
        <div className='payment-details'>
            <form onSubmit={handleFormSubmit}>

                <div className='group'>
                    <h2 className='payment-form-title'>
                        Shipping Address
                    </h2>

                    <Input
                        required
                        type='text'
                        name='recipientName'
                        handleChange={evt => setRecipientName(evt.target.value)}
                        placeholder='Recipient Name'
                        value={recipientName}
                    />

                    <Input
                        required
                        type='text'
                        name='line1'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Line 1'
                        value={shippingAddress.line1}
                    />

                    <Input
                        type='text'
                        name='line2'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Line 2'
                        value={shippingAddress.line2}
                    />

                    <Input
                        required
                        type='text'
                        name='city'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='City'
                        value={shippingAddress.city}
                    />

                    <Input
                        required
                        type='text'
                        name='state'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='State'
                        value={shippingAddress.state}
                    />

                    <Input
                        required
                        type='text'
                        name='zip_code'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Zip Code'
                        value={shippingAddress.zip_code}
                    />

                    <div className='formRow checkoutInput'>

                        <CountryDropdown
                            required
                            onChange={val => handleShipping({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            valueType='short'
                            value={shippingAddress.country}
                        />

                    </div>

                </div>

                <div className='group'>
                    <h2 className='payment-form-title'>
                        Billing Address
                    </h2>

                    <Input
                        required
                        type='text'
                        name='firstNameOnCard'
                        handleChange={evt => setFirstNameOnCard(evt.target.value)}
                        placeholder='First Name'
                        value={firstNameOnCard}
                    />

                    <Input
                        required
                        type='text'
                        name='lastNameOnCard'
                        handleChange={evt => setLastNameOnCard(evt.target.value)}
                        placeholder='Last Name'
                        value={lastNameOnCard}
                    />

                    <Input
                        required
                        type='text'
                        name='line1'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Line 1'
                        value={billingAddress.line1}
                    />

                    <Input
                        type='text'
                        name='line2'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Line 2'
                        value={billingAddress.line2}
                    />

                    <Input
                        required
                        type='text'
                        name='city'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='City'
                        value={billingAddress.city}
                    />

                    <Input
                        required
                        type='text'
                        name='state'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='State'
                        value={billingAddress.state}
                    />

                    <Input
                        required
                        type='text'
                        name='zip_code'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Zip Code'
                        value={billingAddress.zip_code}
                    />

                    <div className='formRow checkoutInput'>

                        <CountryDropdown
                            required
                            onChange={val => handleBilling({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            value={billingAddress.country}
                            valueType='short'
                        />

                    </div>

                    <Input
                        required
                        type='tel'
                        name='phone'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Phone Number'
                        value={billingAddress.phone}
                    />

                    <Input
                        required
                        type='email'
                        name='email'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Email Address'
                        value={billingAddress.email}
                    />

                    <h2 className='payment-form-title'>
                    Shipping Notes
                    </h2>

                    <CKEditor
                        onChange={evt => setNotes(evt.editor.getData())}
                        
                    />

                </div>

                <div className='group'>
                    {realTotal < 40 &&
                    <h2>
                        Pay ${realTotal.toFixed(2)}
                    </h2>
                    }
                    {realTotal >= 40 &&
                    <h2>
                        Pay ${shipTotal.toFixed(2)}
                    </h2>
                    }
                    <h2 className='payment-form-title'>
                        Card Details
                    </h2>
                </div>
                <SquarePaymentsForm
      /**
       * Identifies the calling form with a verified application ID
       * generated from the Square Application Dashboard.
       */
      applicationId={process.env.REACT_APP_APPLICATION_ID}
      /**
       * Invoked when payment form receives the result of a tokenize generation request.
       * The result will be a valid credit card or wallet token, or an error.
       */
      cardTokenizeResponseReceived={cardTokenizeResponseReceived}
      /**
       * This function enable the Strong Customer Authentication (SCA) flow
       *
       * We strongly recommend use this function to verify the buyer and
       * reduce the chance of fraudulent transactions.
       */
      createVerificationDetails={createVerificationDetails}
      /**
       * Identifies the location of the merchant that is taking the payment.
       * Obtained from the Square Application Dashboard - Locations tab.
       */
      locationId={process.env.REACT_APP_LOCATION_ID}
    >
      <CreditCardInput />
    </SquarePaymentsForm>



            </form>
            <div className='spacer'></div>
        </div>
    );
}

export default PaymentDetails;