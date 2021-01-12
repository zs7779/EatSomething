import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { orderBEType, orderItemBEType, restaurantType } from '../utils/types';
import manageService from '../services/manageService';
import orderService from '../services/orderService';
import OrderInfoCard from './OrderInfoCard';
import PlaceInfoCard from './PlaceInfoCard';
import '../css/ManagePanel.css';


function ManagePanel({restaurants}: {restaurants: restaurantType[]}) {
    const [ orders, setOrders ] = useState<orderBEType[]>([]);

    const handleOrderStatus = (order: orderBEType) => {
        console.log(order);
        
    }

    useEffect(() => {
        if (restaurants.length == 1 && restaurants[0].id) {
            manageService.restaurantOrders(restaurants[0].id)
                .then(res => {
                    setOrders(res);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        }
    }, [restaurants]);

    return (
        <div className={restaurants.length === 1 ? "manage-panel manage-panel-4" : "manage-panel manage-panel-3"}>
            <div></div>
            {restaurants.length !== 1 ? <div className="d-flex flex-wrap">{
                restaurants.map((restaurant) => (
                <Link to={manageService.routeToRestaurant(restaurant.id)} key={restaurant.id} className="manage-restaurant-link">
                <div className="card manage-restaurant-card m-2">
                    <div className="card-body">
                        <h5 className="card-title">{restaurant.name}</h5>
                        <div className="card-text">{restaurant.address}</div>
                    </div>
                </div>
                </Link>
            ))
            }</div> : <div>
                <h5>Orders:</h5>
                <div className="mt-2">
                    {orders.map(order => (
                        <div key={order.id} className="card manage-order-card m-2" onClick={()=>handleOrderStatus(order)}>
                            <OrderInfoCard order={order} title={`Order ${order.id}`} footer={`$${orderService.totalPrice(order)}`} />
                        </div>
                    ))}
                </div>
            </div>}
            {restaurants.length === 1 ? <div className="card card-body shadow-sm mt-3">
                <PlaceInfoCard restaurant={restaurants[0]} verbose={true} />
            </div> : <div></div>}
        </div>
    )
}
    
export default ManagePanel;