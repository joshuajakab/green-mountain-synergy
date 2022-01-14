import React, { useState } from 'react';
import Button from '../defaultComponents/Button';
import FormInput from '../defaultComponents/Input';
import TextArea from '../defaultComponents/Textarea';
import { apiInstance } from '../../Utils';
import './styles.css'

const About = props => {

    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const sendContactEmail = ( e, errors ) => {
        e.preventDefault();

        if (errors) {
            setErrorMessages(errors.map(error => error.message))
            return
        }
        
        apiInstance.post('/access', { contactEmail: contactEmail, contactName: contactName, contactSubject: contactSubject, contactMessage: contactMessage })
    }

    return (
        <div className='about-container'>
            <div className='about-image-container'>
                <img src='https://drive.google.com/uc?id=1HOjBrskLBXa6NpCnX6fVhOzL3Num39sS' alt='the-farm' className='about-image'></img>
            </div>
            <div className='about-content-container'>
                <p className='about-content'>We are a direct to consumer CBD company that focuses on delivering the highest quality products for the best price possible. By cutting out the middle man and not doing business with retail outlets we are able to pass on massive savings to you.<br /><br />

                    We grow all of our hemp in Vermont with organic farming practices. We then extract that hemp with high quality ethanol extraction to ensure the most full spectrum product possible. We lab test and create the highest quality CBD  products available on site at the farm.<br /><br />

                    We look forward to serving you and providing you the highest quality CBD products on the market for the best value we can provide.

                </p>
            </div>
            <div className='contact-container'>
                <p>
                    We deeply value all feedback from our customers. If you have any questions or suggestions on how we can serve you better, please email us at <a className='email-link' href='mailto:greenmountainsynergy@gmail.com'>greenmountainsynergy@gmail.com</a> or call us at <a className='email-link' href='tel:802-282-3058'>802-282-3058</a>.<br /><br />
                    Interested in white labeling our products? Email us at <a className='email-link' href='mailto:greenmountainsynergy@gmail.com'>greenmountainsynergy@gmail.com</a> for more information. 
                </p>
                {/*<form onSubmit={sendContactEmail}>
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
                    <Button className='contact-button'>
                        Send
    </Button> 
                </form>*/}

            </div>
    
        </div>
    )
};

export default About;
