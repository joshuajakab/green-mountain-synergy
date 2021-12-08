import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './styles.css';

const Post = blog => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        blogTitle,
        blogImage,
        blogContent,
        blogCategory
    } = blog

    return (
        <div className='post'>
            <div className='post-title'>
                <h1>{blogTitle}</h1>
            </div>
            <div className='post-img'>
                <img className='blog-image' src={blogImage} alt='blog' />
            </div>
            <div className='post-content' dangerouslySetInnerHTML={{ __html: blogContent }}>
                
            </div>
        </div>
    )
};

export default Post;
