import { Request, Response } from "express";
import authService from "../services/auth.service";
import { RegisterUserDto } from "../types/auth.types";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const userData: RegisterUserDto = req.body;

    const user = await authService.register(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  }
);