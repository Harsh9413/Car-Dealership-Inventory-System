import Vehicle, { VehicleDocument } from "../models/vehicle.model";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  SearchVehicleDto,
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

  async search(filters: SearchVehicleDto): Promise<VehicleDocument[]> {
  const query: Record<string, unknown> = {};

  if (filters.make) {
    query.make = {
      $regex: filters.make,
      $options: "i",
    };
  }

  if (filters.model) {
    query.model = {
      $regex: filters.model,
      $options: "i",
    };
  }

  if (filters.category) {
    query.category = {
      $regex: filters.category,
      $options: "i",
    };
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};

    if (filters.minPrice !== undefined) {
      (query.price as Record<string, number>).$gte = filters.minPrice;
    }

    if (filters.maxPrice !== undefined) {
      (query.price as Record<string, number>).$lte = filters.maxPrice;
    }
  }

  return Vehicle.find(query).sort({
    createdAt: -1,
  });
}
}

export default new VehicleRepository();