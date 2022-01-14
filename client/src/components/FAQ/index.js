import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../defaultComponents/Button';
import Modal from '../defaultComponents/Modal';
import './styles.css';

const FAQ = props => {

    const [hideTestModal, setHideTestModal] = useState(true);

    const toggleTestModal = () => setHideTestModal(!hideTestModal);

    const configTestModal = {
        hideTestModal,
        toggleTestModal
    };



    return (
        <div className='faq-container'>
            <div className='faq'>
                <h1>FAQ</h1>
                <h2 className='faq-titles'>What is CBD and where does it come from?</h2>
                <p className='faq-content'>CBD stands for cannabidiol and is derived from the cannabis plant. We specifically use hemp plants that are rich in CBD and below .3%THC. We also only use varieties that contain the highest terpene content in order to produce the highest quality full spectrum products available.</p>
                <h2 className='faq-titles'>What is full spectrum CBD and how is it different from CBD isolate?</h2>
                <p className='faq-content'>Full spectrum CBD means it contains all components of the plant. This provides a full range of cannabinoids(CBD,CBDA,CBG,THC,ect.) as well as the volatile terpenes in the plant. This combination produces what many refer to as the entourage effect allowing all components of the plant to work together and make the CBD more effective compared to isolate products. Isolate CBD is a further refined product that contains only CBD and has removed all other parts of the plant. Many people report that isolate products do not work as well but they are safe to consume if you are being drug tested. A full spectrum product such as the ones sold on this site can lead to a failed drug test. Be aware even though our products contain less than .3%THC it can bioaccumulate in the body and cause a failed drug test.</p>
                <h2 className='faq-titles'>Why are we able to offer such good prices on our CBD products?</h2>
                <p className='faq-content'>We do this by offering our products direct to consumer as opposed to doing wholesale pricing with big box stores. Did you know that most stores take an average of 50% of each product sold? Add in sales reps and companies need to charge exorbitant margins in order to do business with these stores and reps. We choose to cut out the middleman and pass the savings on to you. </p>
                <h2 className='faq-titles'>Are more expensive CBD products better products?</h2>
                <p className='faq-content'>Simple answer to this question is no. Like most things there is some aspect of you pay for what you get. CBD is very different since it is such a new market and consumers are not educated like they are in other fields. CBD is also very unregulated meaning almost anyone can sell it. This leads to many inferior products that make ridiculous claims and are often mislabeled. Because of this you will see CBD products listed for all types of prices and mg concentrations. At Green Mountain Synergy we are focused on providing the most affordable CBD on the market while also creating the highest quality full spectrum product that we can. We believe that CBD helps many people with many problems and should be affordable to everyone. Did you know the hemp market crashed in 2019 but most companies kept their prices the same?<br /><br />In 2019 we had a huge crash in the hemp market as there was way too much supply and not enough demand. This caused hemp prices to drop drastically but what did not drop was the price of products. We believe this is because companies already established the price they were getting for their products and became greedy at what they could charge. Being a new company we can base our product pricing on what the current market value of hemp is which is much lower than what it was a few years ago. This is another reason that we are able to offer such incredible prices on our amazing products.</p>
                <h2 className='faq-titles'>What extraction method do we use?</h2>
                <p className='faq-content'>This is another thing that makes our company unique. We choose to use alcohol extraction as we believe it produces the highest quality full spectrum product available. Many people use Co2 or other solvents in order to extract the hemp. These extraction techniques produce inferior products compared to alcohol extraction which captures the widest range of the medicinal qualities of the plant. </p>
                <h2 className='faq-titles'>How much CBD should I try for the first time?</h2>
                <p className='faq-content'>We are all very different, each person and each problem often requires a different dose or product. This is why we offer so many different choices of concentrations as well as topical and internal formulations. We suggest starting small and working your way up as needed. Many people start at 10mg and find that to be an effective dose. Others require a higher dose in order to be effective. This takes individual experimentation in order to figure out exactly what is best for you. A great thing about CBD is it is extremely safe even at high doses which are required for some people to treat certain issues. Topically CBD is very easy to dose and use, just apply it to areas topically and observe its wonders!</p>

                <h2 className='faq-titles'>Can our product make you fail a drug test?</h2>
                <p className='faq-content'>Yes, although our products are always below .3% THC, they are full spectrum products and have the potential to lead to a failed drug test despite these low levels. We always want people to be aware of this fact. </p>
                <h2 className='faq-titles'>CBD and Pets</h2>
                <p className='faq-content'>All mammals contain an endocannabinoid system and can benefit from CBD products. Many people report amazing transformations in their pets after adding CBD to their diet. Many animals are much more sensitive than humans and don’t require nearly as much CBD. Always start with a small amount(around 5mg) and work your way up as needed. Bigger dogs or animals may require a larger dose than smaller animals. </p>
                <h2 className='faq-titles'>How should I store products?</h2>
                <p className='faq-content'>Our products have a shelf life of at least one year and are stable at room temperatures. No need to refrigerate unless you prefer to. </p>
                <h2 className='faq-titles'>Any other questions?</h2>
                <p className='faq-content'>Feel free to email, call, or text us anytime with any question. We will do whatever we can to help and we appreciate hearing from you!</p>

            </div>
            <div className='dosage'>
                <h2 className='dosage-title'>Here is a dosing chart to help with dosing our tinctures:</h2>
                <img className='dosage-chart' src='https://drive.google.com/uc?id=1zQtde7VKlbHab3h_bEYiqnRVF_8Qs7MU' alt='chart' />
            </div>
            <div className='testing'>
                <h1>Testing</h1>
                <p>At Green Mountain Synergy we are rigorously testing anything that we create to make sure it is accurately labeled, legally compliant and above our extremely strict standards. Here are our latest test result for our Tincture and Salve:</p>
                <Link className='test-button' to='/testing'><h2 className='test-button-text'>Test Results</h2></Link>
                
            </div>
        </div>
    )
};

export default FAQ;
