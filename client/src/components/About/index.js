import React from 'react';
import './styles.css'

const About = props => {

    return (
        <div className='about-container'>
            <div className='about-image-container'>
                <img src='https://drive.google.com/uc?id=1Sq01Tb5aKqh4eEkPH0y7t6A5GFcRZxeH' alt='the-farm' className='about-image'></img>
            </div>
            <div className='about-content-container'>
                <h2 className='about-content'>We are a direct to consumer CBD company that focuses on delivering the highest quality products for the best price possible. By cutting out the middle man and not doing business with retail outlets we are able to pass on massive savings to you.<br /><br />

                    We grow all of our hemp in Vermont with organic farming practices. We then extract that hemp with high quality ethanol extraction to ensure the most full spectrum product possible. We lab test and create the highest quality CBD  products available on site at the farm.<br /><br />

                    We look forward to serving you and providing you the highest quality CBD products on the market for the best value we can provide.

                </h2>
            </div>
        </div>
    )
};

export default About;
