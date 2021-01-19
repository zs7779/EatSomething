import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import searchService from '../services/searchService';
import { searchQueryType, locationType } from '../utils/types';
import '../css/SearchPanel.css';


function SearchPanel({lastQuery, lastLocation}: searchQueryType) {    
    const [ query, setQuery ] = useState(lastQuery || "");
    const [ location, setLocation ] = useState(lastLocation || "");
    const history = useHistory();
    const path = useLocation();
    const [ errorMessage, setErrorMessage ] = useState<string>();
    
    useEffect(() => {
        if (lastLocation) {
            setLocation(lastLocation);
        }
    }, [lastLocation]);

    const searchCurrentLocation = (): void => {
        setErrorMessage(undefined);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((loc: locationType): void => {
                history.push(searchService.routeToSearch(query, `${loc.coords.latitude},${loc.coords.longitude}`));
            }, () => {
                setErrorMessage("An error occured. Cannot find your location.");    
            });
        } else {
            setErrorMessage("Navigator unavailable. Cannot find your location.");
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
            history.push(searchService.routeToSearch(query, `${location}`));
        }
    }
    
    return (
        <div className={path.pathname === '/' ? "search-page" : ""}>
            <div className={`d-flex flex-column align-items-center justify-content-center ${path.pathname === '/' && "search-panel"}`}>
            {path.pathname === '/' && <h2 className="search-panel-title">Find your next meal here</h2>}
            <form className="form-inline justify-content-center p-2">
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
            {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
            </div>
        </div>
    )
}
    
export default SearchPanel;