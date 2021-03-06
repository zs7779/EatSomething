import React from 'react';
import { restaurantType } from '../utils/types';

import { RatingStar, PriceSign, OpenUntil } from './miniComponents';


function PlaceInfoCard({restaurant, verbose}: {restaurant: restaurantType, verbose: boolean}) {
    if (verbose) {
        return (
            <>
                <h5>Info</h5>
                <h6>{restaurant.name}</h6>
                <div>
                    <a href={`https://www.google.ca/maps/dir//${restaurant.address}`}>
                    <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${restaurant.location.lat},${restaurant.location.lng}&markers=${restaurant.location.lat},${restaurant.location.lng}&zoom=13&size=286x200&key=${process.env.REACT_APP_MAP_API_KEY}`} />
                    </a>
                </div>
                <div className="font-weight-bold mt-3">Location</div>
                <div>{restaurant.address}</div>
                <div className="font-weight-bold mt-3">Hours of Operation</div>
                <div><OpenUntil openingTime={restaurant.opening_time}/></div>
                <div className="font-weight-bold mt-3">Cuisine</div>
                <div>{restaurant.keywords ? restaurant.keywords.join(", ") : "Not available"}</div>
                <div className="font-weight-bold mt-3">Payment Options</div>
                <div>{restaurant.payment ? restaurant.payment.join(", ") : "Not available"}</div>
            </>
        );
    } else {
        return (
            <div className="p-3">
                <h6>{restaurant.name}</h6>
                <RatingStar rating={restaurant.rating as number} className="small text-muted"/>
                <small className="text-muted">({restaurant.user_ratings_total})</small> · <PriceSign priceLevel={restaurant.price_level as number} className="small text-muted"/><br/>
                {restaurant.keywords && <small className="text-muted">{restaurant.keywords.join(" · ")}</small>}<br/>
                <small className="text-muted">{restaurant.address}</small><br/>
                <OpenUntil openingTime={restaurant.opening_time} className="small text-muted"/><br/>
            </div>
        );
    }
}

export default PlaceInfoCard;