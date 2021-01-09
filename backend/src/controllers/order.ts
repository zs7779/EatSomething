import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";

import User from "../models/user";
import Restaurant from "../models/restaurant";
import Order from '../models/order';
import { getTokenFromRequest } from "../utils";
import { jwtType } from '../types';


const orderRouter = Router();

orderRouter.get('/', async (request: Request, response: Response) => {
    const token = getTokenFromRequest(request);
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    } 
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
                .populate("restaurant")
                .then(res => {
                    return response.json(res);
                })
                .catch(err => {
                    return response.status(500).json({ error: err.message });
                })
        });
});

orderRouter.get('/:id', async (request: Request, response: Response) => {
    const token = getTokenFromRequest(request);
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    } 
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
            Order.findById(id)
                .populate("restaurant")
                .then(res => {
                    return response.json(res);
                })
                .catch(err => {
                    return response.status(500).json({ error: err.message });
                })
        });
});

export default orderRouter;