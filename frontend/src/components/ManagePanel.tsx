import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { restaurantType } from '../utils/types';
import manageService from '../services/manageService';
import { RatingStar, PriceSign, OpenUntil } from './miniComponents';
import '../css/ManagePanel.css';


function ManagePanel({restaurants}: {restaurants: restaurantType[]}) {
    return (
        <div className="d-flex flex-wrap">
            {restaurants.length !== 1 ? restaurants.map((restaurant) => (
                <Link to={manageService.routeToRestaurant(restaurant.id)} key={restaurant.id}>
                <div className="card manage-restaurant-card m-2">
                    <div className="card-body">
                        <h5 className="card-title">{restaurant.name}</h5>
                        <div className="card-text">{restaurant.address}</div>
                    </div>
                </div>
                </Link>
            )) : 
            <div>
                <h4>{restaurants[0].name}</h4>
                <span>{restaurants[0].address}</span><br/>
                <span>Open today: </span><OpenUntil openingTime={restaurants[0].opening_time} /><br/>
                <span>Rating: </span><RatingStar rating={restaurants[0].rating as number} /><span>({restaurants[0].user_ratings_total})</span>
            </div>}
        </div>
    )
}
    
export default ManagePanel;