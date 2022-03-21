import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const { userRoles } = currentUser;
    if (userRoles.includes('admin')) return  true;

    return false;
}

export const apiInstance = axios.create({
    baseURL: 'https://us-central1-green-mountain-synergy.cloudfunctions.net/api'
    //baseURL:'http://localhost:5001/green-mountain-synergy/us-central1/api'
})