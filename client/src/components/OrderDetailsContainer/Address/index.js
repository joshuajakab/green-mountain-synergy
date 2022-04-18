import React from 'react';

const Address = ({ address }) => {

    if (!line1) return null;

    const { line1, line2, city, state, zip_code, phone } = address;

    

    return (
        <div className='address-container'>
            <h3>{line1}</h3>
                    <h3>{line2}</h3>
                    <h3>{city} {state} {zip_code}</h3>
    <h3>{phone}</h3>
        </div>

    )
}

export default Address;
