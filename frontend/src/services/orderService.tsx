import axios from 'axios';

import loginService from './loginService';
import { orderBEType, orderItemBEType } from '../utils/types';


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

const totalPrice = (order: orderBEType) => {
    return order.items.reduce((prevValue: number, currItem: orderItemBEType) => {
        return prevValue + currItem.quantity * currItem.price;
    }, 0).toFixed(2);
}

export default { getAllOrders, getOrder, routeToConfirmation, totalPrice };