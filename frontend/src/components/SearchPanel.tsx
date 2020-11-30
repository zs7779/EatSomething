import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { searchQueryType, locationType } from '../utils/types';
import '../css/SearchPanel.css';


function SearchPanel({lastQuery, lastLocation}: searchQueryType) {    
    const [ query, setQuery ] = useState(lastQuery || "");
    const [ location, setLocation ] = useState(lastLocation || "");
    const history = useHistory();
    
    const searchCurrentLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((loc: locationType): void => {
                history.push(`/search?q=${query}&near=${loc.coords.latitude},${loc.coords.longitude}`);
            }, () => {
                console.log("An error occured. Cannot find your location.");    
            });
        } else {
            console.log("Navigator unavailable. Cannot find your location.");
        }
    }
    const onQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
    };
    const onLocation = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLocation(event.target.value);
    };
    const onSearch = (event: React.FormEvent): void => {
        // Submit search event
        event.preventDefault();
        if (query === "") return;
        if (location === "") {
            searchCurrentLocation();
        } else {
            history.push(`/search?q=${query}&near=${location}`);
        }
    }

    return (
        <form className="form-inline justify-content-center">
            <div>
                <input type="text" name="search" value={query}
                    placeholder="Restaurant or Cuisine" onChange={onQuery}
                    className="form-control mx-2 input-box" size={50}
                    required
                />
                <input type="text" name="location" value={location}
                    placeholder="Location" onChange={onLocation}
                    className="form-control mx-2 input-box" size={30}
                />
                <button className="btn btn-primary px-5 input-box" onClick={onSearch}>Go</button>
            </div>
        </form>
    )
}
    
export default SearchPanel;