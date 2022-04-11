import React from 'react';
import Button from '../defaultComponents/Button';
import { useHistory } from 'react-router-dom';
import './landing.css';

const Landing = () => {

    const history = useHistory();

    return(

        <div className='landing-container'>
            <div className='background-container'>
                
            </div>
            <div className='age-container'>
                <h2>Are you 21 or older?</h2>
                <Button className='age-button' onClick={() => history.push('/shop')}><h2>YES</h2></Button>
                <Button className='age-button'><h2>NO</h2></Button>
            </div>
        </div>
    )
}

export default Landing;
