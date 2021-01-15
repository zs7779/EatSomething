import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { orderBEType, restaurantType } from '../utils/types';
import manageService from '../services/manageService';
import orderService from '../services/orderService';
import OrderInfoCard from './OrderInfoCard';
import PlaceInfoCard from './PlaceInfoCard';
import '../css/ManagePanel.css';


function OrderStatusModal({order, setOrder, updateOrder}: {
    order?: orderBEType,
    setOrder: (arg0?: orderBEType) => void,
    updateOrder: (arg0: orderBEType) => void
}) {
    const [ show, setShow ] = useState(false);

    const handleClose = () => {
        setOrder(undefined);
    }
    const handleUpdate = () => {
        if (order?.restaurant.id && order?.id) {
            manageService.updateOrderStatus(order.restaurant.id, order.id, "complete")
                .then(res => {
                    updateOrder(res);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        }
        handleClose();
    }

    useEffect(() => {
        if (order) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [order]);

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Order {order?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Order is complete?</div>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={handleUpdate} className="add-button">
                    Complete
                </Button>
                
            </Modal.Footer>
        </Modal>
    );
}

function ManagePanel({restaurants}: {restaurants: restaurantType[]}) {
    const [ orders, setOrders ] = useState<orderBEType[]>([]);
    const [ orderToUpdate, setOrderToUpdate ] = useState<orderBEType>();

    const handleOrderStatus = (order: orderBEType) => {
        setOrderToUpdate(order);
    }

    const updateOrder = (newOrder: orderBEType) => {
        setOrders(orders.map(order => order.id === newOrder.id ? newOrder : order));
    }

    useEffect(() => {
        if (restaurants.length == 1 && restaurants[0].id) {
            manageService.restaurantOrders(restaurants[0].id)
                .then(res => {
                    setOrders(res);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                });
        }
    }, [restaurants]);

    return (
        <>
        <div className={restaurants.length === 1 ? "manage-panel manage-panel-4" : "manage-panel manage-panel-3"}>
            <div></div>
            {restaurants.length !== 1 ? <div className="d-flex flex-wrap">{
                restaurants.map((restaurant) => (
                <Link to={manageService.routeToRestaurant(restaurant.id)} key={restaurant.id} className="manage-restaurant-link">
                <div className="card manage-restaurant-card m-2">
                    <div className="card-body">
                        <h5 className="card-title">{restaurant.name}</h5>
                        <div className="card-text">{restaurant.address}</div>
                    </div>
                </div>
                </Link>
            ))
            }</div> : <div>
                <h5>Imcomplete Orders:</h5>
                <div className="mt-2">
                    {orders.filter(order => !order.complete).map(order => (
                        <div key={order.id} className="card manage-order-card m-2" onClick={()=>handleOrderStatus(order)}>
                            <OrderInfoCard order={order} title={`Order ${order.id}`} footer={`$${orderService.totalPrice(order)}`} />
                        </div>
                    ))}
                </div>
                <hr/>
                <h5>Past Orders:</h5>
                <div className="mt-2">
                    {orders.filter(order => order.complete).map(order => (
                        <div key={order.id} className="card manage-order-card m-2" onClick={()=>handleOrderStatus(order)}>
                            <OrderInfoCard order={order} title={`Order ${order.id}`} footer={`$${orderService.totalPrice(order)}`} />
                        </div>
                    ))}
                </div>
            </div>}
            {restaurants.length === 1 ? <div className="card card-body shadow-sm mt-3">
                <PlaceInfoCard restaurant={restaurants[0]} verbose={true} />
            </div> : <div></div>}
        </div>
        <OrderStatusModal order={orderToUpdate} setOrder={setOrderToUpdate} updateOrder={updateOrder} />
    </>
    );
}
    
export default ManagePanel;