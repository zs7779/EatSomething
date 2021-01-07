import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";

import { restaurantType } from "../types";
import { getTokenFromRequest } from "../utils";
import Restaurant from '../models/restaurant';


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

export default restaurantRouter;