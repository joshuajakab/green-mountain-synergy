import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from '../../redux/Users/users.actions';
import './styles.css';
import Button from '../defaultComponents/Button';
import Input from '../defaultComponents/Input';

import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState)
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }

    }, [currentUser])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));

    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        dispatch(googleSignInStart());
    }

    const configAuthWrapper = {
        headline: 'Login'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>

            <div className='formWrap'>
                <form className='sign-in-form'onSubmit={handleSubmit}>

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

                    <Button type='submit'>
                        <h2>Login</h2>
                    </Button>


                    <Button onClick={handleGoogleSignIn}>
                        <h2>Sign in with Google</h2>
                    </Button>
                       

                    <div className='links'>
                        <Link to='/recovery'>
                            Reset Password
                        </Link>
                        <Link to='/registration'>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}




export default SignIn;