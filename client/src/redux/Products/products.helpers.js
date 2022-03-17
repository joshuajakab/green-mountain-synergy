import { firestore } from '../../firebase/utils';
import productsTypes from './products.types';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleFetchProducts = () => {
    return new Promise((resolve, reject) => {
       

        let ref = firestore.collection('products').orderBy('createdDate');

        

        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];

                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount - 1],
                    
                });
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
} 

export const handleFetchProduct = productID => {
    return new Promise((resolve, reject) => {
        firestore
        .collection('products')
        .doc(productID)
        .get()
        .then(snapshot => {
            if (snapshot.exists) {
                resolve(
                    snapshot.data()
                );
            }
        })
        .catch(err => {
            reject(err);
        })
    })
};
