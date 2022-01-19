import React, { useState, useEffect } from 'react';
import Input from '../../defaultComponents/Input';
import Button from '../../defaultComponents/Button';
import './customForm.css';

const CustomForm = ({ status, message, onValidated }) => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    useEffect(() => {
        if(status === "success") clearFields();
      }, [status])
    
      const clearFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
            firstName &&
            lastName &&
            email.indexOf("@") > -1 &&
            onValidated({
                EMAIL: email,
                MERGE1: firstName,
                MERGE2: lastName,
            });
    }

    return (
        <form className="mc__form" onSubmit={handleSubmit}>
            <h3 className="mc__title">
                {status === "success"
                    ? "Success!"
                    : "Join our email list for future updates."
                }</h3>
            {status === "sending" && (
                <div className="mc__alert mc__alert--sending">
                    sending...
                </div>
            )}
            {status === "error" && (
                <div
                    className="mc__alert mc__alert--error"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    className="mc__alert mc__alert--success"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}

            {status !== "success" ? (
                <div className="mc__field-container">
                    <div className="mc__field-container">
                    <Input
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="your@email.com"
                            
                        />
                        <Input
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            type="text"
                            value={firstName}
                            placeholder="Jane"
                           
                        />

                        <Input
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            type="text"
                            value={lastName}
                            placeholder="Doe"
                            
                        />

                        

                    </div>

                    <Button className='email-submit-button' type="submit">Submit</Button>
                    
                </div>
            ) : null}

            

        </form>
    );
};

export default CustomForm;
