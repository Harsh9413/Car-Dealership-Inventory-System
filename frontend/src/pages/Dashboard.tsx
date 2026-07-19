import { useState } from "react";
import './Dashboard.css';
import Navbar from "../components/layout/Navbar";
import VehicleTable from "../components/vehicle/VehicleTable";
import VehicleModal from "../components/vehicle/VehicleModal";
import VehicleForm from "../components/vehicle/VehicleForm";
import VehicleFilters from "../components/vehicle/VehicleFilters";
import PurchaseModal from "../components/vehicle/PurchaseModal";
import { useVehicles } from "../hooks/useVehicles";
import { useAuth } from "../context/AuthContext";
import RestockModal from "../components/vehicle/RestockModal";
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
    purchase,
    restock,
  } = useVehicles();

  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [purchaseVehicle, setPurchaseVehicle] =
    useState<Vehicle | null>(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);
  const [restockOpen, setRestockOpen] = useState(false);

  const [restockVehicle, setRestockVehicle] =
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
    setPurchaseVehicle(vehicle);
    setPurchaseOpen(true);
  };
  const handlePurchaseConfirm = async (
    quantity: number
  ): Promise<boolean> => {
    if (!purchaseVehicle) return false;

    return await purchase(
      purchaseVehicle._id,
      quantity
    );
  };

  const handleRestock = (vehicle: Vehicle) => {
    setRestockVehicle(vehicle);
    setRestockOpen(true);
  };

  const handleRestockConfirm = async (
    quantity: number
  ): Promise<boolean> => {
    if (!restockVehicle) return false;

    return await restock(
      restockVehicle._id,
      quantity
    );
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

      <main className="dashboard-page">
  <div className="dashboard-container">
    <div className="dashboard-header">
      <div className="dashboard-title">
        <h1>Vehicle Dashboard</h1>
        <p>Manage and monitor your dealership inventory.</p>
      </div>

      {user?.role === "admin" && (
        <button
          onClick={handleAdd}
          className="dashboard-add-btn"
        >
          + Add Vehicle
        </button>
      )}
    </div>

    <div className="dashboard-card">
      <VehicleFilters
        onSearch={filterVehicles}
        onReset={fetchVehicles}
      />
    </div>

    <div className="dashboard-table-card">
      <VehicleTable
        vehicles={vehicles}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPurchase={handlePurchase}
        onRestock={handleRestock}
        isAdmin={user?.role === "admin"}
      />
    </div>

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

    <PurchaseModal
      open={purchaseOpen}
      vehicleName={
        purchaseVehicle
          ? `${purchaseVehicle.make} ${purchaseVehicle.model}`
          : ""
      }
      onClose={() => {
        setPurchaseOpen(false);
        setPurchaseVehicle(null);
      }}
      onConfirm={handlePurchaseConfirm}
    />

    <RestockModal
      open={restockOpen}
      vehicleName={
        restockVehicle
          ? `${restockVehicle.make} ${restockVehicle.model}`
          : ""
      }
      onClose={() => {
        setRestockOpen(false);
        setRestockVehicle(null);
      }}
      onConfirm={handleRestockConfirm}
    />
  </div>
</main>
    </>
  );
}

export default Dashboard;