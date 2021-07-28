import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import Logo from '../../media/logo.svg';
import { useWindowWidthAndHeight } from '../../hooks';
import { signOutUserStart } from '../../redux/Users/users.actions';

const mapState = (state) => ({
    currentUser: state.user.currentUser


});

const Header = props => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector(mapState);


    const signOut = () => {
        dispatch(signOutUserStart());
    }



    //useEffect(() => {
    //    const handleScroll = () => {
    //        if (window.scrollY > 20) {
    //            document.querySelector(".logo").className = "logo scroll";
    //            document.querySelector(".header").className = "header small";
    //            
    //          } else {
    //            document.querySelector(".logo").className = "logo";
    //            document.querySelector(".header").className = "header";
    //          }
    //    }
    //    window.addEventListener("scroll", handleScroll);
    //}, [])

    return (
        <div className='header'>
            <div className='top-row'>
                <Link className='link' to='/'><h2>Home</h2></Link>
                <Link className='link' to='/shop'><h2>Shop</h2></Link>
                <Link className='logo-link' to='/'>
                    <img className='logo' src={Logo} alt='logo'></img>
                </Link>
                <Link className='link' to='/about'><h2>About</h2></Link>
                <Link className='link' to='/contact'><h2>Contact</h2></Link>
            </div>
            <div className='bottom-row'>
                
                {!currentUser &&
                <div className='logged-out'>
                    <Link className='logged-out-link' to='/signin'>
                        <h3>Log In</h3>
                    </Link>
                </div>}
                {currentUser &&
                <div className='logged-in'>
                    <Link className='logged-in-link' to='/'>
                        <h3>My Account</h3>
                    </Link>
                    <Link className='logged-in-link' onClick={() => signOut()} to='/'>
                        <h3>LogOut</h3>
                    </Link>
                    
                </div>
                }
            </div>

        </div>
    )
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
