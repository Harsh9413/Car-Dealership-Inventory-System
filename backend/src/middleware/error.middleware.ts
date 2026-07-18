import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Handle custom application errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  // Handle Mongoose duplicate key error
  if ((err as any).code === 11000) {
    res.status(409).json({
      success: false,
      message: "Resource already exists",
    });

    return;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: err.message,
    });

    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};