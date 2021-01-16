import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";

import { jwtType, restaurantType } from "../types";
import { getTokenFromRequest } from "../utils";
import User from '../models/user';
import Restaurant from '../models/restaurant';
import Order from '../models/order';


const restaurantRouter = Router();

restaurantRouter.get('/', async (request: Request, response: Response) => {
    Restaurant.find()
        .then(restaurants => {
            response.json(restaurants);
        })
        .catch(err => {
            return response.status(500).json({ error: err.message });
        });
});

restaurantRouter.get('/location/:location/query/:keywords?', async (request: Request, response: Response) => {
    const keywords = new RegExp(request.params.keywords ?
        request.params.keywords.trim().replace(/\s+/g, ' ').split(' ').join('|') :
        "", 'i');
    const location = request.params.location.split(',');
    
    Restaurant.find({$or:[
            {keywords: keywords},
            {name: keywords},
            {"menus.items.name": keywords}
        ],
        "location.lat": {
            $gte: parseFloat(location[0])-0.05,
            $lte: parseFloat(location[0])+0.05,
        },
        "location.lng": {
            $gte: parseFloat(location[1])-0.05,
            $lte: parseFloat(location[1])+0.05,
        },
        })
        .then(restaurants => {
            response.json(restaurants);
        })
        .catch(err => {
            return response.status(500).json({ error: err.message });
        });
});

restaurantRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;
    Restaurant.findById(id)
        .then(restaurant => {
            response.json(restaurant);
        })
        .catch(err => {
            return response.status(500).json({ error: err.message });
        });
});

restaurantRouter.post('/:id', async (request: Request, response: Response) => {
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
            Restaurant.findById(id)
                .then(restaurant => {
                    if (!restaurant) {
                        return response.status(404).json({ error: 'Restaurant not found' });
                    }
                    const body = request.body;
                    const newOrder = new Order({
                        user: user._id,
                        restaurant: restaurant._id,
                        items: body,
                    });
                    
                    newOrder.save()
                        .then(res => response.json(res))
                        .catch(err => {
                            return response.status(500).json({ error: err.message });
                        });;
                });
        })
        .catch(err => {
            return response.status(500).json({ error: err.message });
        });;
});

export default restaurantRouter;