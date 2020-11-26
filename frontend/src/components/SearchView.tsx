import React, { useState, useEffect } from 'react'
import { location } from '../utils/types'
import SearchPanel from './SearchPanel';


function SearchView() {
    const [ location, setLocation ] = useState({lat: 0, lng: 0});

    const getLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showLocation);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    
    const showLocation = (loc: location): void => {
        console.log(loc.coords);
        setLocation({lat: loc.coords.latitude, lng: loc.coords.longitude});
    }

    function geocodeAddress(
        geocoder: google.maps.Geocoder,
        resultsMap: google.maps.Map
    ): void {
        const address = "markham";
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                resultsMap.setCenter(results[0].geometry.location);
                resultsMap.fitBounds(results[0].geometry.bounds);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }

    useEffect(getLocation, []);
    useEffect(() => {
        const mapElement = document.getElementById("map");
        if (mapElement) {
            const map = new google.maps.Map(mapElement, {
                zoom: 8,
                center: { lat: location.lat, lng: location.lng },
            });
            const geocoder = new google.maps.Geocoder();
            geocodeAddress(geocoder, map);

            const service = new google.maps.places.PlacesService(map);
            const query: google.maps.places.PlaceSearchRequest = {
                location: location, type: 'restaurant', radius: 1000,
                keyword: "thai"
            };
            const bounds = map.getBounds();
            if (bounds) {
                query['bounds'] = bounds;
            }
            service.nearbySearch(
                query,
                (results, status, pagination) => {
                    console.log(status);
                    console.log(results);
                    
                    if (status !== "OK") return;
                    results.map(restaurant => {
                        if (restaurant.geometry) {
                            new google.maps.Marker({
                                position: restaurant.geometry.location,
                                map,
                                title: "Hello World!",
                            });
                        }
                    }) 
                
                    if (pagination.hasNextPage) {
                        pagination.nextPage;
                    }
                }
            );            
        }
    }, []);    

    return (
        <div>
            <SearchPanel></SearchPanel>
            <div id="map" style={mapStyle}></div>
        </div>
    )
}

const mapStyle = {
    height: '90vh'
};
    
export default SearchView;