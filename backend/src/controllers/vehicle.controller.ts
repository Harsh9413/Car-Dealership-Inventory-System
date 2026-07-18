import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import vehicleService from "../services/vehicle.service";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  SearchVehicleDto,
  PurchaseVehicleDto,
  RestockVehicleDto,
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

export const searchVehicles = asyncHandler(
  async (req: Request, res: Response) => {
    const filters: SearchVehicleDto = {
      make: req.query.make as string | undefined,
      model: req.query.model as string | undefined,
      category: req.query.category as string | undefined,
      minPrice: req.query.minPrice
        ? Number(req.query.minPrice)
        : undefined,
      maxPrice: req.query.maxPrice
        ? Number(req.query.maxPrice)
        : undefined,
    };

    const vehicles = await vehicleService.searchVehicles(filters);

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

export const purchaseVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const purchaseData = req.body as PurchaseVehicleDto;

    const vehicle = await vehicleService.purchaseVehicle(
      id,
      purchaseData
    );

    res.status(200).json({
      success: true,
      message: "Vehicle purchased successfully",
      data: vehicle,
    });
  }
);

export const restockVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const restockData = req.body as RestockVehicleDto;

    const vehicle = await vehicleService.restockVehicle(
      id,
      restockData
    );

    res.status(200).json({
      success: true,
      message: "Vehicle restocked successfully",
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