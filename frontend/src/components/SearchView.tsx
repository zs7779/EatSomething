import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import { useQuery } from '../utils/hooks';
import { mapLocationType } from '../utils/types';
import SearchPanel from './SearchPanel';
import MapPanel from './MapPanel';


function SearchView() {
    const query = useQuery();
    const [ keyword, setKeyword ] = useState<string>(query.get("q") || "");
    const [ location, setLocation ] = useState<mapLocationType>();
    const [ address, setAddress ] = useState<string>("");

    const locationString = query.get("near");
    const keywordString = query.get("q");
    useEffect(() => {
        if (locationString) {
            if (locationString.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)) {
                setLocation({lat: parseFloat(locationString.split(",")[0]), lng: parseFloat(locationString.split(",")[1])});
                setAddress("");
            } else {
                setAddress(locationString);
                setLocation(undefined);
            }
        } else {
            setLocation(undefined);
        }
        setKeyword(keywordString  || "");
    }, [locationString, keywordString]);

    return (
        <div>
            <SearchPanel lastQuery={keyword} lastLocation={location ? `${location.lat.toFixed(4)},${location.lng.toFixed(4)}` : address} />
            <MapPanel keyword={keyword}
                location={location ? location : undefined}
                address={location ? undefined : address}
                setLocation={setLocation}
            />
        </div>
    )
}
    
export default SearchView;