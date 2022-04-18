import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './account.css';

const mapState = state => ({
    user: state.currentUser.user
})

const Account = props => {

    const { user } = useSelector(mapState);
    const { id } = user;

    return(
        <div>

        </div>
    )
};

export default Account;
