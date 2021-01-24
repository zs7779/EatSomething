import jwt from 'jsonwebtoken';
import e, { Request, Response, Router } from "express";

import { jwtType } from "../types";
import { getTokenFromRequest } from "../utils";
import User from '../models/user';
import Restaurant from '../models/restaurant';


const restaurantRouter = Router();

restaurantRouter.get('/', async (request: Request, response: Response) => {
    // Get all restaurants. Not sure this should exist
    Restaurant.find()
        .then(restaurants => {
            response.json(restaurants);
        })
        .catch(err => {
            return response.status(500).json({ error: 'Server error, please try again later' });
        });
});

restaurantRouter.get('/location/:location/query/:keywords?', async (request: Request, response: Response) => {
    // Query restaurants given location and keywords
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
    // Get restaurant by id
    const id = request.params.id;
    Restaurant.findById(id)
        .then(restaurant => {
            if (restaurant) {
                response.json(restaurant);
            } else {
                return response.status(404).json({ error: 'Restaurant not found' });
            }
        })
        .catch(err => {
            return response.status(500).json({ error: 'Server error, please try again later' });
        });
});

export default restaurantRouter;