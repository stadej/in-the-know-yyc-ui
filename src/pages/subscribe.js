import { useState } from 'react';
import { Input } from "@nextui-org/input";

import "../app/styles/pages/subscribe.css";

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";

import sendEmailSubscription from "../api/newsletter";

export default function Subscribe({metadata}) {

    // Data validation in newsletter form
    const [validateForm, setValidateForm] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [subRequest, setSubRequest] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });

    // useFooterNewsletterValidation(setIsDisabled, setErrorMessage, setSuccessMessage);

    const emailValidation = (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(email === ''){
            return("This field is Required");
        }
        else if(!emailRegex.test(email)){
            return("Please enter a valid email");
        }
        else{
            return("valid");
        }
    }

    /**
     * Handles the newsletter subscription form submission.
     * @param {Event} event - The form submission event.
     */
    const handleSubscribe = async (event) => {

        event.preventDefault();

        console.log(subRequest.email);

        if(emailValidation(subRequest.email) !== "valid"){ 
            return; 
        }

        try{
            const response = await sendEmailSubscription(subRequest);
            console.log('SUCCESS:', subRequest.email, response)
            setResponseMessage(response.message);
        }
        catch(error){
            console.error('FAILURE:', subRequest.email, error)
            setResponseMessage(error.message);
        }

        document.getElementById('subscribeForm').classList.add('closed');
        document.getElementById('subscriptionFormMessage').classList.add('opened')
    };

    return (
        <>
            <PagesMetaData metadata={metadata} />
            <main id="subscribe">
                <h1>Subscribe to our Newsletter!</h1>
                <h2>Recieve weekly updates for Tech and Business events in Calgary</h2>
                <div className="subscribeFormContainer">
                    <form onSubmit={(e) => {setValidateForm(true), handleSubscribe(e)}}  id='subscribeForm'>
                        <Input
                            id='subscriptionEmail'
                            label="Email Address" 
                            value={subRequest.email} 
                            onChange={(e) => {setSubRequest({...subRequest, email: e.target.value})}} 
                            isRequired 
                            isInvalid={(validateForm && emailValidation(subRequest.email) !== "valid")} 
                            errorMessage={emailValidation(subRequest.email)}
                            labelPlacement="outside"
                            placeholder="placeholder@email.com"
                            className="formInput"
                            classNames={{
                                mainWrapper: "inputContact-mainWrapper",
                                innerWrapper: "inputContact-innerWrapper",
                                inputWrapper: "inputContact-inputWrapper"
                            }}/>
                        <Input
                            label="First Name" 
                            value={subRequest.firstName} 
                            onChange={(e) => {setSubRequest({...subRequest, firstName: e.target.value})}} 
                            labelPlacement="outside"
                            placeholder="First"
                            className="formInput"
                            classNames={{
                                mainWrapper: "inputContact-mainWrapper",
                                innerWrapper: "inputContact-innerWrapper",
                                inputWrapper: "inputContact-inputWrapper"
                            }}/>
                        <Input
                            label="Last Name" 
                            value={subRequest.lastName} 
                            onChange={(e) => {setSubRequest({...subRequest, lastName: e.target.value})}} 
                            labelPlacement="outside"
                            placeholder="Last"
                            className="formInput"
                            classNames={{
                                mainWrapper: "inputContact-mainWrapper",
                                innerWrapper: "inputContact-innerWrapper",
                                inputWrapper: "inputContact-inputWrapper"
                            }}/>
                        <button type="submit" >Subscribe</button>
                    </form>

                    <div id="subscriptionFormMessage">
                        {responseMessage}
                    </div>
                </div>
            </main >
        </>
    );
};

export async function getServerSideProps() {
    const metadata = await pagesMetaData('subscribe')
    return { props: { metadata } };
}