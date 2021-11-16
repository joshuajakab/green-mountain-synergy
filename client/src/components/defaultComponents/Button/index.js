import React from 'react';
import './styles.css';

const Button = ({ children, ...otherProps }) => {
    return (
        <div className='formRow'>
            <button className='btn' {...otherProps}>
                {children}
            </button>
        </div>
    );
};

export default Button;