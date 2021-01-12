import axios from 'axios';

import { restaurantType } from '../utils/types';
import loginService from './loginService';


const frontendURL = '/manage';
const backendURL = 'http://localhost:3001/api/manage';

const addRestaurant = async (businessInfo: restaurantType) => {
  const response = await axios.post(`${backendURL}/restaurants`, businessInfo, {
    headers: {
        Authorization: `bearer ${loginService.getToken()}`,
        "Content-type": "application/json"
    }
  });
  return response.data;
}

const manageRestaurant = async (restaurantID?: string) => {
  const path = restaurantID ? `${backendURL}/restaurants/${restaurantID}` : backendURL;
  const response = await axios.get(path, {
    headers: {
        Authorization: `bearer ${loginService.getToken()}`,
        "Content-type": "application/json"
    }
  });
  return response.data;
}

const restaurantOrders = async (restaurantID: string) => {
  const response = await axios.get(`${backendURL}/restaurants/${restaurantID}/orders`, {
    headers: {
        Authorization: `bearer ${loginService.getToken()}`,
        "Content-type": "application/json"
    }
  });
  return response.data;
}

const routeToRestaurant = (id?: string) => {
  return `${frontendURL}/${id}`;
}

export default { addRestaurant, manageRestaurant, restaurantOrders, routeToRestaurant };