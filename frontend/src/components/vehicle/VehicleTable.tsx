import type { Vehicle } from "../../types/vehicle.types";
import "./VehicleTable.css";

interface VehicleTableProps {
  vehicles: Vehicle[];
  loading: boolean;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
  onPurchase: (vehicle: Vehicle) => void;
  onRestock: (vehicle: Vehicle) => void;
  isAdmin: boolean;
}

function VehicleTable({
  vehicles,
  loading,
  onEdit,
  onDelete,
  onPurchase,
  onRestock,
  isAdmin,
}: VehicleTableProps) {
  if (loading) {
    return (
      <div className="table-loading">
        Loading vehicles...
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="table-empty">
        <h3>No vehicles found</h3>
        <p>Add your first vehicle to get started.</p>
      </div>
    );
  }

  return (
    <div className="vehicle-table-wrapper">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Category</th>
            <th className="text-right">Price</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.make}</td>

              <td>{vehicle.model}</td>

              <td>
                <span className="category-badge">
                  {vehicle.category}
                </span>
              </td>

              <td className="price-cell">
                ₹{vehicle.price.toLocaleString("en-IN")}
              </td>

              <td className="stock-cell">
                <span
                  className={`stock-badge ${
                    vehicle.quantity > 10
                      ? "stock-high"
                      : vehicle.quantity > 0
                      ? "stock-medium"
                      : "stock-low"
                  }`}
                >
                  {vehicle.quantity}
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onPurchase(vehicle)}
                    className="purchase-btn"
                  >
                    Purchase
                  </button>

                  <button
                    onClick={() => onEdit(vehicle)}
                    className="edit-btn"
                  >
                    Edit
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => onRestock(vehicle)}
                        className="restock-btn"
                      >
                        Restock
                      </button>

                      <button
                        onClick={() => onDelete(vehicle)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleTable;