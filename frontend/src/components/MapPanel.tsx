import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { Link, useHistory } from "react-router-dom";

import { mapLocationType, restaurantType } from '../utils/types';
import PlaceInfoCard from './PlaceInfoCard';
import restaurantService from '../services/restaurantService';
import '../css/MapPanel.css';


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
    const history = useHistory();
    const mapElement = document.getElementById("map");
    const [ errorMessage, setErrorMessage ] = useState<string>();

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
                const newMarker = new google.maps.Marker({
                    position: restaurant.location,
                    map: newMap,
                    title: restaurant.name,
                });
                const infowindow = new google.maps.InfoWindow({
                    content: "",
                });
                newMarker.addListener("mouseover", () => {
                    const content = renderToString((<PlaceInfoCard restaurant={restaurant} verbose={false} />));
                    infowindow.setContent(content);
                    infowindow.open(newMap, newMarker);
                });
                newMarker.addListener("mouseout", () => {
                    infowindow.close();
                });
                newMarker.addListener("click", () => {
                    history.push(`${restaurantService.routeToRestaurant(restaurant.id)}`);
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

    // search restaurants at location
    useEffect(() => {
        setErrorMessage(undefined);
        if (location) {
            if (keyword === oldKeyword && location === oldLocation) return;
            
            restaurantService.searchRestaurantByKeywords(`${location.lat},${location.lng}`, keyword)
                .then((res) => {
                    setRestaurants(res);
                    setOldKeyword(keyword);
                    setOldLocation(location);
                })
                .catch(err => {
                    setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
                });
        }
    }, [locationQuery, address, keyword]);

    return (
        <div className="map-panel">
            <div id="searchResult">
                {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
                <ul className="list-group">
                    {restaurants.map(restaurant => 
                    <li key={restaurant.id} className="list-group-item info-card p-0">
                        <Link to={restaurantService.routeToRestaurant(restaurant.id)}>
                            <PlaceInfoCard restaurant={restaurant} verbose={false} />
                        </Link>
                    </li>)}
                </ul>
            </div>
            <div id="map" />
        </div>
    );
}


export default MapPanel;