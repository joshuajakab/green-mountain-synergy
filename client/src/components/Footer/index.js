import { CKEditor } from 'ckeditor4-react';
import React, { useState } from 'react';
import Button from '../defaultComponents/Button';
import FormInput from '../defaultComponents/Input';
import TextArea from '../defaultComponents/Textarea';
import './styles.css';

const Footer = props => {

    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    return (
        <div className='footer'>
            <div className='contact-container'>
                <form>
                    <FormInput
                        label='Your Name'
                        type='text'
                    />
                    <FormInput
                        label='Your Email'
                        type='email'
                    />
                    <FormInput
                        label='Subject'
                        type='text'
                    />
                    {/*<CKEditor
                        className='editor'
                        onChange={evt => setContactMessage(evt.editor.getData())}
                    /> */}
                    <TextArea
                        label='Message'
                        /*onChange={evt => setContactMessage(evt.editor.getData())}*/
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
