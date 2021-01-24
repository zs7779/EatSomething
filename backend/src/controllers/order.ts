import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";

import User from "../models/user";
import Order from '../models/order';
import Restaurant from '../models/restaurant';
import { getTokenFromRequest } from "../utils";
import { jwtType } from '../types';


const orderRouter = Router();

orderRouter.get('/', async (request: Request, response: Response) => {
    // Get all orders of user. Login requred.
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
            .then(user => {
                if (!user) {
                    return response.status(404).json({ error: 'User not found' });
                }
                Order.find({user: user._id})
                    .sort({createTime: -1})
                    .populate("restaurant")
                    .then(res => {
                        return response.json(res);
                    })
                    .catch(err => {
                        return response.status(500).json({ error: 'Server error, please try again later' });
                    });
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});

orderRouter.get('/:id', async (request: Request, response: Response) => {
    // Get order by id of user. Login requred.
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
            .then(user => {
                if (!user) {
                    return response.status(404).json({ error: 'User not found' });
                }
                const id = request.params.id;
                Order.findOne({_id: id, user: user._id})
                    .populate("restaurant")
                    .then(res => {
                        if (res) {
                            return response.json(res);
                        } else {
                            return response.status(404).json({ error: 'Order not found' });
                        }
                    })
                    .catch(err => {
                        return response.status(500).json({ error: 'Server error, please try again later' });
                    })
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});

orderRouter.post('/:id', async (request: Request, response: Response) => {
    // User update of order status (rate order). Login required.
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
            .then(user => {
                if (!user) {
                    return response.status(404).json({ error: 'User not found' });
                }
                const id = request.params.id;
                const body = request.body;
                Order.findOne({_id: id, user: user._id, complete: true})
                    .then(order => {
                        if (order) {
                            order.rated = true;
                            order.save()
                                .then(res => {               
                                    Restaurant.findById(order.restaurant)
                                        .then(res => {
                                            if (res) {
                                                res.rating = (res.rating * res.user_ratings_total + body.rating) / res.user_ratings_total + 1;
                                                res.user_ratings_total = res.user_ratings_total + 1;
                                                res.save()
                                                    .then(() => response.json(order))
                                                    .catch(err => {
                                                        return response.status(500).json({ error: 'Server error, please try again later' });
                                                    });
                                            } else {
                                                return response.status(404).json({ error: 'User not found' });
                                            }
                                        })
                                })
                                .catch(err => {
                                    return response.status(500).json({ error: 'Server error, please try again later' });
                                });
                        } else {
                            return response.status(404).json({ error: 'Order not found' });
                        }
                    })
                    .catch(err => {
                        return response.status(500).json({ error: 'Server error, please try again later' });
                    })
            });
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});

orderRouter.post('/', async (request: Request, response: Response) => {
    // Create order at restaurant. Login requred.
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
            .then(user => {
                if (!user) {
                    return response.status(404).json({ error: 'User not found' });
                }
                const body = request.body;
                const id = body.id;
                Restaurant.findById(id)
                    .then(restaurant => {
                        if (!restaurant) {
                            return response.status(404).json({ error: 'Restaurant not found' });
                        }
                        const newOrder = new Order({
                            user: user._id,
                            restaurant: restaurant._id,
                            items: body.items,
                        });
                        
                        newOrder.save()
                            .then(res => response.json(res))
                            .catch(err => {
                                return response.status(500).json({ error: 'Server error, please try again later' });
                            });;
                    });
            })
            .catch(err => {
                return response.status(500).json({ error: 'Server error, please try again later' });
            });;
    } catch (err) {
        return response.status(401).json({ error: 'Please login' });
    }
});

export default orderRouter;