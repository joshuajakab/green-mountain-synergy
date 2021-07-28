import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkUserSession } from '../redux/Users/users.actions';
import { checkUserIsAdmin } from '../Utils';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAdminAuth = props => {
    const { currentUser } = useSelector(mapState);
    const history = useHistory();

    useEffect(() => {
        if (!checkUserIsAdmin(currentUser)) {
            history.push('/signin');
        }
    }, [currentUser]);

    return currentUser;
}

export default useAdminAuth;