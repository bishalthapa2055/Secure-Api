import { NotAuthorizedError } from "../errors/not-authorized-error";
import { Request, Response, NextFunction } from "express";
import { Role } from "../types/role";
import { User } from "../../model/user";
import { ForbiddenError } from "../errors/forbidden-error";

export const authorization =
  (roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.userData!.role)) {
      throw new ForbiddenError();
    }
    next();
  };
