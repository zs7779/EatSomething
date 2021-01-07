import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import { useQuery } from '../utils/hooks';
import { mapLocationType } from '../utils/types';
import SearchPanel from './SearchPanel';
import MapPanel from './MapPanel';


function SearchView() {
    const query = useQuery();
    const keyword = query.get("q") || ""; // keyword is just whatever is in url query
    const queryNear = query.get("near"); // location needs to be processed into coordinates or address

    const [ location, setLocation ] = useState<mapLocationType>(); // location is used in actual query and controls map center
    const [ locationQuery, setLocationQuery ] = useState<string>();
    const [ address, setAddress ] = useState<string>(""); // address is used to geocode incase the location query cannot be interpreted as coordinates
    
    useEffect(() => {
        if (queryNear) {
            if (queryNear.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)) {
                setLocation({lat: parseFloat(queryNear.split(",")[0]), lng: parseFloat(queryNear.split(",")[1])});
                setLocationQuery(queryNear);
                setAddress("");
            } else {
                setAddress(queryNear);
                setLocation(undefined);
                setLocationQuery(undefined);
            }
        } else {
            setLocation(undefined);
        }
    }, [queryNear]);

    return (
        <div>
            <SearchPanel lastQuery={keyword} lastLocation={location ? `${location.lat.toFixed(4)},${location.lng.toFixed(4)}` : address} />
            <MapPanel keyword={keyword}
                location={location ? location : undefined}
                locationQuery={locationQuery ? locationQuery : ""}
                address={location ? "" : address}
                setLocation={setLocation}
            />
        </div>
    )
}
    
export default SearchView;