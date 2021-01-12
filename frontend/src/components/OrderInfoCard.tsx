import React from 'react';

import { orderBEType } from '../utils/types';


function OrderInfoCard({order, title ,footer}: {
    order: orderBEType,
    title: string,
    footer: string
}) {
    return (
        <div className="card-body">
            <h4>{title}</h4>
            <small className="text-muted">Ordered at {new Date(order.createTime).toLocaleString()}</small>
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
            <span>{footer}</span>
        </div>
    );
}

export default OrderInfoCard;