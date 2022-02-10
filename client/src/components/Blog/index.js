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

            <img className='blog-logo' src={Logo} alt='blog-logo' /> 

            <div className='blog-title'>Affordability, Quality and Care</div>
            
            <br />
            <div className='blog-subtitle'>Affordability</div> 
            <div className='blog-content'>
                As I look around I see a society that is overly stressed. Even the healthiest among us deal with stress on a daily basis. We stress for many different reasons but money is a common trigger for many people. Even if money isn’t an issue, I think we all appreciate saving a dollar and not over paying for goods or services. In particular, I believe that people should have affordable access to products that promote physical and emotional well-being.
                As a long time proponent of taking the utmost care of our mental and physical health, I am pleased to see a movement toward healthy choices. I have touted the positive benefits and untapped potential of CBD long before it reached its current popularity. I enthusiastically embrace the fact that so many people have come to recognize the positive benefits derived from this ancient plant. However, I do not like seeing how many companies are taking advantage of uneducated consumers by charging crazy prices and making ridiculous claims. This inspired me to create a company focused on making CBD more affordable and accessible for everyone.<br /><br />
                I have been involved in the industry since its beginning.  At the start 5 years ago, I understood why CBD was so expensive. This was when hemp was much more regulated and only legal to grow in select states.  It was also a time when high percentage CBD genetics were just becoming available. Until then people were growing very low CBD content hemp and it took a massive amount of material, time, and space to produce a small amount of oil. This justified the high price per mg that companies were charging. In the past five years things have changed drastically. In 2018 the federal government passed the Farm Bill Making growing hemp legal in all 50 states and essentially opened the floodgates on the CBD industry. At the same time amazing developments in hemp genetics came out that enabled production of hemp with a  20% CBD content which was unheard of 10 years ago.<br /><br />
                Many companies also cut corners in the drying and harvesting process. The use of mechanical harvesters and speed drying the hemp allowed  massive acreage to be grown. This caused a huge influx of hemp available to the market  which caused the price of hemp and CBD to crash in the past few years. With this crash you would expect the price of products to go down as well. Unfortunately, this has not been the case.   Many companies were formed prior to this crash and had already set their “bottom line”.  At Green Mountain Synergy, we base  our pricing on the current market value for hemp. We are also a direct to consumer company allowing us to sell our products directly to our customers. By cutting out the middleman we are able to create an even better value for the end user.<br /><br/>
            </div> 
            <br />
            <div className='blog-subtitle'>Quality</div>
            <div className='blog-content'>
            It is true that quality can differ greatly from one CBD product to another. This is because there are so many different variables that affect plant quality.  For example:<br />
            How it is grown?<br/>
            The genetics being used.<br/>   
            How it is dried?<br/>
            How was it extracted?<br/>
            Is it full spectrum or isolate?<br/><br/>
            All of these factors impact the quality of the end product. Green Mountain Synergy only sources the highest quality hemp grown on Vermont organic farmland. Great care is taken in every step of the process.<br/><br/>  
            I want to talk about another feature that may not be as familiar to CBD users and that is terpenes.  Terpenes are responsible for the smells and fragrances that many plants produce, including the cannabis plant. Along with being fun to smell, these volatile compounds also contain amazing medicinal qualities. Cannabis consumers often smell the herb before even looking at it as an indicator of its quality.<br/><br/> 
            Many companies try to expedite the drying process through the use of heat. While heat does not harm the CBD, it does destroy the terpenes. When making an isolate product this does not matter as you are refining it to the point where only the CBD remains. Green Mountain Synergy is committed to producing a full-spectrum product. In order to accomplish this,  we work hard to protect the terpenes.  Terpenes are extremely volatile and easily destroyed by heat.  Therefore, we slow dry the hemp to preserve its precious terpenes. After properly drying the hemp flower, we extract it with alcohol. Although we remove all the alcohol before making our products we believe that this solvent produces the highest quality full spectrum oil available. This is the oil that is infused into all of our amazing products at Green Mountain Synergy.<br/><br/>
            </div>
            <br />
            <div className='blog-subtitle'>Care</div>
            <div className='blog-content'>
            You will be hard pressed to find a company who cares more about the planet, the people working here, and our customers. We approach every step of the process with care. Our goal is to create products that are good for everyone. Many companies are willing to take advantage of customers or cut corners in order to save money and increase profits. At Green Mountain Synergy we will never do this and believe in complete transparency. In addition.we are equally committed to being guardians of  our planet. We employ regenerative agriculture techniques that are sustainable and enrich our beautiful soils. We do our best to treat the planet, our employees and end consumers with the respect they deserve. <br/><br/>
            We hold these beliefs:<br/>
            None of us exist without this planet we all live on.<br/>
            We are all stronger the more we help each other and work together. <br/>
            It is our responsibility to take care of this planet and to take care of each other. <br/><br/>
            Green Mountain Synergy is our way of helping to tend to the part of the garden that we can touch and to impact the lives that we are able. We hope you join us in this mission and help us take better care of this planet and each other.
            </div>

            
        </div>
    )
};

export default Blog;

