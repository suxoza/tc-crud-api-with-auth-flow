import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

const secret = 'temporary-secret'

export const generateToken = (id: any) => jwt.sign({ id }, secret, { expiresIn: '12h' })

const getTokenFromHeader = (req: Request) => {
  return (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) ? 
      req.headers.authorization.split(' ')[1]:
      false
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  try {
    let access_token = getTokenFromHeader(req)

    if(!access_token)throw "Missing token header"
    let jwtPayload = <any>jwt.verify(access_token, secret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.log(error)
    res.status(401).send(error);
    return;
  }

  next();
};

