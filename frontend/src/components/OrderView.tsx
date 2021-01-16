import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import orderService from '../services/orderService';
import { orderBEType } from '../utils/types';
import '../css/OrderView.css';
import OrderInfoCard from './OrderInfoCard';


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
                    setAllOrders(res.data);
                    setOrder(undefined);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        }
    }, [orderID]);

    
    
    return (
        <div className="order-view">
            {order ?
            <div className="order-panel">
                <div className="card">
                    <OrderInfoCard order={order} title={"Your order is confirmed!"} footer={`Total: $${orderService.totalPrice(order)}`} />
                </div>
            </div> :
            <div className="order-view">
                <div className="order-panel">
                    <div className="card">
                        <h4>Order history</h4>
                        {allOrders.map(o => (
                            <Link key={o.id} to={orderService.routeToConfirmation(o.id)}><div>
                                <hr/>
                                <div className="card-body">
                                    <div className="card-title">{o.restaurant.name}</div>
                                    <div className="d-flex justify-content-between">
                                        <small className="small text-muted">{new Date(o.createTime).toDateString()}</small>
                                        <small className="small">Total: ${orderService.totalPrice(o)}</small>
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