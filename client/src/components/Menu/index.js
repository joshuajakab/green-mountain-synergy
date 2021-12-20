import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUserStart } from '../../redux/Users/users.actions';
import { checkUserIsAdmin } from '../../Utils';
import './styles.css';

const mapState = (state) => ({
    currentUser: state.user.currentUser


});

const Menu = props => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);


    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (
        <div className='menu-container' onClick={props.click}>
            <Link className='menu-links' to='/shop'>Shop</Link>
            <Link className='menu-links' to='/blog'>Blog</Link>
            <Link className='menu-links' to='/faq'>FAQ</Link>
            <Link className='menu-links' to='/about'>About Us</Link>
           

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
                            <Link className='logged-in-link' to='admin'>
                                Admin
                            </Link>}

                    </div>
                }

           
        </div>
    )
};

export default Menu;
