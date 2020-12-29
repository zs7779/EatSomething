import React, { useState } from 'react';
import axios from "axios";

import ManageAddList from './ManageAddList';
import ManageAddMenu from './ManageAddMenu';
import { menuType } from '../utils/types';


const base_url = "http://localhost:3001";

function ManageAddPanel() {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([]);
    // const [parking, setParking] = useState<string[]>([]);
    const [payment, setPayment] = useState<string[]>([]);
    const [delivery, setDelivery] = useState(false);
    const [takeaway, setTakeaway] = useState(false);
    const [menus, setMenus] = useState<menuType[]>([]);
    
    const keywordChoices = ["Canadian", "Korean", "Chinese", "Indian", "Italian", "French", "Turkish", "American", "Mexican", "Japanese", "Thai",
    "Vietnam", "Mongolian", "Spanish", "European", "Asian", "Mediterranean", "African", "Fusion", "Continental", 
    "Breakfast", "Lunch", "Brunch", "Fast food", "Fine dining", "Farm-to-table", "Comfort food", "Pub", "Bar",
    "Pizza", "Pho", "BBQ", "Wings", "Steakhouse", "Sushi", "Teppanyaki", "Seafood"];
    const paymentChoices = ["Visa", "MasterCard", "AMEX", "Discover"];
    // const parkingChoices = ["Complimentary parking", "Public parking", "Street parking", "Underground parking", "Valet parking"];

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
                <label htmlFor="restaurantName"><h5>Restaurant Name:</h5></label>
                <input type="text" className="form-control" id="restaurantName" placeholder="Restaurant Name"
                    onChange={(e)=>setName(e.target.value)} />
            </div><hr/>
            <div className="form-group">
                <label htmlFor="restaurantAddress"><h5>Restaurant Address:</h5></label>
                <input type="text" className="form-control" id="restaurantAddress" placeholder="Address"
                    onChange={(e)=>setAddress(e.target.value)} />
            </div><hr/>
            <ManageAddList list={keywords} setList={setKeywords} options={keywordChoices} limit={5} message={"Select up to 5 keywords:"} /><hr/>
            <ManageAddList list={payment} setList={setPayment} options={paymentChoices} limit={4} message={"Select up to 4 payment methods:"} /><hr/>
            {/* <ManageAddList list={parking} setList={setParking} options={parkingChoices} limit={5} message={"Select up to 5 parking options:"} /><hr/> */}
            <div className="form-check-label"><h5>Delivery methods:</h5></div>
            <div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="delivery" onChange={(e)=>setDelivery(e.target.checked)} />
                    <label className="form-check-label" htmlFor="delivery">Delivery</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="takeaway" onChange={(e)=>setTakeaway(e.target.checked)} />
                    <label className="form-check-label" htmlFor="takeaway">Takeaway</label>
                </div>
            </div><hr/>
            <ManageAddMenu menus={menus} setMenus={setMenus} /><hr/>
            <button type="submit" className="btn btn-primary my-1">Submit</button>
        </form>
    )
}
    
export default ManageAddPanel;