import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import orderService from '../services/orderService';
import '../css/OrderView.css';


interface orderItemBEType {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}
interface orderBEType {
    id: string;
    createTime: Date,
    restaurant: {name: string},
    items: orderItemBEType[]
}

const totalPrice = (order: orderBEType) => {
    return order.items.reduce((prevValue: number, currItem: orderItemBEType) => {
        return prevValue + currItem.quantity * currItem.price;
    }, 0).toFixed(2);
}

function OrderView() {
    const [ order, setOrder ] = useState<orderBEType>();
    const [ allOrders, setAllOrders ] = useState<orderBEType[]>([]);
    const { orderID }: { orderID:string } = useParams();

    useEffect(() => {
        if (orderID) {
            orderService.getOrder(orderID)
                .then(res => {
                    setOrder(res.data);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        } else {
            orderService.getAllOrders()
                .then(res => {
                    console.log(res.data);
                    
                    setAllOrders(res.data);
                    setOrder(undefined);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        }
    }, [orderID]);

    
    
    return (
        <div className="order-card-parent">
            {order ?
            <div className="order-card">
                <div className="card">
                    <div className="card-body">
                        <h4>Your order is confirmed!</h4>
                        <hr/>
                        <h5 className="card-title">{order.restaurant.name}</h5>
                        {order.items.map(item => {
                            return (
                                <div key={item._id}>
                                    <span>{item.name}</span> x <span>{item.quantity}</span> : <span>${item.price * item.quantity}</span>
                                </div>
                            );
                        })}
                        <hr/>
                        <span>Total: ${totalPrice(order)}</span>
                    </div>
                </div>
            </div> :
            <div className="order-card-parent">
                <div className="order-card">
                    <div className="card">
                        <h4>Order history</h4>
                        {allOrders.map(o => (
                            <Link key={o.id} to={orderService.routeToConfirmation(o.id)}><div>
                                <hr/>
                                <div className="card-body">
                                    <div className="card-title">{o.restaurant.name}</div>
                                    <div className="d-flex justify-content-between">
                                        <small className="small text-muted">{new Date(o.createTime).toDateString()}</small>
                                        <small className="small">Total: ${totalPrice(o)}</small>
                                    </div>
                                </div>      
                            </div></Link>
                        ))}
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
    
export default OrderView;