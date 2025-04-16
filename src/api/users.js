import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';


const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

export const login = async (user, pass) => {
  try {
    const response = await axios.post(`${api_endpoint}/cms/login`, { email: user, password: pass });
    console.log(response);
    localStorage.setItem('authToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return { type: 'success', message: 'Login successful!' }
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return { type: 'error', message: 'There was an unexpected error during login. Please try again later.' };
  }
}

export const logout = async () => {
  try {
    const response = await axios.post(`${api_endpoint}/cms/logout`);
    console.log(response);
    localStorage.clear();
    return { type: 'success', message: 'Logout successful!' }
  } catch (error) {
    console.error('LOGOUT ERROR:', error);
    return { type: 'error', message: 'There was an unexpected error during logout. Please try again later.' };
  }
}

export const refreshToken = async () => {
  try{
    const token = localStorage.getItem('refreshToken');
    const response = await axios.post(`${api_endpoint}/cms/refresh-token?token=${token}`);
    localStorage.setItem('authToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    console.log('TOKENS REFESHED SUCCESFULLY', response);
    return { type: 'success', message: 'Tokens refreshed successfully', data: response.data }
  }catch (error){
    console.error('TOKEN REFRESH ERROR:', error);
    return { type: 'error', message: 'Unable to refresh the token. User will be logged out' };
  }
}

export const validateToken = async() => {
  const token = localStorage.getItem('authToken');token
  if (token){
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < new Date().getTime()) {
      console.log('Time Expired');
      await logout();
    }
  }
}

export const getUserByToken = async () => {
  const tokenParts = localStorage.getItem('authToken').split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  const userEmail = payload.sub;

  try {
    const user = await axiosInstance.get(`${api_endpoint}/users/email/${userEmail}`);
    console.log('USER:', user)
    if (user) {
      localStorage.setItem('userId', user.data.id);
      localStorage.setItem('userEmail', user.data.email);
      localStorage.setItem('userName', user.data.fullName);
      localStorage.setItem('userRole', user.data.role);
      return true
    } else {
      return false;
    }
  } catch (error) {
    console.error('GET USER BY TOKEN EMAIL ERROR:', error);
    return false;
  }
}
