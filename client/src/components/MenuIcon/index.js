import React from 'react';
import Icon from '../../media/menu-icon-hamburger.svg';
import './styles.css';

const MenuIcon = props => {
    return (
        <div className='menu-icon' onClick={props.click}>
            <img src={Icon} alt='menu' className='icon'/>
        </div>
    )
};

export default MenuIcon;
