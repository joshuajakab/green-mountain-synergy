import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../defaultComponents/Input';
import Button from '../defaultComponents/Button';
import TextArea from '../defaultComponents/Textarea';
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from '../../Utils';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors';
import { saveOrderHistory } from '../../redux/Orders/orders.actions';
import { clearCart } from '../../redux/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor } from 'ckeditor4-react';
import {
    SquarePaymentsForm,
    CreditCardInput,
} from 'react-square-web-payments-sdk';
import './payment.css'
import FormInput from '../defaultComponents/Input';
import { v4 as uuidv4 } from 'uuid';






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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameOnCard, setFirstNameOnCard] = useState('');
    const [lastNameOnCard, setLastNameOnCard] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [notes, setNotes] = useState('');
    //const [tokenTwo, setTokenTwo] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [codeDiscount, setCodeDiscount] = useState(false);
    const freeShipTotal = ((total * .06) + total);
    const shipTotal = ((total * .06) + total + 5);
    const codeTotal = (((total * .8) * .06) + (total * .8));
    const shipCodeTotal = ((((total * .8) * .06) + (total * .8)) + 5);
    const tenShipCodeTotal = ((((total * .9) *.06) +(total * .9)) + 5);
    const tenCodeTotal = (((total * .9) * .06) + (total * .9));
    const tax = (total * .06);
    const [discountCode, setDiscountCode] = useState('');
    const tenDiscountCode = discountCode;
    const [subscribed, setSubscribed] = useState(false);
    const idempotency_key = uuidv4()







    useEffect(() => {
        ;
        if (itemCount < 1) {
            history.push(`/confirmation`)
        }


    }, [itemCount])

    const handleTotal = (total) => {
        if (total < 50) {
            const realTotal = ((total * .06) + total + 5)
            return realTotal
        }
        else {
            const realTotal = ((total * .06) + total)
            return realTotal
        }

    }

    const handleSubmit = e => {
        e.preventDefault()
        return discountCode
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
    }

    const handleBillingSame = () => {

        setBillingAddress({
            email: shippingAddress.email,
            country: shippingAddress.country,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zip_code: shippingAddress.zip_code,

        });

    }


    /*const handleFormSubmit = async evt => {
        evt.preventDefault();

        if (
            !shippingAddress.line1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.zip_code ||
            !shippingAddress.country || billingAddress.line1 ||
            !billingAddress.city || !billingAddress.state ||
            !billingAddress.zip_code || !billingAddress.country ||
            !firstName || !lastName ||
            !firstNameOnCard || !lastNameOnCard ||
            !shippingAddress.email

        ) {
            return;
        }

    };*/

    const cardTokenizeResponseReceived = async (token, buyer) => {
        console.info({ token, buyer });
        //setTokenTwo(token.token)

        //console.log(token)

        const tokenTwo = token.token
        const orderItem = cartItems.map(item => {
            const { productThumbnail, productName, price, quantity } = item;
            return {
                productThumbnail,
                productName,
                price,
                quantity
            }
        })

        try {

            if (
                !shippingAddress.country || !shippingAddress.line1 ||
                !shippingAddress.city || !shippingAddress.state ||
                !shippingAddress.zip_code || !billingAddress.line1 ||
                !billingAddress.city || !billingAddress.state ||
                !billingAddress.zip_code || !billingAddress.country ||
                !shippingAddress.email || !shippingAddress.phone ||
                !firstName || !lastName 
                

            ) {
                //console.log(billingAddress)
                //console.log(shippingAddress)
                alert('Please fill out shipping and billing information')
                return;

            }

            else if (total < 50 && discountCode && tenDiscountCode === 'LOVE') {
                apiInstance.post('/process-payment', { amount: tenShipCodeTotal.toFixed(2), sourceId: tokenTwo, idempotencyKey: idempotency_key }).then(() => {
                    //apiInstance.post('/order', {productName: cartItems.item.productName, quantity: cartItems.item.quantity, price: cartItems.item.price })
                    if (subscribed) {
                        apiInstance.post('/subscribe', { email: shippingAddress.email, tags: 'newsletter' });
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: tenShipCodeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: tenShipCodeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    } else {
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: tenShipCodeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: tenShipCodeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    }
                })
            }

            else if (total >= 50 && discountCode && tenDiscountCode === 'LOVE') {
                apiInstance.post('/process-payment', { amount: tenCodeTotal.toFixed(2), sourceId: tokenTwo, idempotencyKey: idempotency_key }).then(() => {
                    //apiInstance.post('/order', {productName: cartItems.item.productName, quantity: cartItems.item.quantity, price: cartItems.item.price })
                    if (subscribed) {
                        apiInstance.post('/subscribe', { email: shippingAddress.email, tags: 'newsletter' });
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: tenCodeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: tenCodeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    } else {
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: tenCodeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: tenCodeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    }
                })
            }

            else if (total < 50 && discountCode) {
                apiInstance.post('/process-payment', { amount: shipCodeTotal.toFixed(2), sourceId: tokenTwo, idempotencyKey: idempotency_key }).then(() => {
                    //apiInstance.post('/order', {productName: cartItems.item.productName, quantity: cartItems.item.quantity, price: cartItems.item.price })
                    if (subscribed) {
                        apiInstance.post('/subscribe', { email: shippingAddress.email, tags: 'newsletter' });
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: shipCodeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: shipCodeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    } else {
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: shipCodeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: shipCodeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    }
                })
            }

            else if (total >= 50 && discountCode) {
                //console.log(codeTotal.toFixed(2))
                apiInstance.post('/process-payment', { amount: codeTotal.toFixed(2), sourceId: tokenTwo, idempotencyKey: idempotency_key }).then(() => {
                    //apiInstance.post('/order', {productName: cartItems.item.productName, quantity: cartItems.item.quantity, price: cartItems.item.price })
                    if (subscribed) {
                        apiInstance.post('/subscribe', { email: shippingAddress.email, tags: 'newsletter' });
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: codeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: codeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )

                    } else {
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: codeTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: codeTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    }
                })
            }

            else if (total >= 50 && !discountCode) {
                //setOrderTotal(freeShipTotal)
                apiInstance.post('/process-payment', { amount: freeShipTotal.toFixed(2), sourceId: tokenTwo, idempotencyKey: idempotency_key }).then(() => {
                    //apiInstance.post('/order', {productName: orderItem.productName, quantity: orderItem.quantity, price: orderItem.price })
                    if (subscribed) {
                        apiInstance.post('/subscribe', { email: shippingAddress.email, tags: 'newsletter' });
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: freeShipTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: freeShipTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )

                    } else {
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: freeShipTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: freeShipTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )

                    }
                })

            }
            else {
                //setOrderTotal(shipTotal)

                apiInstance.post('/process-payment', { amount: shipTotal.toFixed(2), sourceId: tokenTwo, idempotencyKey: idempotency_key }).then(() => {
                    //apiInstance.post('/order', {productName: cartItems.item.productName, quantity: cartItems.item.quantity, price: cartItems.item.price })
                    if (subscribed) {
                        apiInstance.post('/subscribe', { email: shippingAddress.email, tags: 'newsletter' });
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: shipTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: shipTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )

                    } else {
                        apiInstance.post('/confirmation', { email: shippingAddress.email, total: shipTotal.toFixed(2), firstName: firstName, lastName: lastName, line1: shippingAddress.line1, line2: shippingAddress.line2, city: shippingAddress.city, state: shippingAddress.state, zip_code: shippingAddress.zip_code, notes: notes })
                        const configOrder = {
                            orderTotal: shipTotal.toFixed(2),
                            orderItems: cartItems.map(item => {
                                const { productThumbnail, productName, price, quantity } = item;
                                return {
                                    productThumbnail,
                                    productName,
                                    price,
                                    quantity
                                }
                            }),
                            orderedBy: shippingAddress.email,
                            discount: discountCode,
                            address: shippingAddress,
                            firstName: firstName,
                            lastName: lastName
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )

                    }
                })
            }

        } catch (error) {
            alert(error)
        }
    }

    const createVerificationDetails = () => {

        const finalShipCodeTotal = (shipCodeTotal * 100).toFixed(0)
        const finalFreeShipCodeTotal = (codeTotal * 100).toFixed(0)
        const finalShipTotal = (shipTotal * 100).toFixed(0)
        const finalFreeShipTotal = (freeShipTotal * 100).toFixed(0)
        const finalTenCodeTotal = (tenCodeTotal * 100).toFixed(0)
        const finalTenShipCodeTotal = (tenShipCodeTotal * 100).toFixed(0)

        //console.log(finalFreeShipCodeTotal, finalFreeShipTotal, finalShipCodeTotal, finalShipTotal)
        try {

        if (total < 50 && discountCode && tenDiscountCode === 'LOVE') {
            return {
                amount: `${finalTenShipCodeTotal}`,
                currencyCode: "USD",
                intent: "CHARGE",
                billingContact: {
                    familyName: lastNameOnCard,
                    givenName: firstNameOnCard,
                    email: shippingAddress.email,
                    country: billingAddress.country,
                    city: billingAddress.city,
                    addressLines: [billingAddress.line1, billingAddress.line2],
                    postalCode: billingAddress.postalCode,
                    phone: shippingAddress.phone
                }
            }
        }

        else if (total >= 50 && discountCode && tenDiscountCode === 'LOVE') {
            return {
                amount: `${finalTenCodeTotal}`,
                currencyCode: "USD",
                intent: "CHARGE",
                billingContact: {
                    familyName: lastNameOnCard,
                    givenName: firstNameOnCard,
                    email: shippingAddress.email,
                    country: billingAddress.country,
                    city: billingAddress.city,
                    addressLines: [billingAddress.line1, billingAddress.line2],
                    postalCode: billingAddress.postalCode,
                    phone: shippingAddress.phone
                }
            }
        }

        else if (total < 50 && discountCode) {
            return {
                amount: `${finalShipCodeTotal}`,
                currencyCode: "USD",
                intent: "CHARGE",
                billingContact: {
                    familyName: lastNameOnCard,
                    givenName: firstNameOnCard,
                    email: shippingAddress.email,
                    country: billingAddress.country,
                    city: billingAddress.city,
                    addressLines: [billingAddress.line1, billingAddress.line2],
                    postalCode: billingAddress.postalCode,
                    phone: shippingAddress.phone
                }
            }
        } else if (total >= 50 && discountCode) {
            return {
                amount: `${finalFreeShipCodeTotal}`,
                currencyCode: "USD",
                intent: "CHARGE",
                billingContact: {
                    familyName: lastNameOnCard,
                    givenName: firstNameOnCard,
                    email: shippingAddress.email,
                    country: billingAddress.country,
                    city: billingAddress.city,
                    addressLines: [billingAddress.line1, billingAddress.line2],
                    postalCode: billingAddress.postalCode,
                    phone: shippingAddress.phone
                }
            }
        } else if (total >= 50 && !discountCode) {
            return {
                amount: `${finalFreeShipTotal}`,
                currencyCode: "USD",
                intent: "CHARGE",
                billingContact: {
                    familyName: lastNameOnCard,
                    givenName: firstNameOnCard,
                    email: shippingAddress.email,
                    country: billingAddress.country,
                    city: billingAddress.city,
                    addressLines: [billingAddress.line1, billingAddress.line2],
                    postalCode: billingAddress.postalCode,
                    phone: shippingAddress.phone
                }
            }
        } else {
            return {
                amount: `${finalShipTotal}`,
                currencyCode: "USD",
                intent: "CHARGE",
                billingContact: {
                    familyName: lastNameOnCard,
                    givenName: firstNameOnCard,
                    email: shippingAddress.email,
                    country: billingAddress.country,
                    city: billingAddress.city,
                    addressLines: [billingAddress.line1, billingAddress.line2],
                    postalCode: billingAddress.postalCode,
                    phone: shippingAddress.phone
                }
            }
        }
    } catch(error) {
        alert(error)
    }
    }



    return (
        <div className='payment-details'>
            <form className='form-container'>



                <div className='group'>

                    <div className='shipping-container'>

                        <h2 className='payment-form-top-title'>
                            Payment Details
                        </h2>

                        <Input
                            required
                            type='email'
                            name='email'
                            handleChange={evt => handleShipping(evt)}
                            placeholder='Email Address'
                            value={shippingAddress.email}
                        />

                        <Input
                            required
                            type='tel'
                            name='phone'
                            handleChange={evt => handleShipping(evt)}
                            placeholder='Phone Number'
                            value={shippingAddress.phone}
                        />

                        <h2 className='payment-form-title'>
                            Shipping Address
                        </h2>

                        <Input
                            required
                            type='text'
                            name='firstName'
                            handleChange={evt => setFirstName(evt.target.value)}
                            placeholder='First Name'
                            value={firstName}
                        />

                        <Input
                            required
                            type='text'
                            name='lastName'
                            handleChange={evt => setLastName(evt.target.value)}
                            placeholder='Last Name'
                            value={lastName}
                        />

                        <Input
                            required
                            type='text'
                            name='line1'
                            handleChange={evt => handleShipping(evt)}
                            placeholder='Address Line 1'
                            value={shippingAddress.line1}
                        />

                        <Input
                            type='text'
                            name='line2'
                            handleChange={evt => handleShipping(evt)}
                            placeholder='Address Line 2'
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

                        <div className='country'>

                            <CountryDropdown
                                required
                                priorityOptions={['US']}
                                onChange={val => handleShipping({
                                    target: {
                                        name: 'country',
                                        value: val
                                    }
                                })}
                                valueType='short'
                                value={shippingAddress.country}
                                className='country-dropdown'
                            />

                        </div>

                    </div>

                </div>


                <div className='checkbox-container'>
                    <input className='checkbox' name='same-address' type='checkbox' checked={isChecked} onChange={(event) => { setIsChecked(event.currentTarget.checked); handleBillingSame() }} />
                    <label className='checkbox-label' >Billing address is same as shipping</label>
                </div>



                <div className='group'>

                    {!isChecked &&
                        <div className='billing-container'>
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
                                placeholder='Address Line 1'
                                value={billingAddress.line1}
                            />

                            <Input
                                type='text'
                                name='line2'
                                handleChange={evt => handleBilling(evt)}
                                placeholder='Adress Line 2'
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
                                    className='country-dropdown'
                                />

                            </div>
                        </div>
                    }


                    <h2 className='payment-form-title'>
                        Shipping Notes
                    </h2>

                    <TextArea
                        className='shipping-notes'
                        type='text'
                        value={notes}
                        handleChange={e => setNotes(e.target.value)}
                    />


                </div>

                <div className='group'>

                   {/*} <input type='checkbox' name="mc4wp-subscribe" checked={subscribed} onChange={(event) => setSubscribed(event.currentTarget.checked)} />
                    <label className='checkbox-label'>Subscribe to our Newsletter</label>*/}

                    <h2 className='discount-code-title'>Discount Code</h2>

                    <FormInput
                        className='discount-code'

                        type='text'
                        value={discountCode}
                        handleChange={e => setDiscountCode(e.target.value.toLocaleUpperCase())} />




                    {total < 50 &&
                        <div >
                            <h3 className='payment-total'>

                                Subtotal: ${total.toFixed(2)} <br />
                                Shipping: $5.00 <br />
                                6% Sales Tax: ${tax.toFixed(2)}<br />
                                Total: ${shipTotal.toFixed(2)}<br />
                                {discountCode === 'FACEBOOK' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'INSTAGRAM' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'TIKTOK' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'PHISH' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'YOUTUBE' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'LINKEDIN' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'THIRDEYEDROPS' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'SWISSY' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {tenDiscountCode === 'LOVE' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${tenShipCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'MUSHLOVE' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>    
                                }
                                {discountCode === 'REDDIT' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>    
                                }
                                {discountCode === 'ASTRAL' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${shipCodeTotal.toFixed(2)}
                                    </h3>    
                                }
                            </h3>
                        </div>
                    }


                    {total >= 50 &&
                        <div >
                            <h3 className='payment-total'>

                                Subtotal: ${total.toFixed(2)} <br />
                                Shipping: FREE <br />
                                6% Sales Tax: ${tax.toFixed(2)} <br />
                                Total: ${freeShipTotal.toFixed(2)}<br />
                                {discountCode === 'FACEBOOK' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'INSTAGRAM' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'TIKTOK' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'PHISH' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'YOUTUBE' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'LINKEDIN' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'THIRDEYEDROPS' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'SWISSY' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'MUSHLOVE' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {discountCode === 'REDDIT' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${codeTotal.toFixed(2)}
                                    </h3>
                                }
                                {tenDiscountCode === 'LOVE' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${tenCodeTotal.toFixed(2)}
                                    </h3>
                                }
                                {tenDiscountCode === 'ASTRAL' &&
                                    <h3 className='payment-total'>
                                        Discounted Total: ${tenCodeTotal.toFixed(2)}
                                    </h3>
                                }
                            </h3>
                        </div>}

                    <h2 className='payment-form-title'>
                        Card Details
                    </h2>

                    <div className='card-payment-container'>

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
                            /*cardTokenizeResponseReceived={async (token, buyer) => {
                            
                            
                             * Identifies the location of the merchant that is taking the payment.
                             * Obtained from the Square Application Dashboard - Locations tab.
                        */
                            locationId={process.env.REACT_APP_LOCATION_ID}
                            createVerificationDetails={createVerificationDetails}

                        >
                            <CreditCardInput />
                        </SquarePaymentsForm>

                        
                    </div>
                </div>


            </form>
            <div className='spacer'></div>
        </div>
    );
}

export default PaymentDetails;
