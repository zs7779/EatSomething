import axios from 'axios';

import {restaurantType} from '../utils/types';
import loginService from './loginService';


const baseUrl = 'http://localhost:3001/api/business';

const addBusiness = async (businessInfo: restaurantType) => {
  const response = await axios.post(baseUrl, businessInfo, {
    headers: {
        Authorization: loginService.getToken(),
        "Content-type": "application/json"
    }
  });
  return response.data;
}


export default { addBusiness };