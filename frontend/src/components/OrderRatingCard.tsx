import React, { useState } from 'react';

import { orderBEType } from '../utils/types';
import orderService from '../services/orderService';


function OrderRatingCard({order, setOrder, setErrorMessage}: {
    order: orderBEType,
    setOrder: (arg0: orderBEType)=>void,
    setErrorMessage: (arg0: string|undefined)=>void
}) {
    const [ rating, setRating ] = useState(0);
    const rateOrder = (id: string, rating: number) => {
        setErrorMessage(undefined);
        orderService.rateOrder(id, rating)
            .then(res => setOrder(res))
            .catch(err => setErrorMessage(err.response?.data?.error || "Something went wrong. Please try again later."));
    }

    return (
        <div className="text-center">
            {order.rated ?
            <>
                <h4>Thank you for your rating!</h4>
            </> :
            <>
                <h4>How did you like this meal?</h4>
                <h2 onClick={() => rateOrder(order.id, rating)}>{[1,2,3,4,5].map(n => (<span key={n}
                                                 className={rating >= n ? "text-warning fas fa-star" : "far fa-star"}
                                                 onMouseOver={() => setRating(n)} />))}
                </h2>
            </>
            }
        </div>
    );
}

export default OrderRatingCard;