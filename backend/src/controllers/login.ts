import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';

import User from '../models/user';
import { getTokenFromRequest } from "../utils";
import { jwtType } from '../types';


const loginRouter = Router();

loginRouter.post('/', async (request: Request, response: Response ) => {
    const sessionToken = getTokenFromRequest(request);
    if (sessionToken) {
      try { 
        const decodedToken = jwt.verify(sessionToken, process.env.SECRET_KEY as string) as jwtType;
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'Token invalid' });
        } else {
          response.status(200).send({ token: sessionToken });      
        }
      } catch (err) {
        return response.status(401).json({ error: 'Please login' });
      }
    } else {
      const body = request.body;
      const user = await User.findOne({ username: body.username });
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash?.toString() as string);

      if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'Invalid username or password'
        });
      }

      const userForToken = {
        username: user.username.toString(),
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET_KEY as string);

      response.status(200).send({ token, user: user.username });
    }
  }
);

export default loginRouter;