import Vehicle, { VehicleDocument } from "../models/vehicle.model";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "../types/vehicle.types";

class VehicleRepository {
  async create(
    vehicleData: CreateVehicleDto
  ): Promise<VehicleDocument> {
    return Vehicle.create(vehicleData);
  }

  async findAll(): Promise<VehicleDocument[]> {
    return Vehicle.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<VehicleDocument | null> {
    return Vehicle.findById(id);
  }

  async update(
    id: string,
    vehicleData: UpdateVehicleDto
  ): Promise<VehicleDocument | null> {
    return Vehicle.findByIdAndUpdate(id, vehicleData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<VehicleDocument | null> {
    return Vehicle.findByIdAndDelete(id);
  }
}

export default new VehicleRepository();