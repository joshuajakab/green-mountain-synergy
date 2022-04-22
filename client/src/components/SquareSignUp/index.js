import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../defaultComponents/Button';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const SquareSignUp = () => {

    const { currentUser } = useSelector(mapState);
    const { squareID } = currentUser;

    const addCustomerToSquare = async (currentUser) => {


    }
    

    return (
        <div className='sqaure-sign-up-container'>
            <h2>Subscription</h2>
            
            {!currentUser &&
            <div>
                <p>Thanks for signing up for our subscription! In order to sign up you will have to register or log in to our website.</p>
                <Button className='sub-login-button' onClick={() => history.push('/login')}>Register/Sign In</Button>
            </div>}
            
            {currentUser && !squareUser &&
                <div>
                    <p>It looks like you are registered and signed in but your info needs to be added to Square's database.</p>
                    <Button>Add me to Square</Button>
                </div>
            }



        </div>
    )
}

export default SquareSignUp;
