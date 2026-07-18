import vehicleRepository from "../repositories/vehicle.repository";
import { VehicleDocument } from "../models/vehicle.model";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "../types/vehicle.types";
import { NotFoundError } from "../utils/httpErrors";

class VehicleService {
  async createVehicle(
    vehicleData: CreateVehicleDto
  ): Promise<VehicleDocument> {
    return vehicleRepository.create(vehicleData);
  }

  async getAllVehicles(): Promise<VehicleDocument[]> {
    return vehicleRepository.findAll();
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

  async deleteVehicle(id: string): Promise<void> {
    const vehicle = await vehicleRepository.delete(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }
  }
}

export default new VehicleService();