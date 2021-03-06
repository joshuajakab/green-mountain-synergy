import { CKEditor } from 'ckeditor4-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../defaultComponents/Button';
import FormInput from '../defaultComponents/Input';
import TextArea from '../defaultComponents/Textarea';
import Modal from '../defaultComponents/Modal';
import FooterIdea from '../../media/footer-idea.svg';
import FBIcon from '../../media/facebook.svg';
import InstaIcon from '../../media/instagram.svg';
import { apiInstance } from '../../Utils';

import './styles.css';
import MailchimpFormContainer from '../MailchimpFormContainer';

const Footer = props => {

    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [hideSubscribeModal, setHideSubscribeModal] = useState(true);

    const toggleSubscribeModal = () => setHideSubscribeModal(!hideSubscribeModal);

    const configSubscribeModal = {
        hideSubscribeModal,
        toggleSubscribeModal
    };

    const sendContactEmail = (e, errors) => {
        e.preventDefault();

        if (errors) {
            setErrorMessages(errors.map(error => error.message))
            return
        }

        apiInstance.post('/access', { contactEmail: contactEmail, contactName: contactName, contactSubject: contactSubject, contactMessage: contactMessage })
    }

    return (
        <div className='footer'>
            <img className='footer-img' src={FooterIdea} alt='footer' />
            <div className='background-color-container'>
                <div className='footer-link-container'>
                    <div className='email-signup-container'>
                        <p>Sign up for our newsletter for the latest news, information and DEALS!</p>
                        <Link to='/subscribe'><Button className='email-signup-button'>Sign Up</Button></Link>
                    </div>
                    <div className='social-container'>
                        <p className='social-title'>Follow us on social media</p>
                        <div className='social-links'>
                            <a className='social-icon' href='https://www.facebook.com/greenmountainsynergy'><img  src={FBIcon} alt='facebook' /></a>
                            <a className='social-icon' href='https://www.instagram.com/greenmountainsynergy'><img  src={InstaIcon} alt='instagram' /></a>
                        </div>
                    </div>
                    <div className='location-container'>
                        <p className='location'>Located in Brandon, VT</p>
                    </div>

                </div>
                <div className='lower-footer-link-container'>
                    <Link className='footer-link' to='/terms-conditions'>Terms and Conditions </Link>
                    <Link className='footer-link' to='/privacy-policy'>Privacy Policy</Link>
                    <Link className='footer-link' to='/return-policy'>Return Policy</Link>
                    <Link className='footer-link' to='/shipping-policy'>Shipping Policy</Link>
                </div>
                <div className='disclaimer-container'>
                    *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.
                </div>
            </div>
            
            {/*<div className='contact-container'>
                <form onSubmit={sendContactEmail}>
                    <FormInput
                        label='Your Name'
                        type='text'
                        value={contactName}
                        handleChange={e => setContactName(e.target.value)}
                    />
                    <FormInput
                        label='Your Email'
                        type='email'
                        value={contactEmail}
                        handleChange={e => setContactEmail(e.target.value)}
                    />
                    <FormInput
                        label='Subject'
                        type='text'
                        value={contactSubject}
                        handleChange={e => setContactSubject(e.target.value)}
                    />
                    
                    <TextArea
                        label='Message'
                        type='text'
                        value={contactMessage}
                        handleChange={e => setContactMessage(e.target.value)}
                     />
                    <Button>
                        Send
                    </Button>
                </form>

            </div>
    */}
            <div className='social-media-container'>

            </div>
        </div>
    )
};

export default Footer;
