import React from 'react';
import './styles.css';

const TextArea = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className='formRow'>
            {label && (
                <label>
                    <h3>{label}</h3>
                </label>
            )}

            <textarea className='textArea' onChange={handleChange} {...otherProps} />
        </div>

    );
}

export default TextArea;