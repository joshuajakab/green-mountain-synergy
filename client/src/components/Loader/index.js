import React from 'react';
import Spinner from '../../media/loader.gif'

const Loader = () => {
    return (
        <div className='spinner-container'>
            <img src={Spinner} className='spinner' alt='loading...' />
            <h2>Payment is Processing</h2>
            <h3>Please do not refresh page</h3>
        </div>
    )
}

export default Loader;