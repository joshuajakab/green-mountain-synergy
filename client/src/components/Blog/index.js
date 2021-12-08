import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchBlogsStart } from '../../redux/Blogs/blogs.actions';
import Post from './Post';
import FormSelect from '../defaultComponents/Select';
import './styles.css';

const mapState = ({ blogsData }) => ({
    blogs: blogsData.blogs
});

const Blog = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { blogs } = useSelector(mapState);
    const { data, queryDoc } = blogs;

    const { filterType } = useParams();

    useEffect(() => {
        dispatch(
            fetchBlogsStart({ filterType })
        )
        console.log(blogs)
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/blog/${nextFilter}`)
    };

    if (!Array.isArray(data)) return null;

    if (data.length < 1) {
        return (
            <div className='blogs-container'>
                <p>No results found.</p>
            </div>
        )
    };

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'News',
            value: 'news'
        }, {
            name: 'Education',
            value: 'education'
        }, {
            name: 'Fun',
            value: 'fun'
        }],
        handleChange: handleFilter
    };
    

    return(
        <div className='blogs-container'>
            <FormSelect {...configFilters} />
            {data.map((blog, pos) => {
                    const {
                        blogTitle,
                        blogImage,
                        blogContent,
                        blogCategory
                    } = blog
                    //if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                    console.log(blog)
                    const configBlog = {
                        ...blog
                    }

                    return (
                        <Post key={pos} {...configBlog} />
                    )
                })}
            
        </div>
    )
};

export default Blog;

