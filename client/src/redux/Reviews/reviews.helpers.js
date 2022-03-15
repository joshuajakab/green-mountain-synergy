import { firestore } from '../../firebase/utils';

export const handleAddReview = review => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('reviews')
            .doc()
            .set(review)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
};

export const handleFetchReviews = ({ filterType, startAfterDoc, persistReviews = [] }) => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('reviews').orderBy('createdDate');

        if (filterType) ref = ref.where('productID', '==', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...persistReviews,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ]

                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount - 1]
                });
            })
            .catch(err => {
                reject(err)
            })
    })
};

export const handleDeleteReview = reviewID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('reviews')
            .doc(reviewID)
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

