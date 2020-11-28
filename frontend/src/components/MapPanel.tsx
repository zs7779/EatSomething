import React, { useState, useEffect } from 'react';
import { mapQueryType, mapLocationType } from '../utils/types';


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

    useEffect(() => {
        if (mapElement) {
            const map = new google.maps.Map(mapElement, {
                center: oldLocation,
                zoom: 13,
            });
            google.maps.event.addListener(map, 'center_changed', function () {
                // Everytime map center change
                const newCenter = map.getCenter();
                setLocation(newCenter.toJSON());
            });
            const service = new google.maps.places.PlacesService(map);
            if (keyword !== oldKeyword) {
                console.log("keyword change");
                const readyListener = google.maps.event.addListener(map, 'idle', function () {
                    searchNearby(map, service, keyword);
                    google.maps.event.removeListener(readyListener);
                });    
            } else {
                console.log("other change");
                const readyListener = google.maps.event.addListener(map, 'idle', function () {
                    searchGeocodeAddress(map, service, keyword, location, address)
                    google.maps.event.removeListener(readyListener);
                });
            }
            setKeyword(keyword);
        }
    }, [keyword, location, address, mapElement]);

    return (
        <div id="map" style={mapStyle}></div>
    );
}

const mapStyle = {
    height: '90vh'
};

export default MapPanel;