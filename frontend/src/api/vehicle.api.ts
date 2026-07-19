import api from "./axios";

export const getVehicles = async () => {
  const response = await api.get("/vehicles");
  return response.data;
};

export const getVehicleById = async (id: string) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (data: unknown) => {
  const response = await api.post("/vehicles", data);
  return response.data;
};

export const updateVehicle = async (id: string, data: unknown) => {
  const response = await api.put(`/vehicles/${id}`, data);
  return response.data;
};

export const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

export const searchVehicles = async (query: string) => {
  const response = await api.get(`/vehicles/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const purchaseVehicle = async (id: string, quantity: number) => {
  const response = await api.post(`/vehicles/${id}/purchase`, {
    quantity,
  });

  return response.data;
};

export const restockVehicle = async (id: string, quantity: number) => {
  const response = await api.post(`/vehicles/${id}/restock`, {
    quantity,
  });

  return response.data;
};