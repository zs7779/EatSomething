import axios from 'axios';

import { restaurantType } from '../utils/types';
import loginService from './loginService';


const baseUrl = 'http://localhost:3001/api/restaurant';

const getAllRestaurants = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
        "Content-type": "application/json"
    }
  });
  return response.data;
}

const getRestaurant = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
      headers: {
          "Content-type": "application/json"
      }
    });
    return response.data;
}

const searchRestaurantByKeywords = async (location: string, keywords: string) => {
  const response = await axios.get(`${baseUrl}/location/${location}/query/${keywords}`);
  return response.data;
}

export default { getAllRestaurants, getRestaurant, searchRestaurantByKeywords };