import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../utils/httpErrors";

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    throw new ForbiddenError("Access denied");
  }

  if (req.user.role !== "admin") {
    throw new ForbiddenError("Admin access required");
  }

  next();
};