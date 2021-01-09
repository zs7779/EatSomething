import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import orderService from '../services/orderService';


interface orderItemType {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

function OrderView() {
    const [ order, setOrder ] = useState<{
        restaurant: {name: string},
        items: orderItemType[]
    }>();
    const { orderID }: { orderID:string } = useParams();

    useEffect(() => {
        orderService.getOrder(orderID)
            .then(res => {
                setOrder(res.data);
            })
    }, []);
    const totalPrice = order?.items.reduce((prevValue: number, currItem: orderItemType) => {
        return prevValue + currItem.quantity * currItem.price;
    }, 0);
    
    return (
        <div>
            <h5>Your order is confirmed!</h5>
            {order &&
            <div className="card">
                <h6>{order.restaurant.name}</h6>
                {order.items.map(item => {
                    return (
                        <div key={item._id}>
                            <span>{item.name}</span> x <span>{item.quantity}</span> : <span>${item.price * item.quantity}</span>
                        </div>
                    );
                })}
                <span>${totalPrice}</span>
            </div>
            }
        </div>
    );
}
    
export default OrderView;