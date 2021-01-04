import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import { useQuery } from '../utils/hooks';
import { mapLocationType } from '../utils/types';
import SearchPanel from './SearchPanel';
import MapPanel from './MapPanel';


const initLocation: mapLocationType = {
    lat: 0,
    lng: 0
}

function SearchView() {
    const query = useQuery();
    const [ keyword, setKeyword ] = useState<string>(query.get("q") || "");
    const [ location, setLocation ] = useState<mapLocationType>(initLocation);
    const [ address, setAddress ] = useState<string>("");

    const locationString = query.get("near") || "";
    const keywordString = query.get("q") || "";
    useEffect(() => {
        if (locationString?.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)) {
            setLocation({lat: parseFloat(locationString.split(",")[0]), lng: parseFloat(locationString.split(",")[1])});
            setAddress("");
        } else {
            setAddress(locationString);
            setLocation(initLocation);
        }
        setKeyword(keywordString);
    }, [locationString, keywordString])


    return (
        <div>
            <SearchPanel lastQuery={keyword} lastLocation={locationString || ""} />
            <MapPanel keyword={keyword}
                location={address==="" ? location : undefined}
                address={address==="" ? undefined : address}
            />
        </div>
    )
}
    
export default SearchView;