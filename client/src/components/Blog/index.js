import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchBlogsStart } from '../../redux/Blogs/blogs.actions';
import Post from './Post';
import FormSelect from '../defaultComponents/Select';
import Logo from '../../media/logo.svg';
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

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/blog/${nextFilter}`)
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

    useEffect(() => {
        dispatch(
            fetchBlogsStart({ filterType })
        )
        //console.log(blogs)
    }, [filterType]);



    if (!Array.isArray(data)) return null;

    if (data.length < 1) {
        return (
            <div className='blogs-container'>
                <FormSelect {...configFilters} />
                <p>No results found.</p>
            </div>
        )
    };




    return (
        <div className='blogs-container'>
            {/* <FormSelect {...configFilters} /> 
            {data.map((blog, pos) => {
                    const {
                        blogTitle,
                        blogImage,
                        blogContent,
                        blogCategory
                    } = blog
                    if (!blogImage || !blogTitle) return null;
                    
                    const configBlog = {
                        ...blog
                    }

                    return (
                        <Post key={pos} {...configBlog} />
                    )
                })}
            */}

            <img className='blog-logo' src={Logo} alt='blog-logo' />

            <div className='blog-title'>Affordability, Quality and Care</div>

            <br />
            <div className='blog-subtitle'>Affordability</div>
            <div className='blog-content'>
            I believe that everyone should have affordable access to high quality products that promote physical and emotional well-being. We have consistently promoted the positive benefits and untapped potential of CBD long before it reached its current popularity. We enthusiastically embrace the fact that so many people have come to recognize the positive benefits derived from this ancient plant! Unfortunately, when something becomes popular and in high demand, it often brings in companies with poor practices that take advantage of the consumer. This is what inspired me to create a company focused on making CBD more affordable and accessible for everyone. Green Mountain Synergy is also a direct to consumer company allowing us to offer the best prices directly to our customers!<br /><br />
            </div>
            <br />
            <div className='blog-subtitle'>Quality</div>
            <div className='blog-content'>
            It is true that quality can differ greatly from one CBD product to another. This is because there are so many different variables that affect plant quality.<br />
                <div className='blog-list'>
                    <ul>
                        <li>-How was it grown?</li>
                        <li>-What genetics were used?</li>
                        <li>-How was it dried?</li>
                        <li>-How was it extracted?</li>
                        <li>-Is it full spectrum or isolate?</li>
                    </ul>
                </div>
                Green Mountain Synergy only sources the highest quality hemp grown on Vermont organic farmland. We are committed to producing a full-spectrum product. To accomplish this, we work hard to protect the precious terpenes of the plant. Terpenes are responsible for the smells and fragrances that many plants produce, including the cannabis plant. These fragrant compounds also contain amazing medicinal qualities. Cannabis consumers often smell the herb before even looking at it as an indicator of its quality.<br /><br />
                Terpenes are extremely volatile and easily destroyed by heat, therefore, we slow dry the hemp to preserve these precious terpenes. Many companies try to expedite the drying process using heat, while heat does not harm the CBD, it does destroy the terpenes. When making a full spectrum product such as ours, we really believe this is a critical factor. After properly drying the hemp flower, we extract it with alcohol. Although we remove all the alcohol before making our products, we believe that this solvent produces the highest quality full spectrum oil available. This is the oil that is infused into all our amazing products at Green Mountain Synergy.<br /><br />
            </div>
            <br />
            <div className='blog-subtitle'>Care</div>
            <div className='blog-content'>
            We are committed to being guardians of our planet. We employ regenerative agriculture techniques that are sustainable and enrich our beautiful soils. We pride ourselves in being transparent and do our best to treat the planet, our employees and end consumers with the love and respect they deserve. Our goal is to create an environment where each of these vital components flourishes in synergy. <br /><br />
                We hold these beliefs:<br />
                -None of us exist without this planet we all live on.<br />
                -We are all stronger the more we help each other and work together. <br />
                -It is our responsibility to take care of this planet and to take care of each other. <br /><br />
                Green Mountain Synergy is our way of helping to tend to the part of the garden that we can touch and to impact the lives that we are able. We hope you join us in this mission and help us take better care of this planet and each other.<br /><br />
                -Grant Jakubowski<br />
                (Owner-Green Mountain Synergy)
            </div>


        </div>
    )
};

export default Blog;

