import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUserStart } from '../../redux/Users/users.actions';
import { apiInstance } from '../../Utils';
import './styles.css';

import AuthWrapper from '../AuthWrapper';
import Input from '../defaultComponents/Input';
import Button from '../defaultComponents/Button';
import { CountryDropdown } from 'react-country-region-selector';


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

const mapState = ({ user }) => ({

    currentUser: user.currentUser,
    userErr: user.userErr

})

const Register = props => {
    const dispatch = useDispatch();
    const { currentUser, userErr } = useSelector(mapState)
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [customerAddress, setCustomerAddress] = useState({ ...initialAddressState });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            reset();
            history.push('/');
        }

    }, [currentUser]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0)
            setErrors(userErr)
    }, [userErr]);

    const reset = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    const handleCustomer = evt => {
        const { name, value } = evt.target;
        setCustomerAddress({
            ...customerAddress,
            [name]: value
        });
    };



    const handleFormSubmit = event => {

        if ( !firstName || !lastName || !email ) {
            alert('Please fill out entire form.')
        }
        else {
        event.preventDefault();
        apiInstance.post('/customer', { givenName: firstName, familyName: lastName, emailAddress: email })
        dispatch(signUpUserStart({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }))
    }


    }





    const configAuthWrapper = {
        headline: 'Registration'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>

            <div className='register-form' >

                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit} >

                    <Input
                        type='text'
                        name='firstName'
                        value={firstName}
                        placeholder='First Name'
                        handleChange={e => setFirstName(e.target.value)}
                    />

                    <Input
                        type='text'
                        name='lastName'
                        value={lastName}
                        placeholder='Last Name'
                        handleChange={e => setLastName(e.target.value)}
                    />

                    <Input
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <Input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <Input
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        placeholder='Confirm Password'
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />

                    {/*<Input
                        required
                        type='text'
                        name='line1'
                        handleChange={evt => handleCustomer(evt)}
                        placeholder='Address Line 1'
                        value={customerAddress.line1}
                    />

                    <Input
                        type='text'
                        name='line2'
                        handleChange={evt => handleCustomer(evt)}
                        placeholder='Address Line 2'
                        value={customerAddress.line2}
                    />

                    <Input
                        required
                        type='text'
                        name='city'
                        handleChange={evt => handleCustomer(evt)}
                        placeholder='City'
                        value={customerAddress.city}
                    />

                    <Input
                        required
                        type='text'
                        name='state'
                        handleChange={evt => handleCustomer(evt)}
                        placeholder='State'
                        value={customerAddress.state}
                    />

                    <Input
                        required
                        type='text'
                        name='zip_code'
                        handleChange={evt => handleCustomer(evt)}
                        placeholder='Zip Code'
                        value={customerAddress.zip_code}
                    />

                    <div className='country'>

                        <CountryDropdown
                            required
                            priorityOptions={['US']}
                            onChange={val => handleCustomer({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            valueType='short'
                            value={customerAddress.country}
                            className='country-dropdown'
                        />
                        </div> */}

                    <Button className='register-button' type='submit' >
                        <h2>Register</h2>
                    </Button>

                </form>

            </div>

        </AuthWrapper>
    );
}


export default Register;