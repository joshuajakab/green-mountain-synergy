import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../MenuIcon';
import Menu from '../Menu';
import './styles.css';

const PhoneHeader = props => {

    

    return (
        <div className='phone-header'>
            
            <Link to='/' className='title'><h3>Green Mountain Synergy</h3></Link> 
        </div>
    )
};

export default PhoneHeader;
