import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";

import User from "../models/user";
import Restaurant from "../models/restaurant";
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
        .populate("restaurants")
        .then(user => {
            if (user) {
                response.json(user);
            } else {
                return response.status(404).json({ error: 'Cannot find user with specified ID' });
            }
        })
        .catch(err => {
            return response.status(500).json({ error: err.message });
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
            user.save().then(res => {
                res.populate("restaurants", (err) => {
                    if (err) {
                        return response.status(500).json({ error: err.message });
                    } else {
                        return response.json(res);
                    }
                });
            })
                .catch(err => {
                    return response.status(500).json({ error: err.message });
                });
        })
        .catch(err => {
            return response.status(500).json({ error: err.message });
        });

});

export default manageRouter;