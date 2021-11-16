import { firestore } from '../../firebase/utils';

export const handleAddBlog = blog => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('blogs')
            .doc()
            .set(blog)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
};

export const handleFetchBlogs = ({ filterType, startAfterDoc, persistBlogs = [] }) => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('blogs').orderBy('createdDate');

        if (filterType) ref = ref.where('blogCategory', '===', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...persistBlogs,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ]

                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount-1],
                    isLastPage: totalCount < 1
                });
            })
            .catch(err => {
                reject(err)
            })
    })
};

export const handleDeleteBlog = documentID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('blogs')
            .doc(documentID)
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

export const handleFetchBlog = blogID => {
    return new Promise((resolve, reject) => {
        firestore
        .collection('blogs')
        .doc(blogID)
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
