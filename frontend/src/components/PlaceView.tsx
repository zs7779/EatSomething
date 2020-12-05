import React, { ChangeEvent } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, DefaultRootState } from 'react-redux';
import MenuPanel from "./MenuPanel";
import { RatingStar, PriceSign, OpenUntil } from './miniComponents';
import { orderItemType } from '../utils/types';
import { orderChange } from '../reducers/orderReducer';
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
    parking: ["Public Lot"],
    payment: ["Visa", "MasterCard"],
    menu: [
        {
            name: "18\" Family Mammas Specialty Pizza",
            items: [
                {
                    name: "18\" Mammas Meatball Pizza 1",
                    description: "Fourteen slices. Tomato sauce, cheese, green and black olives, sundried tomatoes, and feta cheese.",
                    price: 29.99,
                },
                {
                    name: "18\" Mammas Meatball Pizza 2",
                    description: "Fourteen slices. Tomato sauce, cheese, green and black olives, sundried tomatoes, and feta cheese.",
                    price: 29.99,
                },
                {
                    name: "18\" Mammas Meatball Pizza 3",
                    description: "Fourteen slices. Tomato sauce, cheese, green and black olives, sundried tomatoes, and feta cheese.",
                    price: 29.99,
                },
                {
                    name: "18\" Mammas Meatball Pizza 4",
                    description: "Fourteen slices. Tomato sauce, cheese, green and black olives, sundried tomatoes, and feta cheese.",
                    price: 29.99,
                },
            ],
        },
        {
            name: "18\" Family Gourmet Vegan Pizzas",
            items: [
                {
                    name: "18\" Family Gourmet Vegan Pizzas 1",
                    description: "Fourteen slices. Olive oil, roasted potatoes, roasted red peppers, eggplant, broccoli, garlic, and oregano.",
                    price: 24.99,
                },
                {
                    name: "18\" Family Gourmet Vegan Pizzas 2",
                    description: "Fourteen slices. Olive oil, roasted potatoes, roasted red peppers, eggplant, broccoli, garlic, and oregano.",
                    price: 24.99,
                },
                {
                    name: "18\" Family Gourmet Vegan Pizzas 3",
                    description: "Fourteen slices. Olive oil, roasted potatoes, roasted red peppers, eggplant, broccoli, garlic, and oregano.",
                    price: 24.99,
                },
            ],
        },
    ],
};

function PlaceView() {
    const { placeID }: { placeID:string } = useParams();
    const order = useSelector((state: {modal:DefaultRootState, order:DefaultRootState}) => state.order as orderItemType[]);
    const dispatch = useDispatch();

    const handleShow = () => {
        console.log("book");
    };

    const itemPrice = (item: orderItemType) => item.price * item.quantity;
    const totalPrice = (order: orderItemType[]) => {
        return order.reduce((curr:number, item:orderItemType)=>curr+itemPrice(item), 0);
    }
    const handleOrderChange = (item: orderItemType) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            if (item) {
                dispatch(orderChange({
                    name: item.name,
                    price: item.price,
                    quantity: parseInt(e.target.value),
                } as orderItemType));
            } else {
                console.log("No item");
            }
        }
    }

    return (
    <div className="place-view">
        <div></div>
        <div className="place-info p-3">
            <h1 className="font-weight-bold">{business.name} {placeID}</h1>
            <div className="font-weight-bold">
                <RatingStar rating={business.rating}/> <span>{business.user_ratings_total} reviews</span> · <PriceSign priceLevel={business.price_level}/> · <span>{business.types.join(" · ")}</span>
            </div>
            <hr/>
            <MenuPanel menu={business.menu}></MenuPanel>
        </div>
        <div className="booking-info p-3">
            <div className="card card-body shadow-sm rounded">
                <h5>Order</h5>
                <div>
                    {order.map(item => <div key={item.name}>
                        <div className="my-1">
                            <input type="number" onChange={handleOrderChange(item)}
                                defaultValue={item.quantity} min={0} max={99} className="form-control number"/>
                            {item.name}
                        </div>
                    </div>)}
                    <hr/>
                    <div className="float-right">Total: ${totalPrice(order).toFixed(2)}</div>
                </div>
                <hr/>
                <div className="d-flex justify-content-center">
                    {/* {business.dine_in && <button type="button" onClick={handleShow} className="btn btn-danger mx-1">Dine-in</button>} */}
                    {business.takeaway && <button type="button" onClick={handleShow} disabled={order.length === 0}
                        className="btn btn-danger px-4 mx-1">Takeout</button>}
                    {business.delivery && <button type="button" onClick={handleShow} disabled={order.length === 0}
                        className="btn btn-danger px-4 mx-1">Delivery</button>}
                </div>
            </div>
            <div className="card card-body shadow-sm mt-3">
                <h5>Info</h5>
                <div className="embedmap p-1" style={{height: "200px", backgroundColor: "green"}}></div>
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
    </div>
    )
}
    
export default PlaceView;