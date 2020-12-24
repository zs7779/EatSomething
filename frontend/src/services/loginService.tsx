import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login';

interface credentialType {
    username: string;
    password: string;
}

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
  console.log(token);
  
  window.localStorage.setItem('logintoken', token);  
}

const getToken = () => {
  return window.localStorage.getItem('logintoken');
}

export default { login, logout, storeToken, getToken };