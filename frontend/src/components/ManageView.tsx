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
    const [ errorMessage, setErrorMessage ] = useState<string>();

    useEffect(()=>{
        setErrorMessage(undefined);
        if (placeID) {
            manageService.manageRestaurant(placeID)
                .then(res => {
                    setManager(res);
                })
                .catch(err => {
                    setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
                });
        } else {
            manageService.manageRestaurant()
                .then(res => {
                    setManager(res);
                })
                .catch(err => {
                    setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
                });
        }
        
    }, [placeID]);

    const handleAddRestaurant = (updatedManager: managerType) => {
        setManager(updatedManager);
        setAdding(false);
    }
    
    return (
        <div className="business-view">
            <h1 className="font-weight-bold p-3">My Restaurants</h1>
            {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
            {adding ? <button type="button" className="btn btn-outline-primary" onClick={() => setAdding(false)}>Cancel</button> :
                      <button type="button" className="btn btn-outline-primary" onClick={() => setAdding(true)}>Add a restaurant</button>}
            <hr/>
            {adding ? <ManageAddRestaurantPanel handleAddRestaurant={handleAddRestaurant}/> : 
                      <ManagePanel restaurants={manager.restaurants} placeID={placeID} />}
        </div>
    );
}
    
export default ManageView;