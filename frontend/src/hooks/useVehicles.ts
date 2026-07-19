import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../api/vehicle.api";

import type {
  Vehicle,
  VehiclePayload,
  UpdateVehiclePayload,
} from "../types/vehicle.types";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const response = await getVehicles();

      setVehicles(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch vehicles");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const addVehicle = async (payload: VehiclePayload) => {
    try {
      const response = await createVehicle(payload);

      toast.success(response.message);

      await fetchVehicles();

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create vehicle");
      }

      return false;
    }
  };

 const editVehicle = async (
  id: string,
  payload: UpdateVehiclePayload
) => {
    try {
      const response = await updateVehicle(id, payload);

      toast.success(response.message);

      await fetchVehicles();

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update vehicle");
      }

      return false;
    }
  };

  const removeVehicle = async (id: string) => {
    try {
      const response = await deleteVehicle(id);

      toast.success(response.message);

      await fetchVehicles();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete vehicle");
      }
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles,
    loading,
    fetchVehicles,
    addVehicle,
    editVehicle,
    removeVehicle,
  };
}