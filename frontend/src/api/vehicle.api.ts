import api from "./axios";
import type { VehiclePayload } from "../hooks/useVehicles";

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
  data: Partial<VehiclePayload>
) => {
  const response = await api.put(`/vehicles/${id}`, data);
  return response.data;
};

export const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};