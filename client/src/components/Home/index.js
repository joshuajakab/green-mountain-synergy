import React from 'react';
import HomeImage from '../../media/download.jpg';
import './styles.css';

const Home = props => {
    return (
        <div className='home-container'>
            <div className='image-container'>
                <img src='https://drive.google.com/uc?id=1ec6rHFoD9cKIlvjb7_nPFMkiPRRFriK-' alt='home' className='home-image' />
            </div>
            <div className='home-content-container'>
                <h2 className='home-content'>
                Welcome to Green Mountain Synergy, it is our mission to create the highest quality products for the best value possible. We understand that whatever we produce and sell must be good for the planet, our employees, and our end consumer. We believe CBD should be affordable for everyone. We will always value people and our planet above profits. We hope you can feel our intent and the potency of nature in all of our amazing products. Thank you for your support! <br /> <br />
                </h2>
                
                <h2 className='home-tag'>Real plants. Real people. Real value.</h2>
                {/*<div className='blog-preview'>
                    <div className='news-title'>CBD Info and News</div>
                    <div className='blog-preview-content'>
                        
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Home;
