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

export default { getAllRestaurants };