import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../defaultComponents/Button';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const SquareSignUp = () => {

    useEffect(() => {
        if (squareID) {
            reset();
            history.push('/payment');
        }

    }, [squareID]);

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
            
            {currentUser && !squareID &&
                <div>
                    <p>Last Step! Your info needs to be added to Square.</p>
                    <Button><h2>Add me to Square</h2></Button>
                </div>
            }



        </div>
    )
}

export default SquareSignUp;
