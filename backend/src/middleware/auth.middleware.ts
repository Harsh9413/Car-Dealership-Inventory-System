import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/httpErrors";
import { verifyToken } from "../utils/jwt";
import userRepository from "../repositories/user.repository";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Access token is required");
  }

  const token = authHeader.split(" ")[1];

  const payload = verifyToken(token);

  const user = await userRepository.findById(payload.userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  req.user = user;

  next();
};