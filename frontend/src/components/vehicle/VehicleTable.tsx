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

  if (!vehicles.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        No vehicles found.
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
              className="border-t hover:bg-slate-50"
            >
              <td className="px-4 py-3">{vehicle.make}</td>
              <td className="px-4 py-3">{vehicle.model}</td>
              <td className="px-4 py-3">{vehicle.category}</td>

              <td className="px-4 py-3 text-right">
                ₹{vehicle.price.toLocaleString("en-IN")}
              </td>

              <td className="px-4 py-3 text-center">
                {vehicle.quantity}
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => onPurchase(vehicle)}
                    className="rounded bg-indigo-500 px-3 py-1 text-sm text-white hover:bg-indigo-600"
                  >
                    Purchase
                  </button>

                  <button
                    onClick={() => onEdit(vehicle)}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => onRestock(vehicle)}
                        className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                      >
                        Restock
                      </button>

                      <button
                        onClick={() => onDelete(vehicle)}
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
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