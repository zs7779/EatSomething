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
    const [ errorMessage, setErrorMessage ] = useState<string>();

    useEffect(() => {
        setErrorMessage(undefined);
        if (orderID) {
            orderService.getOrder(orderID)
                .then(res => {
                    setOrder(res.data);
                })
                .catch(err => {
                    setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
                });
        } else {
            orderService.getAllOrders()
                .then(res => {                    
                    setAllOrders(res.data);
                    setOrder(undefined);
                })
                .catch(err => {
                    setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later.");
                });
        }
    }, [orderID]);

    return (
        <div className="order-view p-3">
            <div></div>
            <div>
                {errorMessage && <div className="error-message p-1 m-1">{errorMessage}</div>}
                {order ?
                    <div className="confirmation-view">
                        <div className="order-panel">
                            <div className="card">
                                <OrderInfoCard order={order} title={`Your order is ${order.complete ? "completed" : "confirmed"}!`} footer={`Total: $${orderService.totalPrice(order)}`} />
                            </div>
                        </div>
                    </div> :
                    <div>
                        <h1 className="font-weight-bold">Order history</h1>
                        <hr/>
                        <div className="order-panel">
                            {allOrders.length > 0 ? allOrders.map(o => (
                                <Link key={o.id} to={orderService.routeToConfirmation(o.id)} className="card m-1"><div>
                                    <div className="card-body">
                                        <div className="card-title">
                                            {o.complete ? <span className="badge badge-primary float-right">Complete</span> : 
                                            <span className="badge badge-secondary float-right">Imcomplete</span>}
                                            <h4>{o.restaurant.name}</h4>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <small className="small text-muted">{new Date(o.createTime).toDateString()}</small>
                                            <small className="small">Total: ${orderService.totalPrice(o)}</small>
                                        </div>
                                    </div>
                                </div></Link>
                            )) : <div>{"You don't have any past order at the moment"}</div>}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
    
export default OrderView;