
import { firestore } from '../../firebase/utils';

export const handleSaveOrder = order => {
    //console.log(order)
    return new Promise((resolve, reject) => {
        
        firestore
            .collection('orders')
            .doc()
            .set(order)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            });
    });
};

export const handleGetUserOrderHistory = uid => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('orders').orderBy('orderCreatedDate');
        ref = ref.where('orderUserID', '==', uid);

        ref
            .get()
            .then(snap => {
                const data = [
                    ...snap.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];

                resolve({ data })
            })
            .catch(err => {
                reject(err)
            });
    });
};

export const handleGetOrderHistory = () => {
    return new Promise((resolve, reject) => {

        const pageSize = 10;
        let ref = firestore.collection('orders').orderBy('orderCreatedDate', 'desc').limit(pageSize);
        

        ref
            .get()
            .then(snap => {
                const data = [
                    ...snap.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];

                resolve({ data })
            })
            .catch(err => {
                reject(err)
            });
    });
};

export const handleGetOrder = orderID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .doc(orderID)
            .get()
            .then(snap => {
                if (snap.exists) {
                    resolve({
                        ...snap.data(),
                        documentID: orderID
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    })
}
