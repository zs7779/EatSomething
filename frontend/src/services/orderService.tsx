import axios from 'axios';

import loginService from './loginService';


const frontendURL = '/order';
const backendURL = 'http://localhost:3001/api/order';

const getAllOrders = async () => {
    return await axios.get(`${backendURL}/`, {
        headers: {
            Authorization: `bearer ${loginService.getToken()}`,
            "Content-type": "application/json"
        }
    });
}

const getOrder = async (id: string) => {
    return await axios.get(`${backendURL}/${id}`, {
        headers: {
            Authorization: `bearer ${loginService.getToken()}`,
            "Content-type": "application/json"
        }
    });
}

const routeToConfirmation = (id: string) => {
    return `${frontendURL}/${id}`;
}

export default { getAllOrders, getOrder, routeToConfirmation };