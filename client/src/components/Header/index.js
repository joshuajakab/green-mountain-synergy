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
                <Link className='link' to='/shop'>Shop</Link>
                <Link className='link' to='/blog'>Our Story</Link>
                <Link className='link' to='/faq'>FAQ</Link>
                <Link className='link' to='/about'>About Us/Contact</Link>
                <Link className='cart-container' to='/cart'>
                    <img className='cart-img' src={Cart} alt='cart' />
                    <h3 className='num-cart-items'>({parseInt(totalNumCartItems, 10)})</h3>
                </Link>

            </div>
            <div className='bottom-row'>

                {!currentUser &&
                    <div className='logged-out'>
                        <Link className='logged-out-link' to='/register'>
                            Register
                        </Link>
                        <Link className='logged-out-link' to='/signin'>
                            Log In
                        </Link>
                    </div>}
                {currentUser &&
                    <div className='logged-in'>
                        <Link className='logged-in-link' to='/'>
                            My Account
                        </Link>
                        <Link className='logged-in-link' onClick={() => signOut()} to='/'>
                            LogOut
                        </Link>
                        {isAdmin &&
                            <Link className='logged-in-link' to='/admin'>
                                Admin
                            </Link>}

                    </div>
                }

            </div>
            <div className='top-top-row'>
                <p className='shipping-tag'>Free shipping on orders over $50 to the contiguous United States</p>    
            </div>

        </div>
    )
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
