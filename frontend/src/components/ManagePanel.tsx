import React, { useEffect, useState } from 'react';

import { restaurantType } from '../utils/types';


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