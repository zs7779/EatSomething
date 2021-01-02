import axios from 'axios';

import { restaurantType } from '../utils/types';
import loginService from './loginService';


const baseUrl = 'http://localhost:3001/api/manage';

const addRestaurant = async (businessInfo: restaurantType) => {
  const response = await axios.post(`${baseUrl}/restaurants`, businessInfo, {
    headers: {
        Authorization: `bearer ${loginService.getToken()}`,
        "Content-type": "application/json"
    }
  });
  return response.data;
}

const getManager = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
        Authorization: `bearer ${loginService.getToken()}`,
        "Content-type": "application/json"
    }
  });
  return response.data;
}

export default { addRestaurant, getManager };