import React, { useEffect, useState } from 'react';
import axios from "axios";

import { restaurantType } from '../utils/types';


const base_url = "http://localhost:3001";

function ManagePanel({restaurants}: {restaurants: restaurantType[]}) {
    return (
        <div>
            {restaurants.map((restaurant) => (
                <div key={restaurant.name}>
                    {restaurant.name}
                </div>
            ))}
        </div>
    )
}
    
export default ManagePanel;