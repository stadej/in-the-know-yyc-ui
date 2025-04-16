import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export async function sendEmailSubscription(subRequest) {
    const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

    const req = {
        email_address: subRequest.email,
        merge_fields: {
          FNAME: subRequest.firstName,
          LNAME: subRequest.lastName
        }
    };

    console.log('SUBSCRIPTION REQUEST:', req);

    try {
        const response = await axiosInstance.post(`${api_endpoint}/subscribe`, req);
        return (response.data.status === "pending") ? {type: 'success',message:'Thank you for subscribing to the In The Know YYC newsletter!'} : {type: 'error',message:'There was an error in the subscription. Please, try again later.'}
    } catch (error) {        
        const message = (error.response.data.message) ? parseErrorMessage(error.response.data.message) : 'There was an error in the subscription. Please try again later.';
        throw new Error("Error: " + message);
    }
}

export default sendEmailSubscription;

export function parseErrorMessage(text){
    if(text){
        const p1 = text.split('{');
        if(p1[1]){
            const p2 = p1[1].split('}');
            if(p2[0]){
                const info = JSON.parse("{"+p2[0]+"}");
                if(info.title){
                    return info.title;
                }
            }
        }
    }
    return text;
}