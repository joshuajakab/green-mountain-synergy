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
        console.log(blogs)
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

    
    

    return(
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

            <img className='blo-logo' src={Logo} alt='bio-logo' /> 

            <div className='blog-title'>Affordability, Quality and Care</div>
            
            <br />
            <div className='blog-subtitle'>Affordability</div> 
            <div className='blog-content'>As I look around in America I see a society that is overly stressed. Even the healthiest among us are dealing with stress on a daily basis. We stress for many different reasons but money is a common problem for many people. Even if it isn’t an issue, I think we all appreciate saving a dollar and not over paying for goods or services.
            In the past few years CBD has blown up in popularity. It is obviously helping a lot of people but what I did not like seeing was how many companies were taking advantage of uneducated consumers by charging crazy prices and making ridiculous claims. This inspired me to create a company who focused on making CBD more affordable for everyone. 
            I have been involved in the industry for many years and I understood why CBD was so expensive 5+ years ago. This was when hemp was much more regulated and not legal to grow in many states, it also was at a time when high percentage CBD genetics were just becoming available. Up until then people were growing very low CBD content hemp and it took a massive amount of material, time, and space to produce a small amount of oil. This justified the high price per mg that people were charging. 
            In the past five years things changed drastically and in 2018 the federal government passed the farm bill making growing hemp legal in all 50 states and essentially opened the floodgates on the CBD industry. At the same time amazing hemp genetics came out that were able to produce 20% CBD content which was unheard of 10 years ago. Many companies also cut corners in the drying and harvesting process using big mechanical harvesters and speed drying the hemp allowing massive acreage to be grown. This caused a huge influx of hemp to be produced which caused the price of hemp and CBD to crash in the past few years. With this crash you would expect the price of products to go down as well.
            This has not been the case as many companies were formed before this crash and were already charging what they were charging. This still exists to this day where many companies are charging exorbitant rates for their products. At Green Mountain Synergy we are basing our pricing on the current market value for hemp. We are also a direct to consumer company allowing us to sell our products directly to our customers. By cutting out the middleman we are able to create an even better value for the end user. 
            </div> 
            <br />
            <div className='blog-subtitle'>Quality</div>
            <div className='blog-content'> It is true that quality can differ greatly from one CBD product to another. This is because there are many so different variables from plant quality, how it is dried, extraction technique, and what type of concentrate is used. 
            With so many different ways to grow hemp and the amount of genetics available this is a big variable in the quality of the end product. Green Mountain Synergy only sources the highest quality hemp grown on Vermont organic farmland. We then slow dry the hemp to preserve its precious terpenes which are extremely volatile and easily destroyed by heat. 
            This is one of the bottlenecks that many companies try to expedite by drying the hemp with forced heat. This does not affect the CBD content but it destroys the terpenes. When making an isolate product this does not matter as you are refining it to the point where only the CBD remains. When producing a full-spectrum product as one produced by Green Mountain Synergy, we believe it is important not to destroy these terpenes by drying with high heat. Any cannabis smoker can appreciate the fact that much is lost if the plant is not dried properly. 
            We then take our high quality hemp flower after it is properly dried and extract it with alcohol. Although we remove all the alcohol before making our products we believe that this solvent produces the highest quality full spectrum oil available. This is the oil that is infused into all of our amazing products. 
            </div>
            <br />
            <div className='blog-subtitle'>Care</div>
            <div className='blog-content'>You will be hard pressed to find a company who cares more about the planet, the people working here and our customers consuming our products. Every step of the process we approach with care. Our goal is to only create products that are good for everyone and this includes first and foremost our planet. 
            Many companies are willing to take advantage of customers or cut corners in order to save money and increase profits. At Green Mountain Synergy we will never do this and believe in complete transparency. We do our best to treat the planet, our employees and end consumers with the respect they deserve. None of us exist without this planet we all live on and we are all stronger the more we help each other and work together. 
            We believe it is all of our jobs to take care of this planet and to help take care of each other. Green Mountain Synergy is our way of helping to tend to the part of the garden that we can touch and impact the lives that we are able. We hope you join us in this mission and help us take better care of this planet and each other. 
            </div>

            
        </div>
    )
};

export default Blog;

