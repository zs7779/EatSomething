import React from 'react';
import { restaurantType } from '../utils/types';

import { RatingStar, PriceSign, OpenUntil } from './miniComponents';


function PlaceInfoCard({restaurant}: {restaurant: restaurantType}) {
    return (
        <div className="p-3">
            <h6>{restaurant.name}</h6>
            <RatingStar rating={restaurant.rating as number} className="small text-muted"/>
            <small className="text-muted">({restaurant.user_ratings_total})</small> · <PriceSign priceLevel={restaurant.price_level as number} className="small text-muted"/><br/>
            <small className="text-muted">{restaurant.keywords.join(" · ")}</small><br/>
            <small className="text-muted">{restaurant.address}</small><br/>
            <OpenUntil openingTime={restaurant.opening_time} className="small text-muted"/><br/>
        </div>
    )
}

export default PlaceInfoCard;