import { auth } from '../../firebase/utils';
import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { fetchBlogsStart, setBlogs, setBlog } from './blogs.actions';
import { handleAddBlog, handleFetchBlogs, handleDeleteBlog, handleFetchBlog } from './blogs.helpers';
import blogsTypes from './blogs.types';

export function* addBlog({ payload }) {

    try {
        const timestamp = new Date();
        yield handleAddBlog({
            ...payload,
            blogAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(
            fetchBlogsStart()
        );
    } catch (err) {
        console.log(err)
    }
}

export function* onAddBlogStart() {
    yield takeLatest(blogsTypes.ADD_NEW_BLOG_START, addBlog)
}

export function* fetchBlogs({ payload }) {
    try {
        const blogs = yield handleFetchBlogs(payload);
        yield put(
            setBlogs(blogs)
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onFetchBlogsStart() {
    yield takeLatest(blogsTypes.FETCH_BLOGS_START, fetchBlogs)
}

export function* fetchBlog({ payload }) {
    try {
        const blog = yield handleFetchBlog(payload);
        yield put(
            setBlog(blog)
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onFetchBlogStart() {
    yield takeLatest(blogsTypes.FETCH_BLOG_START, fetchBlog)
}

export function* deleteBlog({ payload }) {
    try {
        yield handleDeleteBlog(payload);
        yield put(
            fetchBlogsStart()
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onDeleteBlogStart() {
    yield takeLatest(blogsTypes.DELETE_BLOG_START, deleteBlog)
}

export default function* blogsSagas() {
    yield all([
        call(onAddBlogStart),
        call(onFetchBlogsStart),
        call(onDeleteBlogStart),
        call(onFetchBlogStart)
    ])
};
