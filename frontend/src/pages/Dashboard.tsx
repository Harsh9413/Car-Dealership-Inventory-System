import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import VehicleTable from "../components/vehicle/VehicleTable";
import VehicleModal from "../components/vehicle/VehicleModal";
import VehicleForm from "../components/vehicle/VehicleForm";
import VehicleFilters from "../components/vehicle/VehicleFilters";

import { useVehicles } from "../hooks/useVehicles";
import { useAuth } from "../context/AuthContext";

import type {
  Vehicle,
  VehiclePayload,
} from "../types/vehicle.types";

function Dashboard() {
  const { user } = useAuth();

  const {
    vehicles,
    loading,
    fetchVehicles,
    filterVehicles,
    addVehicle,
    editVehicle,
    removeVehicle,
  } = useVehicles();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);

  const handleAdd = () => {
    setMode("create");
    setSelectedVehicle(null);
    setOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setMode("edit");
    setSelectedVehicle(vehicle);
    setOpen(true);
  };

  const handleDelete = async (vehicle: Vehicle) => {
    const confirmed = window.confirm(
      `Delete ${vehicle.make} ${vehicle.model}?`
    );

    if (!confirmed) return;

    await removeVehicle(vehicle._id);
  };

  const handlePurchase = (vehicle: Vehicle) => {
    console.log("Purchase:", vehicle);
  };

  const handleRestock = (vehicle: Vehicle) => {
    console.log("Restock:", vehicle);
  };

  const handleSubmit = async (
    data: VehiclePayload
  ): Promise<boolean> => {
    if (mode === "create") {
      return await addVehicle(data);
    }

    if (selectedVehicle) {
      return await editVehicle(selectedVehicle._id, data);
    }

    return false;
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Vehicle Dashboard
          </h2>

          {user?.role === "admin" && (
            <button
              onClick={handleAdd}
              className="rounded bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
            >
              + Add Vehicle
            </button>
          )}
        </div>

        <VehicleFilters
          onSearch={filterVehicles}
          onReset={fetchVehicles}
        />

        <VehicleTable
          vehicles={vehicles}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPurchase={handlePurchase}
          onRestock={handleRestock}
          isAdmin={user?.role === "admin"}
        />

        <VehicleModal
          open={open}
          title={
            mode === "create"
              ? "Add Vehicle"
              : "Edit Vehicle"
          }
          onClose={() => setOpen(false)}
        >
          <VehicleForm
            mode={mode}
            vehicle={selectedVehicle}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        </VehicleModal>
      </main>
    </>
  );
}

export default Dashboard;