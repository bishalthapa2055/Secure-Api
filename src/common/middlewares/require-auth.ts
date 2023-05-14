import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { User } from "../../model/user";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  const existUserData = await User.findById(req.currentUser.id);
  if (!existUserData) {
    throw new NotAuthorizedError();
  }
  req.userData = existUserData;
  next();
};
