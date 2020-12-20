import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";

import User from "../models/user";


const registerRouter = Router();

registerRouter.post('/', async (request, response) => {
    const body = request.body;
    if (!body.username || !body.password) {
        response.status(400).end();
    } else {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        
        const user = new User({
            username: body.username,
            email: body.email,
            passwordHash,
        });
        try {
            const savedUser = await user.save();
            response.json(savedUser);
        } catch (error) {
            console.log(error);
            response.status(400).send({error: "Username already taken"}).end();
        }
    }
});

export default registerRouter;