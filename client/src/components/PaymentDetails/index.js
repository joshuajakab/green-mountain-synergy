import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from '../../Utils';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors';
import { saveOrderHistory } from '../../redux/Orders/orders.actions';
import { clearCart } from '../../redux/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton
} from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import './styles.scss'





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

    const realTotal = total + 7;


    useEffect(() => {

        if (itemCount < 1) {
            history.push('/dashboard')
        }

    }, [itemCount])

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

    const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {

        if (errors) {
            setErrorMessages(errors.map(error => error.message))
            return
        }

        setErrorMessages([])
        //alert(`nonce created: ${nonce}, nothing is changing for some reason buyerVerificationToken: ${buyerVerificationToken}, amount: ${total}`)
        apiInstance.post('/process-payment', { nonce: nonce, token: buyerVerificationToken, amount: total }).then(() => {

            const configOrder = {
                orderTotal: realTotal,
                orderItems: cartItems.map(item => {
                    const { documentID, productThumbnail, productName, productPrice, secondProductPrice, quantity } = item;
                    if (fiveHundredPrice) {
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
                    }

                })

            }


            dispatch(

                saveOrderHistory(configOrder)

            )
        }).then(() => {

            alert("Payment Successful");
            apiInstance.post('/access', { email: billingAddress.email, total: realTotal, recipientName: recipientName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
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
        <div className='paymentDetails'>
            <form onSubmit={handleFormSubmit}>

                <div className='group'>
                    <h2>
                        Shipping Address
                    </h2>

                    <FormInput
                        required
                        type='text'
                        name='recipientName'
                        handleChange={evt => setRecipientName(evt.target.value)}
                        placeholder='Recipient Name'
                        value={recipientName}
                    />

                    <FormInput
                        required
                        type='text'
                        name='line1'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Line 1'
                        value={shippingAddress.line1}
                    />

                    <FormInput
                        type='text'
                        name='line2'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Line 2'
                        value={shippingAddress.line2}
                    />

                    <FormInput
                        required
                        type='text'
                        name='city'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='City'
                        value={shippingAddress.city}
                    />

                    <FormInput
                        required
                        type='text'
                        name='state'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='State'
                        value={shippingAddress.state}
                    />

                    <FormInput
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
                    <h2>
                        Billing Address
                    </h2>

                    <FormInput
                        required
                        type='text'
                        name='firstNameOnCard'
                        handleChange={evt => setFirstNameOnCard(evt.target.value)}
                        placeholder='First Name'
                        value={firstNameOnCard}
                    />

                    <FormInput
                        required
                        type='text'
                        name='lastNameOnCard'
                        handleChange={evt => setLastNameOnCard(evt.target.value)}
                        placeholder='Last Name'
                        value={lastNameOnCard}
                    />

                    <FormInput
                        required
                        type='text'
                        name='line1'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Line 1'
                        value={billingAddress.line1}
                    />

                    <FormInput
                        type='text'
                        name='line2'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Line 2'
                        value={billingAddress.line2}
                    />

                    <FormInput
                        required
                        type='text'
                        name='city'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='City'
                        value={billingAddress.city}
                    />

                    <FormInput
                        required
                        type='text'
                        name='state'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='State'
                        value={billingAddress.state}
                    />

                    <FormInput
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

                    <FormInput
                        required
                        type='tel'
                        name='phone'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Phone Number'
                        value={billingAddress.phone}
                    />

                    <FormInput
                        required
                        type='email'
                        name='email'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Email Address'
                        value={billingAddress.email}
                    />

                    <h2>
                    Shipping Notes and Name of Print(s) for Masks and Cards
                    </h2>

                    <CKEditor
                        onChange={evt => setNotes(evt.editor.getData())}
                        
                    />

                </div>

                <div className='group'>
                    <h2>
                        Card Details
                    </h2>
                </div>
                <SquarePaymentForm
                    className='square-form'
                    
                    applicationId={process.env.REACT_APP_APPLICATION_ID}
                    locationId={process.env.REACT_APP_LOCATION_ID}
                    cardNonceResponseReceived={cardNonceResponseReceived}
                    createVerificationDetails={createVerificationDetails}
                >
                    <fieldset className="sq-fieldset">
                        <CreditCardNumberInput />
                        <div className="sq-form-third">
                            <CreditCardExpirationDateInput />
                        </div>

                        <div className="sq-form-third">
                            <CreditCardPostalCodeInput />
                        </div>

                        <div className="sq-form-third">
                            <CreditCardCVVInput />
                        </div>
                    </fieldset>

                    <CreditCardSubmitButton>
                        Pay ${realTotal}
                    </CreditCardSubmitButton>
                    <div className="sq-error-message">
                        {errorMessages.map(errorMessage => (
                            <ul>
                                <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                            </ul>
                        ))}
                    </div>
                </SquarePaymentForm>



            </form>
            <div className='spacer'></div>
        </div>
    );
}

export default PaymentDetails;