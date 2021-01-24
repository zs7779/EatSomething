import axios from 'axios';

import loginService from './loginService';
import { orderItemType, orderBEType, orderItemBEType } from '../utils/types';


const frontendURL = '/order';
const backendURL = '/api/order';

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

const placeOrderAtRestaurant = async (id: string, items: orderItemType[]) => {
    // id is restaurant id
    const response = await axios.post(`${backendURL}/`, {
        id,
        items
    },
    {
        headers: {
            Authorization: `bearer ${loginService.getToken()}`,
            "Content-type": "application/json"
        }
    });
    return response.data;
}

const rateOrder = async (id: string, rating: number) => {
    const response = await axios.post(`${backendURL}/${id}`, {
        rating
    },
    {
        headers: {
            Authorization: `bearer ${loginService.getToken()}`,
            "Content-type": "application/json"
        }
    });
    return response.data;
}

const routeToConfirmation = (id: string) => {
    return `${frontendURL}/${id}`;
}

const totalPrice = (order: orderBEType) => {
    return order.items.reduce((prevValue: number, currItem: orderItemBEType) => {
        return prevValue + currItem.quantity * currItem.price;
    }, 0).toFixed(2);
}

export default { getAllOrders, getOrder, rateOrder, placeOrderAtRestaurant, routeToConfirmation, totalPrice };