import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';

import User from '../models/user';


const loginRouter = Router();

loginRouter.post('/', async (request: Request, response: Response ) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash?.toString() as string);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username.toString(),
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_KEY as string);

  response
    .status(200)
    .send({ token });
})

export default loginRouter;