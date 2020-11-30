import React, { useState, useEffect } from 'react';
import { mapQueryType, mapLocationType } from '../utils/types';
import '../css/MapPanel.css'


function searchGeocodeAddress(
    map: google.maps.Map,
    service: google.maps.places.PlacesService,
    keyword: string,
    location?: mapLocationType,
    address?: string,
): void {
    const readyListener = google.maps.event.addListener(map, 'idle', function () {
        searchNearby(map, service, keyword)
        google.maps.event.removeListener(readyListener);
    });
    if (location) {
        // If location given, do not use geocode
        map.setCenter(location);
        map.setZoom(13);
    } else if (address) {
        // Create boundry to limit geocode search
        const mapCenter = map.getCenter();
        const searchBounds = mapCenter ? new google.maps.LatLngBounds(
            {lat: mapCenter.lat()-1, lng: mapCenter.lng()-1}, {lat: mapCenter.lat()+1, lng: mapCenter.lng()+1}) : undefined;
        
        // Geocode service
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address, bounds: searchBounds }, (results, status) => {
            console.log("Geocode", status);
            if (status === "OK") {
                map.setCenter(results[0].geometry.location);
                // map.fitBounds(results[0].geometry.bounds);
                map.setZoom(13);
            }
        });
    } else {
        console.log("Location not provided");
    }
}

function searchNearby(map: google.maps.Map, service: google.maps.places.PlacesService,
                      keyword: string) {
    const query: google.maps.places.PlaceSearchRequest = {
        location: map.getCenter(),
        bounds: map.getBounds() || undefined,
        type: 'restaurant', keyword: keyword
    };
    // Search nearby
    service.nearbySearch(
        query,
        (results, status) => {
            console.log("NearbySearch", status);
            if (status !== "OK") return;
            
            results
                .filter(restaurant => restaurant.geometry && restaurant.name)
                .map(restaurant => new google.maps.Marker({
                        position: restaurant?.geometry?.location,
                        map,
                        title: restaurant.name,
                    })
                )
        }
    );
}

function MapPanel({keyword, location, address} : mapQueryType) {
    const [ oldKeyword, setKeyword ] = useState(keyword);
    const [ oldLocation, setLocation ] = useState(location);
    const mapElement = document.getElementById("map");

    const business = {
        name: "Pizza Pizza", // .name
        address: "8601 Warden Ave Unit #1B, Unionville", //.vicinity
        location: {lat: 43.8579871, lng: -79.3319334}, //geometry?.location
        opening_time: "09:00-21:30,09:00-21:30,09:00-21:30,09:00-21:30,09:00-21:30,09:00-21:30,09:00-21:30", //generate
        types: ["Pizza", "Italian", "Fast food"], //generate
        dine_in: true, //generate
        takeaway: true, //generate
        delivery: true, //generate
        price_level: 2, //generate
        rating: 3.6, //generate
        user_ratings_total: 296, //generate
    };
    const ratingStar = (rating: number) => {
        const intPart: number = Math.floor(rating);
        const decimalPart: number = rating - intPart;
        const stars: JSX.Element[] = [];
        for (let i = 0; i < intPart; i++) {
            stars.push(<i className="fas fa-star"></i>);
        }
        if (decimalPart >= 0.75) {
            stars.push(<i className="fas fa-star"></i>);
        } else if (decimalPart >= 0.25) {
            stars.push(<i className="fas fa-star-half"></i>);
        }
        return <>
            <small className="text-muted">{rating}</small> <small className="text-warning">{stars}</small>
        </>;
    };
    const priceSign = (priceLevel: number) => {
        return <small className="text-muted">{"$".repeat(priceLevel)}</small>;
    };
    const openUntil = (openingTime: string) => {
        const d = new Date().getDay();
        const time = openingTime.split(",")[d];
        return <small className="text-muted">{time}</small>;
    };

    // useEffect(() => {
    //     if (mapElement) {
    //         const map = new google.maps.Map(mapElement, {
    //             center: oldLocation,
    //             zoom: 13,
    //         });
    //         google.maps.event.addListener(map, 'center_changed', function () {
    //             // Everytime map center change
    //             const newCenter = map.getCenter();
    //             setLocation(newCenter.toJSON());
    //         });
    //         const service = new google.maps.places.PlacesService(map);
    //         if (keyword !== oldKeyword) {
    //             console.log("keyword change");
    //             const readyListener = google.maps.event.addListener(map, 'idle', function () {
    //                 searchNearby(map, service, keyword);
    //                 google.maps.event.removeListener(readyListener);
    //             });    
    //         } else {
    //             console.log("other change");
    //             const readyListener = google.maps.event.addListener(map, 'idle', function () {
    //                 searchGeocodeAddress(map, service, keyword, location, address)
    //                 google.maps.event.removeListener(readyListener);
    //             });
    //         }
    //         setKeyword(keyword);
    //     }
    // }, [keyword, location, address, mapElement]);

    return (
        <div className="map-panel">
            <div id="searchResult">
                <ul className="list-group">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(n => 
                    <li key={n} className="list-group-item info-card">
                        <h6>{business.name}</h6>
                        {ratingStar(business.rating)}
                        <small className="text-muted">({business.user_ratings_total})</small> · {priceSign(business.price_level)}<br/>
                        <small className="text-muted">{business.types.join(" · ")}</small><br/>
                        <small className="text-muted">{business.address}</small><br/>
                        {openUntil(business.opening_time)}<br/>
                        {/* {business.dine_in && <button type="button" className="btn btn-danger mx-1">Dine-in</button>}
                        {business.takeaway && <button type="button" className="btn btn-danger mx-1">Takeout</button>}
                        {business.delivery && <button type="button" className="btn btn-danger mx-1">Delivery</button>} */}
                    </li>)}
                </ul>
            </div>
            <div id="map" />
        </div>
    );
}



export default MapPanel;