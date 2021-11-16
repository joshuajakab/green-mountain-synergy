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
                    At Green Mountain Synergy our aim is to provide you with the highest quality products for the best price possible. We do this by being a direct to consumer company and offering our products directly from our farm to you. This allows us to sell our CBD at a much lower price and give you a better value than other companies. We never sacrifice quality in any step of our process and our top priority is producing the best product that we can. We look forward to serving you and being your source for all things wellness! <br/><br/>
                    Real Plants, Real People, Real Value.   
                </h2>
            </div>
        </div>
    )
}

export default Home;
