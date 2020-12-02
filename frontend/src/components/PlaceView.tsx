import React from 'react';
import { useParams } from "react-router-dom";
import { RatingStar, PriceSign, OpenUntil } from './miniComponents';
import '../css/PlaceView.css';


const business = {
    name: "Pizza Pizza", // .name
    address: "8601 Warden Ave Unit #1B, Unionville", //.vicinity
    location: {lat: 43.8579871, lng: -79.3319334}, //geometry?.location
    opening_time: ["09:00-21:30",
                   "09:00-21:30",
                   "09:00-21:30",
                   "09:00-21:30",
                   "09:00-21:30",
                   "09:00-22:00",
                   "09:00-22:00"], //generate
    types: ["Pizza", "Italian", "Fast food"], //generate
    dine_in: true, //generate
    takeaway: true, //generate
    delivery: true, //generate
    price_level: 2, //generate
    rating: 3.6, //generate
    user_ratings_total: 296, //generate
    description: "Open 24 hours! We at Pizza Rustica, we strive to always bring you a little more. More delicious ways to discover great times and more smiles per minute. Honest home style cooking is our obsession that we can't help. We go out of our way to bring you tasty flavours and fresh dishes that keep you craving another bite at Pizza Rustica. Smart humble service with infectious ambiance and a fresh vibe, creates an environment where you and your friends can feel at home, relax and be free.",
    parking: ["Public lot"],
    payment: ["Visa", "MasterCard"],
};

function PlaceView() {
    const { placeID }: { placeID:string } = useParams();


    return (
    <div className="place-view">
        <div></div>
        <div className="place-info p-3">
            <h1 className="font-weight-bold">{business.name} {placeID}</h1>
            <div className="font-weight-bold">
                <RatingStar rating={business.rating}/> <span>{business.user_ratings_total} reviews</span> · <PriceSign priceLevel={business.price_level}/> · <span>{business.types.join(" · ")}</span>
            </div>
            <p className="py-3">
                {business.description}            
            </p>
        </div>
        <div className="booking-info p-3">
            <div className="embedmap p-1 my-3" style={{height: "225px", width: "300px", backgroundColor: "green"}}></div>
            <div className="font-weight-bold mt-3">Location</div>
            <div>{business.address}</div>
            <div className="font-weight-bold mt-3">Hours of Operation</div>
            <div><OpenUntil openingTime={business.opening_time}/></div>
            <div className="font-weight-bold mt-3">Cuisine</div>
            <div>{business.types.join(", ")}</div>
            <div className="font-weight-bold mt-3">Payment Options</div>
            <div>{business.payment.join(", ")}</div>
            <div className="font-weight-bold mt-3">Parking</div>
            <div>{business.parking.join(", ")}</div>
            
        </div>
    </div>
    )
}
    
export default PlaceView;