import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUserStart } from '../../redux/Users/users.actions';
import './styles.css';

import AuthWrapper from '../AuthWrapper';
import Input from '../defaultComponents/Input';
import Button from '../defaultComponents/Button';

const mapState = ({ user }) => ({

        currentUser: user.currentUser,
        userErr: user.userErr
   
})

const Register = props => {
    const dispatch = useDispatch();
    const { currentUser, userErr } = useSelector(mapState)
    const history = useHistory();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }))

        

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
                    <form  onSubmit={handleFormSubmit} >

                        <Input
                            type='text'
                            name='displayName'
                            value={displayName}
                            placeholder='Full Name'
                            handleChange={e => setDisplayName(e.target.value)}
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

                        <Button type='submit' >
                            Register
                        </Button>

                    </form>

                </div>

            </AuthWrapper>
        );
    }


export default Register;