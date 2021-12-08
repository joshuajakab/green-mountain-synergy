import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import Cart from '../../media/cart.svg';
import Logo from '../../media/logo.svg';
import MenuIconCircle from '../../media/menu-icon.svg'
import MenuIconMountain from '../../media/menu-icon-mountains.svg'
import { useWindowWidthAndHeight } from '../../hooks';
import { signOutUserStart } from '../../redux/Users/users.actions';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import { checkUserIsAdmin } from '../../Utils';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)

});

const Header = props => {

    const dispatch = useDispatch();

    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);


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
                <Link className='logo-link' to='/'>
                    <img className='logo' src={MenuIconMountain} alt='logo'></img>
                </Link>
                <Link className='link' to='/shop'><h2>Shop</h2></Link>
                <Link className='link' to='/'><h2>Testing</h2></Link>

                <Link className='link' to='/blog'><h2>Blog</h2></Link>
                <Link className='link' to='/faq'><h2>FAQ</h2></Link>
                <Link className='link' to='/about'><h2>About Us</h2></Link>
                <Link to='/cart'>
                    <img src={Cart} alt='cart' />({totalNumCartItems})
                </Link>

            </div>
            <div className='bottom-row'>

                {!currentUser &&
                    <div className='logged-out'>
                        <Link className='logged-out-link' to='/register'>
                            <h3>Register</h3>
                        </Link>
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
                        {isAdmin &&
                            <Link className='logged-in-link' to='admin'>
                                <h3>Admin</h3>
                            </Link>}

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
