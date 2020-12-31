import { Request } from "express";

const getTokenFromRequest = (request: Request) => {  
    const authorization = request.get('authorization')  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
        return authorization.substring(7);
    }  
    return null;
}

export { getTokenFromRequest };