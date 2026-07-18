import { Request, Response } from "express";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};