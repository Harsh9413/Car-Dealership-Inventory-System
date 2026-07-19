import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { searchVehicles } from "../api/vehicle.api";
import type { SearchVehicleParams } from "../api/vehicle.api";
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
        toast.error(
          error.response?.data?.message ?? "Failed to fetch vehicles"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const addVehicle = async (
    payload: VehiclePayload
  ): Promise<boolean> => {
    try {
      const response = await createVehicle(payload);

      toast.success(response.message);

      await fetchVehicles();

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to create vehicle"
        );
      } else {
        toast.error("Something went wrong");
      }

      return false;
    }
  };

  const editVehicle = async (
    id: string,
    payload: UpdateVehiclePayload
  ): Promise<boolean> => {
    try {
      const response = await updateVehicle(id, payload);

      toast.success(response.message);

      await fetchVehicles();

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to update vehicle"
        );
      } else {
        toast.error("Something went wrong");
      }

      return false;
    }
  };

  const removeVehicle = async (
    id: string
  ): Promise<boolean> => {
    try {
      const response = await deleteVehicle(id);

      toast.success(response.message);

      await fetchVehicles();

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to delete vehicle"
        );
      } else {
        toast.error("Something went wrong");
      }

      return false;
    }
  };

  const filterVehicles = async (
  filters: SearchVehicleParams
): Promise<void> => {
  try {
    setLoading(true);

    const response = await searchVehicles(filters);

    setVehicles(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ??
          "Failed to search vehicles"
      );
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles,
    loading,
    fetchVehicles,
    filterVehicles,
    addVehicle,
    editVehicle,
    removeVehicle,
  };
}