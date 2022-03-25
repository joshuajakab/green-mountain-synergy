import React, { useEffect, useState } from 'react';

const SquareSignUp = () => {

    const [registeredUser, setRegisteredUser] = useState(false);
    const [squareUser, setSquareUser] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    return (
        <div className='sqaure-sign-up-container'>
            <h2>Subscription</h2>
            <p>Thanks for signing up for our subscription! In order to be part of it you will have to register on our website and be added as a customer to Square. If you are already registered and signed in just click 'Add me to Square'</p>
        </div>
    )
}

export default SquareSignUp;
