import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import loginRouter from "./controllers/login";
import registerRouter from "./controllers/register";
import manageRouter from "./controllers/manage";


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
app.use('/api/manage', manageRouter);

// app.post('/api/order', (request: Request, response: Response) => {
//     Business.find({}).then(res => {
//         // mongoose.connection.close();
//         response.json(res);
//     })
// });

// app.get('/api/order', (request: Request, response: Response) => {
//     Business.find({}).then(res => {
//         response.json(res);
//     })
// });

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})