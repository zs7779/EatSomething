import axios from 'axios';
import {credentialType} from '../utils/types';


const baseUrl = '/api/login';

const login = async (credentials: credentialType) => {
  const response = await axios.post(baseUrl, credentials, {
    headers: {
        "Content-type": "application/json"
    }
  });
  return response.data;
}

const logout = () => {
  window.localStorage.removeItem('logintoken');
}

const storeToken = (token: string) => {   
  window.localStorage.setItem('logintoken', token);  
}

const getToken = () => {
  return window.localStorage.getItem('logintoken');
}

const checkToken = async () => {
  const response = await axios.post(baseUrl, {}, {
    headers: {
        Authorization: `bearer ${getToken()}`,
        "Content-type": "application/json"
    }
  });
  return response.data;
}

export default { login, logout, storeToken, getToken, checkToken };