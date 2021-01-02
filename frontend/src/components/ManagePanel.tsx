import React, { useEffect, useState } from 'react';

import { restaurantType } from '../utils/types';
import '../css/ManagePanel.css';


function ManagePanel({restaurants}: {restaurants: restaurantType[]}) {
    return (
        <div className="d-flex flex-wrap">
            {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="card manage-restaurant-card m-2">
                    <div className="card-body">
                        <h5 className="card-title">{restaurant.name}</h5>
                        <div className="card-text">{restaurant.address}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
    
export default ManagePanel;