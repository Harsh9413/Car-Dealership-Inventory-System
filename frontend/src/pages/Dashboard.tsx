import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import VehicleTable from "../components/vehicle/VehicleTable";
import { getVehicles } from "../api/vehicle.api";

import type { Vehicle } from "../types/vehicle.types";

function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const response = await getVehicles();

      setVehicles(response.data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to load vehicles"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    console.log("Edit", vehicle);
  };

  const handleDelete = (vehicle: Vehicle) => {
    console.log("Delete", vehicle);
  };

  const handlePurchase = (vehicle: Vehicle) => {
    console.log("Purchase", vehicle);
  };

  const handleRestock = (vehicle: Vehicle) => {
    console.log("Restock", vehicle);
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Vehicle Dashboard
          </h2>

          <button className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700">
            + Add Vehicle
          </button>
        </div>

        <VehicleTable
          vehicles={vehicles}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPurchase={handlePurchase}
          onRestock={handleRestock}
          isAdmin={user?.role === "admin"}
        />
      </main>
    </>
  );
}

export default Dashboard;