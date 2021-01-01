import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";

import User from "../models/user";
import { restaurantType } from "../types";
import { getTokenFromRequest } from "../utils";


const manageRouter = Router();

interface jwtType {
    id: string;
}

manageRouter.get('/', async (request: Request, response: Response) => {
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
            if (user) {
                response.json(user);
            } else {
                return response.status(404).json({ error: 'Cannot find user with specified ID' });
            }
        })
        .catch(err => {
            return response.status(500).json({ error: err });
        });
});


manageRouter.post('/restaurants', async (request: Request, response: Response) => {
    const token = getTokenFromRequest(request);
    if (!token) {
        return response.status(401).json({ error: 'Token missing' });    
    } 
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid' });
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return response.status(404).json({ error: 'User not found' });
    }
    const body = request.body;

    const newBusiness = {
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
    };
    
    user.restaurants.push(newBusiness as restaurantType);
    user.save().then(res => {
        response.json(user);
    })
});

// businessRouter.get('/api/business/:id', (request: Request, response: Response) => {
//     const id = request.params.id;
//     Business.findById(id)
//         .then(res => {
//             response.json(res);
//         })
//         .catch(error => {
//             console.log(error);
//             response.status(500).end();
//         });
// });

// businessRouter.get('/', (request: Request, response: Response) => {
//     Business.find({}).then(res => {
//         response.json(res);
//     })
// });

export default manageRouter;