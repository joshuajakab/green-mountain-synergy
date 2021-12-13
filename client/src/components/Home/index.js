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
                Welcome to a company whose mission is to create the highest quality products for the best value we can. We believe that whatever we do or sell needs to be good for the planet, our employees, and our end consumer. We also think CBD should be affordable for everyone. We will always put people and our planet above profits. If it is not a win, win, win, for everyone you will not find it on this site. We hope you can feel our intent and nature's amazing power in each of our all natural products. <br /> <br />
                </h2>
                
                <h2 className='home-tag'>Real plants, Real people, Real value</h2>
                <div className='blog-preview'>
                    <div className='news-title'>CBD Info and News</div>
                    <div className='blog-preview-content'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
