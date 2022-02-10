import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from '../../redux/Users/users.actions';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../defaultComponents/Input';
import Button from '../defaultComponents/Button';
import './emailPassword.css';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState)
    const[email, setEmail] = useState('');
    const[errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/signin');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
        
    }

        const configAuthWrapper = {
            headline: 'Email Password'
        };

        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormInput 
                            className='password-input'
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Email'
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <Button className='password-button' type='submit'>
                            <h3>Email Password</h3>
                        </Button>

                    </form>
                </div>
            </AuthWrapper>
        );
    }


export default EmailPassword;