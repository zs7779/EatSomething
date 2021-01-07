import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { mapLocationType, restaurantType } from '../utils/types';
import { RatingStar, PriceSign, OpenUntil } from './miniComponents';
import restaurantService from '../services/restaurantService';
import '../css/MapPanel.css';


// function searchNearby(map: google.maps.Map, restaurants: restaurantType[]) {
//     const readyListener = google.maps.event.addListener(map, 'idle', function () {
//         restaurants.map(restaurant => new google.maps.Marker({
//             position: restaurant.location,
//             map,
//             title: restaurant.name,
//         }));
//         google.maps.event.removeListener(readyListener);
//     });
// }

function geocodeAddress(
    map: google.maps.Map,
    address: string,
    setLocation: (arg0: mapLocationType) => void
): void {
    // Create boundry to limit geocode search
    const mapCenter = map.getCenter();
    const searchBounds = mapCenter ? new google.maps.LatLngBounds(
        {lat: mapCenter.lat()-1, lng: mapCenter.lng()-1}, {lat: mapCenter.lat()+1, lng: mapCenter.lng()+1}) : undefined;
    // Geocode service
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address, bounds: searchBounds }, (results, status) => {
        console.log("Geocode", status);
        if (status === "OK") {
            setLocation(results[0].geometry.location.toJSON());
        }
    });
}

function MapPanel({keyword, location, locationQuery, address, setLocation} : {
    keyword: string,
    location?: mapLocationType,
    locationQuery: string,
    address: string,
    setLocation: (arg0: mapLocationType)=>void;
}) {
    const [ oldKeyword, setOldKeyword ] = useState("");
    const [ oldLocation, setOldLocation ] = useState({});
    const [ map, setMap ] = useState<google.maps.Map>();
    const [ restaurants, setRestaurants ] = useState<restaurantType[]>([]);
    const mapElement = document.getElementById("map");

    useEffect(() => {
        if (mapElement) {
            const newMap = new google.maps.Map(mapElement, {
                center: location,
                zoom: 13,
            });
            google.maps.event.addListener(newMap, 'center_changed', function () {
                // Everytime map center change
                const newCenter = newMap.getCenter().toJSON();                
                setLocation(newCenter);
            });
            restaurants.map(restaurant => {
                return new google.maps.Marker({
                    position: restaurant.location,
                    map: newMap,
                    title: restaurant.name,
                });
            });
            setMap(newMap);
        }
    }, [mapElement, restaurants]);

    useEffect(() => {
        if (map && address) {
            geocodeAddress(map, address, setLocation);
        }
    }, [map, locationQuery, address]);

    // queryLocation to directly query location, queryAddress geocoded to location coordinates
    // search restaurants at location
    useEffect(() => {        
        if (location) {
            if (keyword === oldKeyword && location === oldLocation) return;
            console.log(keyword, location);
            
            restaurantService.searchRestaurantByKeywords(`${location.lat},${location.lng}`, keyword)
                .then((res) => {
                    console.log(res);
                    setRestaurants(res);
                    setOldKeyword(keyword);
                    setOldLocation(location);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        }
    }, [locationQuery, address, keyword]);

    return (
        <div className="map-panel">
            <div id="searchResult">
                <ul className="list-group">
                    {restaurants.map(restaurant => 
                    <li key={restaurant.id} className="list-group-item info-card p-0">
                        <Link to={`/place/${restaurant.id}`}><div className="p-3">
                            <h6>{restaurant.name}</h6>
                            <RatingStar rating={restaurant.rating as number} className="small text-muted"/>
                            <small className="text-muted">({restaurant.user_ratings_total})</small> · <PriceSign priceLevel={restaurant.price_level as number} className="small text-muted"/><br/>
                            <small className="text-muted">{restaurant.keywords.join(" · ")}</small><br/>
                            <small className="text-muted">{restaurant.address}</small><br/>
                            <small>{restaurant.location.lat},{restaurant.location.lng}</small><br/>
                            <OpenUntil openingTime={restaurant.opening_time} className="small text-muted"/><br/>
                        </div></Link>
                    </li>)}
                </ul>
            </div>
            <div id="map" />
        </div>
    );
}


export default MapPanel;