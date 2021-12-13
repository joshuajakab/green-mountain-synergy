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
            <Link to='/shop'><h2>Shop</h2></Link>
            <Link to='/blog'><h2>Blog</h2></Link>
            <Link to='/faq'><h2>FAQ</h2></Link>
            <Link to='/about'><h2>About Us</h2></Link>
           

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
    )
};

export default Menu;
