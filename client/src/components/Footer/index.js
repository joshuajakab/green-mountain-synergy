import { CKEditor } from 'ckeditor4-react';
import React, { useState } from 'react';
import Button from '../defaultComponents/Button';
import FormInput from '../defaultComponents/Input';
import TextArea from '../defaultComponents/Textarea';
import { apiInstance } from '../../Utils';
import './styles.css';

const Footer = props => {

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
        <div className='footer'>
            <div className='contact-container'>
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
                    {/*<CKEditor
                        className='editor'
                        onChange={evt => setContactMessage(evt.editor.getData())}
                    /> */}
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
            <div className='social-media-container'>

            </div>
        </div>
    )
};

export default Footer;
