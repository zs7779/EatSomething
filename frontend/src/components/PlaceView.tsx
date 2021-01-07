import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, DefaultRootState } from 'react-redux';

import MenuPanel from "./MenuPanel";
import { RatingStar, PriceSign, OpenUntil } from './miniComponents';
import { orderItemType } from '../utils/types';
import { orderChange } from '../reducers/orderReducer';
import restaurantService from '../services/restaurantService';
import '../css/PlaceView.css';


function PlaceView() {
    const [ restaurant, setRestaurant ] = useState<any>();
    const { placeID }: { placeID:string } = useParams();
    const order = useSelector((state: {modal:DefaultRootState, order:DefaultRootState}) => state.order as orderItemType[]);
    const dispatch = useDispatch();

    useEffect(() => {
        restaurantService.getRestaurant(placeID)
            .then((res) => {
                setRestaurant(res);
            })
            .catch(err => {
                console.log(err.response.data.error);
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
        {restaurant && <div className="place-info p-3">
            <h1 className="font-weight-bold">{restaurant.name}</h1>
            <div className="font-weight-bold">
                <RatingStar rating={restaurant.rating}/> <span>{restaurant.user_ratings_total} reviews</span> · <PriceSign priceLevel={restaurant.price_level}/> · <span>{restaurant    .keywords.join(" · ")}</span>
            </div>
            <hr/>
            <MenuPanel menu={restaurant.menus}></MenuPanel>
        </div>}
        {restaurant && <div className="booking-info p-3">
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
                    {restaurant.takeaway && <button type="button" onClick={handleShow} disabled={order.length === 0}
                        className="btn btn-danger px-4 mx-1">Takeout</button>}
                    {restaurant.delivery && <button type="button" onClick={handleShow} disabled={order.length === 0}
                        className="btn btn-danger px-4 mx-1">Delivery</button>}
                </div>
            </div>
            <div className="card card-body shadow-sm mt-3">
                <h5>Info</h5>
                <div className="embedmap p-1" style={{height: "200px", backgroundColor: "green"}}></div>
                <div className="font-weight-bold mt-3">Location</div>
                <div>{restaurant.address}</div>
                <div className="font-weight-bold mt-3">Hours of Operation</div>
                <div><OpenUntil openingTime={restaurant.opening_time}/></div>
                <div className="font-weight-bold mt-3">Cuisine</div>
                <div>{restaurant.keywords.join(", ")}</div>
                <div className="font-weight-bold mt-3">Payment Options</div>
                <div>{restaurant.payment.join(", ")}</div>
            </div>
        </div>}
    </div>
    );
}
    
export default PlaceView;