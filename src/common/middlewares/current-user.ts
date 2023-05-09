import { NotAuthorizedError } from "../errors/not-authorized-error";
import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { UserDoc } from "../../model/user";

interface UserPayload {
  id: string;
  email: string;
  iat: string;
  exp: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
      userData?: UserDoc;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }
  const jwtToken = req.headers.authorization.split(" ")[1];
  try {
    const payload = Jwt.verify(jwtToken, "key") as unknown as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    throw new NotAuthorizedError();
  }
  next();
};
