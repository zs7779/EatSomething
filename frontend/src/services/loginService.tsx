import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login';

interface credentialType {
    username: string;
    password: string;
}

const login = async (credentials: credentialType) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

const storeToken = (token: string) => {
    window.localStorage.setItem('logintoken', JSON.stringify(token)); 
}

const getToken = () => {
    return window.localStorage.getItem('logintoken');
}

export default { login, storeToken, getToken };