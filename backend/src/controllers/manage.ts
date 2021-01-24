import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";

import User from "../models/user";
import Restaurant from "../models/restaurant";
import { getTokenFromRequest } from "../utils";
import { jwtType } from '../types';
import Order from '../models/order';


const manageRouter = Router();

manageRouter.get('/', async (request: Request, response: Response) => {
    // Get manager info and all their restaurants. Login requred.
    const token = getTokenFromRequest(request);
    
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        User.findById(decodedToken.id)
            .populate("restaurants", ["name", "address"])
            .then(user => {
                if (user) {
                    response.json(user);
                } else {
                    return response.status(404).json({ error: 'User not found' });
                }
            })
            .catch(err => {
                return response.status(500).json({ error: 'Server error, please try again later' });
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
    
});

manageRouter.get('/restaurants/:id', async (request: Request, response: Response) => {
    // Get manager info and restaurant info by id. Login requred.
    const token = getTokenFromRequest(request);
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    }
    try { 
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        const id = request.params.id;
        User.findById(decodedToken.id)
            .populate({
                path: "restaurants",
                match: {_id: id}
            })
            .then(user => {
                if (user) {
                    response.json(user);
                } else {
                    return response.status(404).json({ error: 'User not found' });
                }
            })
            .catch(err => {
                return response.status(500).json({ error: 'Server error, please try again later' });
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});

manageRouter.get('/restaurants/:id/orders', async (request: Request, response: Response) => {
    // Get orders placed at restaurant by id. Login requred.
    const token = getTokenFromRequest(request);
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    }
    try { 
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        const id = request.params.id;
        Restaurant.findOne({_id: id, manager: decodedToken.id})
            .then((res) => {
                if (!res) {
                    return response.status(404).json({ error: 'Restaurant not found' });
                }
                Order.find({restaurant: id, complete: false})
                    .sort({createTime: -1})
                    .populate("restaurant", "_id name")
                    .then(orders => {            
                        response.json(orders);
                    })
                    .catch(err => {
                        return response.status(500).json({ error: 'Server error, please try again later' });
                    });
            })
            .catch(err => {
                return response.status(500).json({ error: 'Server error, please try again later' });
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});


manageRouter.put('/restaurants/:rid/orders/:oid', async (request: Request, response: Response) => {
    // Manager update of order by id at restaurant by id. Login requred.
    const token = getTokenFromRequest(request);
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    }
    try { 
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        const rid = request.params.rid;
        const oid = request.params.oid;
        const body = request.body;
        Order.findOne({_id: oid, restaurant: rid})
            .then(order => {   
                if (order) {
                    if (body.status === "complete") {    
                        order.complete = true;                
                        order.save()
                            .then(res => {               
                                return response.json(res);
                            })
                            .catch(err => {
                                return response.status(500).json({ error: 'Server error, please try again later' });
                            });
                    } else {
                        return response.status(400).json({ error: 'Unknown status' });
                    }
                } else {
                    return response.status(404).json({ error: 'Order not found' });
                }
            })
            .catch(err => {
                return response.status(500).json({ error: 'Server error, please try again later' });
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});

manageRouter.post('/restaurants', async (request: Request, response: Response) => {
    // Register new restaurant. Login requred.
    const token = getTokenFromRequest(request);
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    }
    try{ 
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        User.findById(decodedToken.id)
            .then(user => {
                if (!user) {
                    return response.status(404).json({ error: 'User not found' });
                }
                const body = request.body;
            
                const newRestaurant = new Restaurant({
                    manager: user._id,
                    name: body.name,
                    address: body.address,
                    opening_time: body.opening_time,
                    keywords: body.keywords,
                    takeaway: body.takeaway,
                    delivery: body.delivery,
                    payment: body.payment,
                    menus: body.menus,
                    location: body.location,
                    price_level: 3,
                    rating: 0,
                    user_ratings_total: 0,
                });
                newRestaurant.save()
                    .then(() => {
                        user.restaurants.push(newRestaurant._id);
                        user.save()
                            .then(res => {
                                res.populate("restaurants", (err) => {
                                    if (err) {
                                        return response.status(500).json({ error: 'Server error, please try again later' });
                                    } else {
                                        return response.json(res);
                                    }
                                });
                            })
                            .catch(err => {
                                return response.status(500).json({ error: 'Server error, please try again later' });
                            });
                    })
                    .catch(err => {
                        return response.status(500).json({ error: 'Server error, please try again later' });
                    });
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});

export default manageRouter;