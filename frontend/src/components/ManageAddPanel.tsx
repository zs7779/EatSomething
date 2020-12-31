import React, { FormEvent, useState } from 'react';

import ManageAddList from './ManageAddList';
import ManageAddMenu from './ManageAddMenu';
import { menuType } from '../utils/types';
import manageService from '../services/manageService';


function ManageAddPanel() {
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
    const [location, setLocation] = useState({lat: 0, lng: 0});
    
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
    const handleOpenHour = (day: number, hour: string) => {
        console.log(day, hour);
        const hours = [...openingTime];
        const [openH, openM, closeH, closeM] = deconstructTime(hours[day]);
        hours[day] = `${hour}:${openM}-${closeH}:${closeM}`;
        setOpeningTime(hours);
    }
    const handleOpenMin = (day: number, minute: string) => {
        console.log(day, minute);
        const hours = [...openingTime];
        const [openH, openM, closeH, closeM] = deconstructTime(hours[day]);
        hours[day] = `${openH}:${minute}-${closeH}:${closeM}`;
        setOpeningTime(hours);
    }
    const handleCloseHour = (day: number, hour: string) => {
        console.log(day, hour);
        const hours = [...openingTime];
        const [openH, openM, closeH, closeM] = deconstructTime(hours[day]);
        hours[day] = `${openH}:${openM}-${hour}:${closeM}`;
        setOpeningTime(hours);
    }
    const handleCloseMin = (day: number, minute: string) => {
        console.log(day, minute);
        const hours = [...openingTime];
        const [openH, openM, closeH, closeM] = deconstructTime(hours[day]);
        hours[day] = `${openH}:${openM}-${closeH}:${minute}`;
        setOpeningTime(hours);
    }

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log("submit");
        manageService.addBusiness({
            name,
            address,
            opening_time: openingTime,
            keywords,
            payment,
            delivery,
            takeaway,
            menus,
            location
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="openTime"><h5>Opening Time:</h5></label>
                <div id="openTime">
                    {days.map((s, d) => (
                        <div key={s}>
                            <div className="form-inline">
                                <label htmlFor={`${s}-ch`}>{s}:</label>
                                <input type="number" className="form-control" id={`${s}-ch`}
                                    min={0} max={23} step={1} value={deconstructTime(openingTime[d])[0]}
                                    onChange={(e)=>handleOpenHour(d, e.target.value)} />
                                <input type="number" className="form-control" id={`${s}-om`}
                                    min={0} max={59} step={1} value={deconstructTime(openingTime[d])[1]}
                                    onChange={(e)=>handleOpenMin(d, e.target.value)} />
                                <input type="number" className="form-control" id={`${s}-ch`}
                                    min={0} max={23} step={1} value={deconstructTime(openingTime[d])[2]}
                                    onChange={(e)=>handleCloseHour(d, e.target.value)} />
                                <input type="number" className="form-control" id={`${s}-cm`}
                                    min={0} max={59} step={1} value={deconstructTime(openingTime[d])[3]}
                                    onChange={(e)=>handleCloseMin(d, e.target.value)} />
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
            <button type="submit" className="btn btn-primary my-1">Submit</button>
        </form>
    )
}
    
export default ManageAddPanel;