import { useEffect } from 'react';
import sendEmailSubscription from '../api/newsletter'

// Set event listener "submit" in the form
const useSubscriptionValidation = (setIsDisabled, setErrorMessage, setSuccessMessage) => {
    useEffect(() => {
        const newsletterForm = document.getElementById('FooterForm');
        const newsletterInput = document.getElementById('FooterEmail');

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


        // FORM VALIDATION AND LISTENER
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (event) => {
                event.preventDefault();


                if (newsletterInput.value.length === 0) {
                    // Validate not empty value
                    emptyValue(setIsDisabled, setErrorMessage);
                    return;
                } else if (!emailRegex.test(newsletterInput.value)) {
                    // Validate email format
                    wrongFormat(setIsDisabled, setErrorMessage);
                    return;
                }

                // VALIDATIONS PASSED

                // NO FORM SUBMIT, ONLY MESSAGE
                sendSubscription(newsletterInput.value, setErrorMessage, setSuccessMessage);
                
            });
        }

        if (newsletterInput) {
            newsletterInput.addEventListener('keyup', () => {
                if (emailRegex.test(newsletterInput.value)) {
                    setErrorMessage('');
                    setIsDisabled(false);
                } else {
                    wrongFormat(setIsDisabled, setErrorMessage);
                    setIsDisabled(true);
                }
            })
            newsletterInput.addEventListener('blur', () => {
                if (newsletterInput.value === '') {
                    setErrorMessage('');
                    setIsDisabled(true);
                }
            })
        }
    });
};

const emptyValue = (setIsDisabled, setErrorMessage) => {
    setErrorMessage('This field is required');
    setIsDisabled(true);
}

const wrongFormat = (setIsDisabled, setErrorMessage) => {
    setErrorMessage('Please enter a valid email address');
    setIsDisabled(true);
}

const sendSubscription = async (email, setErrorMessage, setSuccessMessage) => {
    const rs = await sendEmailSubscription(email);
    if(rs.type === 'error'){
        setErrorMessage(rs.message);
    }
    if(rs.type === 'success'){
        setSuccessMessage(rs.message);
    }
}

export default useSubscriptionValidation;