import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import VehicleTable from "../components/vehicle/VehicleTable";

import { useVehicles } from "../hooks/useVehicles";
import { useAuth } from "../context/AuthContext";

import type { Vehicle } from "../types/vehicle.types";

function Dashboard() {
  const { user } = useAuth();

  const { vehicles, loading } = useVehicles();

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleDelete = (vehicle: Vehicle) => {
    console.log(vehicle);
  };

  const handlePurchase = (vehicle: Vehicle) => {
    console.log(vehicle);
  };

  const handleRestock = (vehicle: Vehicle) => {
    console.log(vehicle);
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Vehicle Dashboard</h2>

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