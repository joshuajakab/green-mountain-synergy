import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics(); 






export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'})


export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if (!userAuth) return;
    const { uid } = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    
    if (!snapshot.exists) {
        const { email, firstName, lastName } = userAuth;
        const timestamp = new Date();
        const userRoles = ['user']

        try {
            await userRef.set({
                firstName,
                lastName,
                email,
                createdDate: timestamp,
                userRoles,
                ...additionalData
            })
        } catch(err) {
            console.log(err)
        }
    }

    return userRef;

};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
}
