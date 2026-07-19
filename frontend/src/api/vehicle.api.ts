import api from "./axios";
import type {
  VehiclePayload,
  UpdateVehiclePayload,
} from "../types/vehicle.types";

export const getVehicles = async () => {
  const response = await api.get("/vehicles");
  return response.data;
};

export const createVehicle = async (data: VehiclePayload) => {
  const response = await api.post("/vehicles", data);
  return response.data;
};

export const updateVehicle = async (
  id: string,
  data: UpdateVehiclePayload
) => {
  const response = await api.put(`/vehicles/${id}`, data);
  return response.data;
};

export const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

export interface SearchVehicleParams {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const searchVehicles = async (
  params: SearchVehicleParams
) => {
  const response = await api.get("/vehicles/search", {
    params,
  });

  return response.data;
};
export const purchaseVehicle = async (
  id: string,
  quantity: number
) => {
  const response = await api.post(
    `/vehicles/${id}/purchase`,
    {
      quantity,
    }
  );

  return response.data;
};

export const restockVehicle = async (
  id: string,
  quantity: number
) => {
  const response = await api.post(
    `/vehicles/${id}/restock`,
    {
      quantity,
    }
  );

  return response.data;
};