import React from 'react';
import './styles.css';

const AuthWrapper = ({ headline, children }) => {
    return (
        <div className='authWrapper'>
            
                
               <div className='children'> 
                    {children && children}
                </div>
            
        </div>

    );
}

export default AuthWrapper;