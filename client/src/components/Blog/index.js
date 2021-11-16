import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';

const mapState = ({ blogsData }) => ({
    blogs: blogsData.blogs
});

const Blog = props => {

    const { blogs } = useSelector(mapState);
    const { data } = products;

    return(
        <div className='blogs-container'>
            
        </div>
    )
};

export default Blog;

