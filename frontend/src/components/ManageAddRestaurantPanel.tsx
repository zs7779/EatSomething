import React, { FormEvent, useState } from 'react';

import ManageAddList from './ManageAddList';
import ManageAddMenu from './ManageAddMenu';
import { managerType, menuType } from '../utils/types';
import manageService from '../services/manageService';


function ManageAddRestaurantPanel({handleAddRestaurant}: {handleAddRestaurant: (arg0: managerType)=>void}) {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [openingTime, setOpeningTime] = useState<string[]>([
        "09:00-21:00",
        "09:00-21:00",
        "09:00-21:00",
        "09:00-21:00",
        "09:00-21:00",
        "09:00-21:00",
        "09:00-21:00"
    ]);
    const [keywords, setKeywords] = useState<string[]>([]);
    // const [parking, setParking] = useState<string[]>([]);
    const [payment, setPayment] = useState<string[]>([]);
    const [delivery, setDelivery] = useState(false);
    const [takeaway, setTakeaway] = useState(false);
    const [menus, setMenus] = useState<menuType[]>([]);
    const [location, setLocation] = useState({lat: "0", lng: "0"});
    const [ errorMessage, setErrorMessage ] = useState<string>();
    
    const keywordChoices = ["Canadian", "Korean", "Chinese", "Indian", "Italian", "French", "Turkish", "American", "Mexican", "Japanese", "Thai",
    "Vietnam", "Mongolian", "Spanish", "European", "Asian", "Mediterranean", "African", "Fusion", "Continental", 
    "Breakfast", "Lunch", "Brunch", "Fast food", "Fine dining", "Farm-to-table", "Comfort food", "Pub", "Bar",
    "Pizza", "Pho", "BBQ", "Wings", "Steakhouse", "Sushi", "Teppanyaki", "Seafood"];
    const paymentChoices = ["Visa", "MasterCard", "AMEX", "Discover"];
    // const parkingChoices = ["Complimentary parking", "Public parking", "Street parking", "Underground parking", "Valet parking"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];    

    const deconstructTime = (timestr: string) => {
        const [open, close] = timestr.split("-");
        return [...open.split(":"), ...close.split(":")];
    }
    const handleOpenTime = (day: number, newTime: string, slot: number) => {
        const hours = [...openingTime];
        const deconArray = deconstructTime(hours[day]);
        deconArray[slot] = `0${newTime}`.slice(-2);
        hours[day] = `${deconArray[0]}:${deconArray[1]}-${deconArray[2]}:${deconArray[3]}`;
        setOpeningTime(hours);
    }

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setErrorMessage(undefined);
        if (name === "") setErrorMessage("Name cannot be empty");
        else if (address === "") setErrorMessage("Address cannot be empty");
        else if (keywords.length === 0) setErrorMessage("Please choose at least one keyword");
        else if (menus.length === 0) setErrorMessage("Please have at least one menu");
        else if (menus.filter(menu => menu.items.length == 0).length > 0) setErrorMessage("Please have at least one item in a menu");
        else if (location.lat === "0" || location.lng === "0") setErrorMessage("Please enter valid coordinates");
        else {
            manageService.addRestaurant({
                name,
                address,
                opening_time: openingTime,
                keywords,
                payment,
                delivery,
                takeaway,
                menus,
                location: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)}
            })
                .then(res => {
                    handleAddRestaurant(res);
                })
                .catch(err => {
                    setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
                });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
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
            <div className="form-group">
                <label htmlFor="restaurantAddress"><h5>Restaurant Location:</h5></label>
                <div className="form-inline" id="restaurantAddress">
                    <label htmlFor="restaurantLatitude">Latitude:</label>
                    <input type="number" className="form-control" id="restaurantLatitude" placeholder="Latitude"
                        value={location.lat}
                        onChange={(e)=>setLocation({lat: e.target.value, lng: location.lng})} />
                    <label htmlFor="restaurantLongitude">Longitude:</label>
                    <input type="number" className="form-control" id="restaurantLongitude" placeholder="Longitude"
                        value={location.lng}
                        onChange={(e)=>setLocation({lat: location.lat, lng: e.target.value})} />
                </div>
            </div><hr/>
            <div className="form-group">
                <label htmlFor="openTime"><h5>Opening Time:</h5></label>
                <div id="openTime">
                    {days.map((s, d) => (
                        <div key={s}>
                            <div className="form-row">
                                <label htmlFor={`${s}-ch`} className="col-1">{s}:</label>
                                <input type="number" className="form-control col-1" id={`${s}-ch`}
                                    min={0} max={23} step={1} value={deconstructTime(openingTime[d])[0]}
                                    onChange={(e)=>handleOpenTime(d, e.target.value, 0)} />
                                <label htmlFor={`${s}-om`} className="mx-1">:</label>
                                <input type="number" className="form-control col-1" id={`${s}-om`}
                                    min={0} max={59} step={1} value={deconstructTime(openingTime[d])[1]}
                                    onChange={(e)=>handleOpenTime(d, e.target.value, 1)} />
                                <label htmlFor={`${s}-ch`} className="mx-1">to</label>
                                <input type="number" className="form-control col-1" id={`${s}-ch`}
                                    min={0} max={23} step={1} value={deconstructTime(openingTime[d])[2]}
                                    onChange={(e)=>handleOpenTime(d, e.target.value, 2)} />
                                <label htmlFor={`${s}-cm`} className="mx-1">:</label>
                                <input type="number" className="form-control col-1" id={`${s}-cm`}
                                    min={0} max={59} step={1} value={deconstructTime(openingTime[d])[3]}
                                    onChange={(e)=>handleOpenTime(d, e.target.value, 3)} />
                            </div>
                        </div>
                    ))}
                </div>
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
            {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary my-1">Submit</button>
        </form>
    )
}
    
export default ManageAddRestaurantPanel;