import React, { useState, useEffect } from 'react';
import { mapQueryType, mapLocationType } from '../utils/types';


function geocodeAddress(
    map: google.maps.Map,
    location?: mapLocationType,
    address?: string,
): void {
    if (location) {
        map.setCenter(location);
        map.setZoom(13);
    } else if (address) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                map.setCenter(results[0].geometry.location);
                // map.fitBounds(results[0].geometry.bounds);
                map.setZoom(13);
                console.log("Geocode");
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    } else {
        console.log("Location not provided");
    }
}

function searchNearby(map: google.maps.Map, service: google.maps.places.PlacesService,
                      keyword: string, setMarker: (m: google.maps.Marker[])=>void) {
    const query: google.maps.places.PlaceSearchRequest = {
        location: map.getCenter(),
        bounds: map.getBounds() || undefined,
        type: 'restaurant', keyword: keyword
    };
    // Search nearby
    service.nearbySearch(
        query,
        (results, status, pagination) => {
            console.log("Search nearby", status);
            
            if (status !== "OK") return;
            console.log(results[0]);
            setMarker(results
                .filter(restaurant => restaurant.geometry && restaurant.name)
                .map(restaurant => new google.maps.Marker({
                        position: restaurant?.geometry?.location,
                        map,
                        title: restaurant.name,
                    })
                ))
            // if (pagination.hasNextPage) {
            //     pagination.nextPage;
            // }
        }
    );
}

function clearMarker(markers: google.maps.Marker[] | undefined,
                     setMarker: (m: google.maps.Marker[])=>void) {
    if (markers) {
        setMarker(markers.map(m => {
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

    // if (map) {
    //     console.log("yes");
    // } else {
    //     console.log("no");
    // }
    // console.log(map);

    useEffect(() => {
        // Initialize map only once
        if (mapElement) {
            const mapObj = new google.maps.Map(mapElement, {
                zoom: 13,
            });
            const readyListener = google.maps.event.addListener( mapObj, 'idle', function () {
                console.log("Map idle");
                if (!mapReady) {
                    setReady(true);
                    google.maps.event.removeListener(readyListener);
                    console.log("Listener removed");
                }
            });
            setMap(mapObj);
            setService(new google.maps.places.PlacesService(mapObj));
            console.log("Map initialized");
        } else {
            console.log("Map element missing");
        }
    }, [mapElement])

    useEffect(() => {
        console.log("change", keyword, location, address, mapReady);
        if (mapReady && map && service) {
            clearMarker(markers, setMarkers);
            geocodeAddress(map, location, address);
            searchNearby(map, service, keyword, setMarkers)
        }
    }, [keyword, location, address, mapReady])
    

    return (
        <div id="map" style={mapStyle}></div>
    );
}

const mapStyle = {
    height: '90vh'
};

export default MapPanel;