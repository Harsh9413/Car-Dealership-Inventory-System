import vehicleRepository from "../repositories/vehicle.repository";
import { VehicleDocument } from "../models/vehicle.model";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  SearchVehicleDto,
  PurchaseVehicleDto,
  RestockVehicleDto,
} from "../types/vehicle.types";
import {
  BadRequestError,
  NotFoundError,
} from "../utils/httpErrors";

class VehicleService {
  async createVehicle(
    vehicleData: CreateVehicleDto
  ): Promise<VehicleDocument> {
    return vehicleRepository.create(vehicleData);
  }

  async getAllVehicles(): Promise<VehicleDocument[]> {
    return vehicleRepository.findAll();
  }

  async searchVehicles(
    filters: SearchVehicleDto
  ): Promise<VehicleDocument[]> {
    return vehicleRepository.search(filters);
  }

  async getVehicleById(id: string): Promise<VehicleDocument> {
    const vehicle = await vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return vehicle;
  }

  async updateVehicle(
    id: string,
    vehicleData: UpdateVehicleDto
  ): Promise<VehicleDocument> {
    const vehicle = await vehicleRepository.update(id, vehicleData);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return vehicle;
  }

  async purchaseVehicle(
    id: string,
    purchaseData: PurchaseVehicleDto
  ): Promise<VehicleDocument> {
    const vehicle = await vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    if (purchaseData.quantity <= 0) {
      throw new BadRequestError(
        "Purchase quantity must be greater than zero"
      );
    }

    if (vehicle.quantity < purchaseData.quantity) {
      throw new BadRequestError("Insufficient vehicle stock");
    }

    const updatedVehicle = await vehicleRepository.update(id, {
      quantity: vehicle.quantity - purchaseData.quantity,
    });

    if (!updatedVehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return updatedVehicle;
  }

  async restockVehicle(
    id: string,
    restockData: RestockVehicleDto
  ): Promise<VehicleDocument> {
    const vehicle = await vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    if (restockData.quantity <= 0) {
      throw new BadRequestError(
        "Restock quantity must be greater than zero"
      );
    }

    const updatedVehicle = await vehicleRepository.update(id, {
      quantity: vehicle.quantity + restockData.quantity,
    });

    if (!updatedVehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return updatedVehicle;
  }

  async deleteVehicle(id: string): Promise<void> {
    const vehicle = await vehicleRepository.delete(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }
  }
}

export default new VehicleService();