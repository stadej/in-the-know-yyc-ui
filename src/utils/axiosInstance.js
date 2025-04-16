import axios from 'axios';
import { refreshToken } from '@/api/users';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    // throw error

    if (!error.response) {
      throw error;
    }
    console.error('Error status: ', error.response.status);
    // Did it fail due to an authorization problem (aka tokens, aka 401)?
    if (error.response.status !== 401) {
      throw error;
    } else {
      // This checks if refreshTokens() failed and if it failed, log out user.
      console.error('Authentication Error, Attempting to refresh token ',error.response)

      // Refresh the token from the session storage
      try{
        const tokenResponse = await refreshToken();
        console.log(tokenResponse.data.accessToken);
        error.response.config.headers.Authorization = `Bearer ${tokenResponse.data.accessToken}`;
        //error.response.config.baseURL = process.env.REACT_APP_API_URL;
        console.log('Attempting to retry the api call: ', error.response.config);
        return axios(error.response.config);
      }catch(e){
        console.error('Error in refresh:', e);
        localStorage.clear();
        throw error;
      }
    }
  }
);

axiosInstance.interceptors.request.use(
  async (config) => {
      const token = localStorage.getItem("authToken");

      // If token is present, add it to request's Authorization Header
      if (token) {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
      }
      return config;
  },
  (error) => {
      console.error('ERROR ON AXIOS INTERCEPTOR:',error)
      // Handle request errors here
      return Promise.reject(error);
  }
);
  
export default axiosInstance;