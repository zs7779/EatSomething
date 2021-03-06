import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch, DefaultRootState } from 'react-redux';

import MenuPanel from "./MenuPanel";
import { RatingStar, PriceSign } from './miniComponents';
import { orderItemType, restaurantType } from '../utils/types';
import { orderChange, orderClear } from '../reducers/orderReducer';
import restaurantService from '../services/restaurantService';
import orderService from '../services/orderService';
import '../css/PlaceView.css';
import PlaceInfoCard from './PlaceInfoCard';


function PlaceView() {
    const [ restaurant, setRestaurant ] = useState<restaurantType>();
    const { placeID }: { placeID:string } = useParams();
    const order = useSelector((state: {modal:DefaultRootState, order:DefaultRootState}) => state.order as orderItemType[]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ errorMessage, setErrorMessage ] = useState<string>();

    useEffect(() => {
        setErrorMessage(undefined);
        restaurantService.getRestaurant(placeID)
            .then((res) => {
                setRestaurant(res);
            })
            .catch(err => {
                setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
            });
    }, [placeID]);

    const handleShow = () => {
        setErrorMessage(undefined);
        if (restaurant && restaurant.id) {
            orderService.placeOrderAtRestaurant(restaurant.id, order)
                .then(res => {
                    dispatch(orderClear());
                    history.push(orderService.routeToConfirmation(res.id));
                })
                .catch(err => {
                    setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
                });
        }
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
            }
        }
    };    

    return (
    <div className="place-view">
        {restaurant? <div className="place-info p-3">
            <h1 className="font-weight-bold">{restaurant.name}</h1>
            {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
            <div className="font-weight-bold">
                {restaurant.rating && <RatingStar rating={restaurant.rating}/>} <span>{restaurant.user_ratings_total} reviews</span> · {restaurant.price_level && <PriceSign priceLevel={restaurant.price_level}/>} · <span>{restaurant.keywords.join(" · ")}</span>
            </div>
            <hr/>
            <MenuPanel menu={restaurant.menus}></MenuPanel>
        </div> : <div>{errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}</div>}
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
                <PlaceInfoCard restaurant={restaurant} verbose={true} />
            </div>
        </div>}
    </div>
    );
}
    
export default PlaceView;