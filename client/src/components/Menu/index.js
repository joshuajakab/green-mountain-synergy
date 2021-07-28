import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Menu = props => {
    return (
        <div className='menu-container'>
            <Link to='/'>
                <h3>Home</h3>
            </Link>
            <Link to='/shop'>
                <h3>Shop</h3>
            </Link>
            <Link>
                <h3>About Us</h3>
            </Link>
            <Link>
                <h3>Contact Us</h3>
            </Link>
        </div>
    )
};

export default Menu;
