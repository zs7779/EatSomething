import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import Business from "./models/business";
import userRouter from "./controllers/user";
import loginRouter from "./controllers/login";
import registerRouter from "./controllers/register";
import { businessType } from './types';

dotenv.config();

const dbname = "gofood";
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.7mie9.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {    console.log('connected to MongoDB')  })
    .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  });


const requestLogger = (request: Request, response: Response, next: NextFunction) => {
    console.log(request.method, request.path)
    next()
  }

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);

app.post('/api/business', (request: Request, response: Response) => {
    const newBusiness = new Business({
        name: "Pizza Pizza",
        address: "8601 Warden Ave Unit #1B, Unionville",
        location: {lat: 43.8579871, lng: -79.3319334},
        opening_time: ["09:00-21:30",
                       "09:00-21:30",
                       "09:00-21:30",
                       "09:00-21:30",
                       "09:00-21:30",
                       "09:00-22:00",
                       "09:00-22:00"],
        keywords: ["Pizza", "Italian", "Fast food"],
        dine_in: true,
        takeaway: true,
        delivery: true,
        price_level: 2,
        rating: 3.6,
        user_ratings_total: 296,
        parking: ["Public Lot"],
        payment: ["Visa", "MasterCard"],
        menus: [
            {
                name: "18\" Family Mammas Specialty Pizza",
                items: [
                    {
                        name: "18\" Mammas Meatball Pizza 1",
                        description: "Fourteen slices.  cheese, green and black olives, sundried tomatoes, and feta cheese.",
                        price: 21.99,
                    },
                    {
                        name: "18\" Mammas Meatball Pizza 2",
                        description: "Fourteen slices. Tomato sauce,  green and black olives, sundried tomatoes, and feta cheese.",
                        price: 22.99,
                    },
                    {
                        name: "18\" Mammas Meatball Pizza 3",
                        description: "Fourteen slices. Tomato sauce, cheese, sundried tomatoes, and feta cheese.",
                        price: 23.99,
                    },
                    {
                        name: "18\" Mammas Meatball Pizza 4",
                        description: "Fourteen slices. Tomato sauce, cheese, green and black olives, ",
                        price: 24.99,
                    },
                ],
            },
            {
                name: "18\" Family Gourmet Vegan Pizzas",
                items: [
                    {
                        name: "18\" Family Gourmet Vegan Pizzas 1",
                        description: " Olive oil, roasted potatoes, roasted red peppers, eggplant, broccoli, garlic, and oregano.",
                        price: 25.99,
                    },
                    {
                        name: "18\" Family Gourmet Vegan Pizzas 2",
                        description: "Fourteen oil, roasted potatoes, roasted red peppers, eggplant",
                        price: 26.99,
                    },
                    {
                        name: "18\" Family Gourmet Vegan Pizzas 3",
                        description: "Fourteen slices. Olive oil, roasted potatoes, roasted red peppers, garlic, and oregano.",
                        price: 27.99,
                    },
                ],
            },
        ],
      });
    newBusiness.save().then(res => {
        response.json(newBusiness);
        // mongoose.connection.close();
    });
});

app.get('/api/business', (request: Request, response: Response) => {
    Business.find({}).then(res => {
        response.json(res);
    })
});

app.get('/api/business/:id', (request: Request, response: Response) => {
    const id = request.params.id;
    Business.findById("5fd2d068c244ad0ab0e4fc85").then(res => {
        response.json(res);
    }).catch(error => {
        console.log(error);
        response.status(500).end();
    });
});

app.post('/api/order', (request: Request, response: Response) => {
    Business.find({}).then(res => {
        // mongoose.connection.close();
        response.json(res);
    })
});

app.get('/api/order', (request: Request, response: Response) => {
    Business.find({}).then(res => {
        response.json(res);
    })
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})