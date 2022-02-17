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

    const resetContactForm = () => {
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
    }

    const sendContactEmail = (e, errors) => {
        e.preventDefault();

        if (errors) {
            setErrorMessages(errors.map(error => error.message))
            return
        }

        apiInstance.post('/access', { contactEmail: contactEmail, contactName: contactName, contactSubject: contactSubject, contactMessage: contactMessage })
        resetContactForm()
        alert('Thanks for contacting us. We will get back to you shortly.');
    }

    return (
        <div className='about-container'>
            {/*<div className='about-image-container'>
                <img src='https://drive.google.com/uc?id=1HOjBrskLBXa6NpCnX6fVhOzL3Num39sS' alt='the-farm' className='about-image'></img>
            </div>*/}
            
            <div className='about-content-container'>
                <div className='bio-container'>
                    <div className='bio-title'>Grant Jakubowski-Owner</div> 
                    <img src='https://drive.google.com/uc?id=14WPvdVCnFRj8HiT5f9dMlTExe5xK84UT' alt='Grant' className='bio-pic' />
                    <p>I was born and raised in the amazing state of Vermont. After leaving the state briefly to attend college at the University of Rhode Island for horticulture, I returned back to Vermont to plant my roots. I have a deep passion for this state, sustainable farming, holistic practices and so much more. I feel blessed to have found what I consider my calling in this life. Through ethical businesses that are good for the planet, the people producing it, and the end consumer, I believe we can help to create a positive impact on this planet. This is my way of tending to the part of the garden that I can touch. I hope to inspire and help others find their own!</p>
                </div>
                <div className='bio-container'>
                    <div className='bio-title'>Koa aka Koabunga</div> 
                    <img src='https://drive.google.com/uc?id=1PrJ1QXwP7acowx4AWM_Niqzqf6BSxQV0' alt='Koa' className='bio-pic' />
                    <p>Meet Koa! He is the sweetest most sensitive boy ever! He absolutely loves working on the farm and greeting everyone who comes to visit(very enthusiastically I might add). He loves walks in the woods, going for rides, and playing with friends! As an homage to the Teenage Mutant Ninja Turtles he has earned the nickname “koabunga” and when he gets excited we refer to it as “Koabunga time”!</p>
                </div>
                <div className='bio-container'>
                    <div className='bio-title'>Otto aka Monsterman</div> 
                    <img src='https://drive.google.com/uc?id=11fbo5JfN8V-g6gXfiSfGYJE1olYSfR0g' alt='Otto' className='bio-pic' />
                    <p>Meet Otto! He is the newest addition to the farm. He loves his big brother koa more then anything! He is full of excitement, love, and a touch of mischief which makes him all the more fun! He loves cuddling next to the fire after a long day of playing with his friends. He is also a big time food enthusiast who has found deep love for foraging on the farm. He knows that if he sniffs around there's always something delicious he can find. His favorites are blueberries, strawberries, kale, corn, daikon radish, apples, carrots, cucumbers and when it gets harder to scavenge in the winter he settles for deer and rabbit droppings(tough being a scavenger in Vermont winters). His veracious appetite and spunky attitude has earned himself the nickname “ottoman” aka “monster man”!!!</p>
                </div>
            </div>
            <div className='contact-container'>
                <h2 className='message-title'>Contact Info</h2>
                <p>
                    We deeply value all feedback from our customers. If you have any questions or suggestions on how we can serve you better, please email us at <a className='email-link' href='mailto:greenmountainsynergy@gmail.com'>greenmountainsynergy@gmail.com</a> or call/text us at <a className='email-link' href='tel:802-282-3058'>802-282-3058</a>.<br /><br />
                    Interested in white labeling our products? Email us at <a className='email-link' href='mailto:greenmountainsynergy@gmail.com'>greenmountainsynergy@gmail.com</a> for more information.
                </p>
                <form onSubmit={sendContactEmail}>
                    <h2 className='message-title'>Send Us A Message!</h2>
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
                </form>

            </div>

        </div>
    )
};

export default About;
