import type { Vehicle } from "../../types/vehicle.types";

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
      <div className="py-10 text-center text-gray-500">
        Loading vehicles...
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="rounded-lg bg-white py-10 text-center shadow">
        <p className="text-lg text-gray-500">
          No vehicles found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Make</th>
            <th className="px-4 py-3 text-left">Model</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-center">Stock</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle._id}
              className="border-t transition-colors hover:bg-slate-50"
            >
              <td className="px-4 py-3">{vehicle.make}</td>

              <td className="px-4 py-3">{vehicle.model}</td>

              <td className="px-4 py-3">
                {vehicle.category}
              </td>

              <td className="px-4 py-3 text-right font-medium">
                ₹{vehicle.price.toLocaleString("en-IN")}
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    vehicle.quantity > 10
                      ? "bg-green-100 text-green-700"
                      : vehicle.quantity > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {vehicle.quantity}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => onPurchase(vehicle)}
                    className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition hover:bg-indigo-600"
                  >
                    Purchase
                  </button>

                  <button
                    onClick={() => onEdit(vehicle)}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => onRestock(vehicle)}
                        className="rounded bg-green-500 px-3 py-1 text-sm text-white transition hover:bg-green-600"
                      >
                        Restock
                      </button>

                      <button
                        onClick={() => onDelete(vehicle)}
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
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