import React, { useEffect, useState } from 'react';
import axios from "axios";

import { restaurantType } from '../utils/types';
import ManagePanel from "./ManagePanel";
import ManageAddPanel from "./ManageAddPanel";
import '../css/ManageView.css';


const base_url = "http://localhost:3001";

function ManageView() {
    const [ restaurants, setRestaurants ] = useState<restaurantType[]>([]);

    useEffect(()=>{
        axios.get(`${base_url}/api/business`)
            .then(res => {
                setRestaurants(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleAdd = () => {
        console.log("add");
        
    }

    return (
        <div className="business-view p-3">
            <h1 className="font-weight-bold">My Restaurants</h1>
            <button type="button" onClick={handleAdd}>Add a restaurant</button>
            <hr/>
            <ManageAddPanel/>
            <ManagePanel restaurants={restaurants}/>
        </div>
    )
}
    
export default ManageView;