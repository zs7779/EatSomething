import React, { useState, useEffect } from 'react';
import { mapQueryType, mapLocationType } from '../utils/types';


function searchGeocodeAddress(
    map: google.maps.Map,
    service: google.maps.places.PlacesService,
    keyword: string, setMarkers: (m: google.maps.Marker[])=>void,
    location?: mapLocationType,
    address?: string,
): void {
    const readyListener = google.maps.event.addListener(map, 'idle', function () {
        searchNearby(map, service, keyword, setMarkers)
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
                      keyword: string, setMarkers: (m: google.maps.Marker[])=>void) {
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
            setMarkers(results
                .filter(restaurant => restaurant.geometry && restaurant.name)
                .map(restaurant => new google.maps.Marker({
                        position: restaurant?.geometry?.location,
                        map,
                        title: restaurant.name,
                    })
                ))
        }
    );
}

function clearMarker(markers: google.maps.Marker[] | undefined,
                     setMarkers: (m: google.maps.Marker[])=>void) {
    if (markers) {
        setMarkers(markers.map(m => {
            m.setMap(null);
            return m;
        }));
        console.log("Markers cleared");
    } else {
        console.log("No marker");
    }
}

function MapPanel({keyword, location, address} : mapQueryType) {
    const [ map, setMap ] = useState<google.maps.Map>();
    const [ service, setService ] = useState<google.maps.places.PlacesService>();
    const [ markers, setMarkers ] = useState<google.maps.Marker[]>([]);
    const [ mapReady, setReady ] = useState<boolean>(false);
    const mapElement = document.getElementById("map");

    useEffect(() => {
        // Initialize map only once
        if (mapElement) {
            const mapObj = new google.maps.Map(mapElement, {
                zoom: 13,
            });
            const readyListener = google.maps.event.addListener(mapObj, 'idle', function () {
                if (!mapReady) {
                    setReady(true);
                    console.log("Map ready");
                }
                google.maps.event.removeListener(readyListener);
            });
            setMap(mapObj);
            setService(new google.maps.places.PlacesService(mapObj));
            console.log("Map initialized");
        } else {
            console.log("Map element missing");
        }
    }, [mapElement]);

    useEffect(() => {
        if (mapReady && map && service) {
            clearMarker(markers, setMarkers);
            searchGeocodeAddress(map, service, keyword, setMarkers, location, address);
        }
    }, [location, address, mapReady]);
    
    useEffect(() => {
        if (mapReady && map && service) {
            clearMarker(markers, setMarkers);
            searchNearby(map, service, keyword, setMarkers)
        }
    }, [keyword]);

    return (
        <div id="map" style={mapStyle}></div>
    );
}

const mapStyle = {
    height: '90vh'
};

export default MapPanel;