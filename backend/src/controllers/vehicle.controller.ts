import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import vehicleService from "../services/vehicle.service";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "../types/vehicle.types";

export const createVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const vehicleData = req.body as CreateVehicleDto;

    const vehicle = await vehicleService.createVehicle(vehicleData);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  }
);

export const getAllVehicles = asyncHandler(
  async (_req: Request, res: Response) => {
    const vehicles = await vehicleService.getAllVehicles();

    res.status(200).json({
      success: true,
      data: vehicles,
    });
  }
);

export const getVehicleById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const vehicle = await vehicleService.getVehicleById(id);

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  }
);

export const updateVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const vehicleData = req.body as UpdateVehicleDto;

    const vehicle = await vehicleService.updateVehicle(
      id,
      vehicleData
    );

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  }
);

export const deleteVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await vehicleService.deleteVehicle(id);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  }
);