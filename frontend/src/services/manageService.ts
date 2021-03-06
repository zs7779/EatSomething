import axios from 'axios';

import { restaurantType } from '../utils/types';
import loginService from './loginService';


const frontendURL = '/manage';
const backendURL = '/api/manage';

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

const updateOrderStatus = async (restaurantID: string, orderID: string, status: string) => {
  const response = await axios.put(`${backendURL}/restaurants/${restaurantID}/orders/${orderID}`, {status}, {
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

export default { addRestaurant, manageRestaurant, restaurantOrders, updateOrderStatus, routeToRestaurant };