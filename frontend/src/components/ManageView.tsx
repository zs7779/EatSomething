import React, { useEffect, useState } from 'react';

import { managerType } from '../utils/types';
import ManagePanel from "./ManagePanel";
import ManageAddRestaurantPanel from "./ManageAddRestaurantPanel";
import manageService from '../services/manageService';
import '../css/ManageView.css';


function ManageView() {
    const [ manager, setManager ] = useState<managerType>({username: "", name: "", restaurants:[]} as managerType);
    const [ adding, setAdding ] = useState(false);
    useEffect(()=>{
        manageService.getManager()
            .then(res => {
                setManager(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleAddRestaurant = (updatedManager: managerType) => {
        setManager(updatedManager);
        setAdding(false);
    }
    
    return (
        <div className="business-view p-3">
            <h1 className="font-weight-bold">My Restaurants</h1>
            <button type="button" className="btn btn-outline-primary" onClick={() => setAdding(true)}>Add a restaurant</button>
            <hr/>
            {adding ? <ManageAddRestaurantPanel handleAddRestaurant={handleAddRestaurant}/> : <ManagePanel restaurants={manager.restaurants}/>}
        </div>
    )
}
    
export default ManageView;