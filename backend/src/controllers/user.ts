import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";
import User from "../models/user";


const getTokenFrom = (request: Request) => {  
    const authorization = request.get('authorization')  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
        return authorization.substring(7);
    }  
    return null;
}

const userRouter = Router();

interface jwtType {
    id: string;
}

userRouter.get('/', async (request: Request, response: Response) => {
    const token = getTokenFrom(request);
    if (!token) {
        return response.status(401).json({ error: 'token missing' });    
    } 
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwtType;
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }
    const user = await User.findById(decodedToken.id);
    response.json(user);
});

export default userRouter;