import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/httpErrors";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError(
      errors.array().map((error) => error.msg).join(", ")
    );
  }

  next();
};