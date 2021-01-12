import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { managerType } from '../utils/types';
import ManagePanel from "./ManagePanel";
import ManageAddRestaurantPanel from "./ManageAddRestaurantPanel";
import manageService from '../services/manageService';
import '../css/ManageView.css';


function ManageView() {
    const [ manager, setManager ] = useState<managerType>({username: "", name: "", restaurants:[]} as managerType);
    const [ adding, setAdding ] = useState(false);
    const { placeID }: { placeID:string } = useParams();
    console.log(placeID);
    
    useEffect(()=>{
        if (placeID) {
            manageService.manageRestaurant(placeID)
                .then(res => {
                    setManager(res);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        } else {
            manageService.manageRestaurant()
                .then(res => {
                    setManager(res);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        }
        
    }, [placeID]);

    const handleAddRestaurant = (updatedManager: managerType) => {
        setManager(updatedManager);
        setAdding(false);
    }
    
    return (
        <div className="business-view p-3">
            <h1 className="font-weight-bold">My Restaurants</h1>
            {adding ? <button type="button" className="btn btn-outline-primary" onClick={() => setAdding(false)}>Cancel</button> :
                      <button type="button" className="btn btn-outline-primary" onClick={() => setAdding(true)}>Add a restaurant</button>}
            <hr/>
            {adding ? <ManageAddRestaurantPanel handleAddRestaurant={handleAddRestaurant}/> : 
                      <ManagePanel restaurants={manager.restaurants}/>}
        </div>
    )
}
    
export default ManageView;