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
    console.log(keywords);
    console.log(parseFloat(location[0]), parseFloat(location[1]));
    
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
            console.log(restaurants.length);
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
            console.log(restaurant);
            response.json(restaurant);
        })
        .catch(err => {
            return response.status(500).json({ error: err.message });
        });
});

// restaurantRouter.post('/restaurants', async (request: Request, response: Response) => {
//     const token = getTokenFromRequest(request);
//     if (!token) {
//         return response.status(401).json({ error: 'Token missing' });    
//     } 
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
//     if (!decodedToken.id) {
//         return response.status(401).json({ error: 'Token invalid' });
//     }
//     const user = await User.findById(decodedToken.id);
//     if (!user) {
//         return response.status(404).json({ error: 'User not found' });
//     }
//     const body = request.body;

//     const newBusiness = {
//         name: body.name,
//         address: body.address,
//         opening_time: body.opening_time,
//         keywords: body.keywords,
//         takeaway: body.takeaway,
//         delivery: body.delivery,
//         payment: body.payment,
//         menus: body.menus,
//         location: body.location,
//         price_level: 3,
//         rating: 0,
//         user_ratings_total: 0,
//     };
    
//     user.restaurants.push(newBusiness as restaurantType);
//     user.save().then(res => {
//         response.json(user);
//     })
// });

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

export default restaurantRouter;