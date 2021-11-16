import blogsTypes from "./blogs.types";

export const addBlogStart = blogsData => ({
    type: blogsTypes.ADD_NEW_BLOG_START,
    payload: blogsData
});

export const fetchBlogsStart = (filters ={}) => ({
    type: blogsTypes.FETCH_BLOGS_START,
    payload: filters
});

export const setBlogs = blogs => ({
    type: blogsTypes.SET_BLOGS,
    payload: blogs
});

export const setBlog = blog => ({
    type: blogsTypes.SET_BLOG,
    payload: blog
});

export const deleteBlogStart = blogID => ({
    type: blogsTypes.DELETE_BLOG_START,
    payload: blogID
});

