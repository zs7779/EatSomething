import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, DefaultRootState } from 'react-redux';
import axios from 'axios';

import MenuPanel from "./MenuPanel";
import { RatingStar, PriceSign, OpenUntil } from './miniComponents';
import { orderItemType } from '../utils/types';
import { orderChange } from '../reducers/orderReducer';
import '../css/PlaceView.css';


const base_url = "http://localhost:3001";

function PlaceView() {
    const [ business, setBusiness ] = useState<any>();
    const { placeID }: { placeID:string } = useParams();
    const order = useSelector((state: {modal:DefaultRootState, order:DefaultRootState}) => state.order as orderItemType[]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${base_url}/api/business/${placeID}/`).then((res) => {
            // console.log(res.data);
            setBusiness(res.data);
        });
    }, [placeID]);

    const handleShow = () => {
        console.log("book");
    };

    const itemPrice = (item: orderItemType) => item.price * item.quantity;
    const totalPrice = (order: orderItemType[]) => {
        return order.reduce((curr:number, item:orderItemType)=>curr+itemPrice(item), 0);
    };
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
    };    

    return (
    <div className="place-view">
        <div></div>
        {business && <div className="place-info p-3">
            <h1 className="font-weight-bold">{business.name} {placeID}</h1>
            <div className="font-weight-bold">
                <RatingStar rating={business.rating}/> <span>{business.user_ratings_total} reviews</span> · <PriceSign priceLevel={business.price_level}/> · <span>{business.keywords.join(" · ")}</span>
            </div>
            <hr/>
            <MenuPanel menu={business.menus}></MenuPanel>
        </div>}
        {business && <div className="booking-info p-3">
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
                <div>{business.keywords.join(", ")}</div>
                <div className="font-weight-bold mt-3">Payment Options</div>
                <div>{business.payment.join(", ")}</div>
                <div className="font-weight-bold mt-3">Parking</div>
                <div>{business.parking.join(", ")}</div>
            </div>
        </div>}
    </div>
    );
}
    
export default PlaceView;