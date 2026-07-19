import { useState } from "react";
import type { SearchVehicleParams } from "../../api/vehicle.api";

interface Props {
  onSearch: (filters: SearchVehicleParams) => void;
  onReset: () => void;
}

function VehicleFilters({
  onSearch,
  onReset,
}: Props) {
  const [filters, setFilters] =
    useState<SearchVehicleParams>({});

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 md:grid-cols-5">
      <input
        placeholder="Make"
        className="rounded border p-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            make: e.target.value,
          })
        }
      />

      <input
        placeholder="Model"
        className="rounded border p-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            model: e.target.value,
          })
        }
      />

      <input
        placeholder="Category"
        className="rounded border p-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            category: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Min Price"
        className="rounded border p-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            minPrice: Number(e.target.value),
          })
        }
      />

      <input
        type="number"
        placeholder="Max Price"
        className="rounded border p-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            maxPrice: Number(e.target.value),
          })
        }
      />

      <div className="col-span-full flex gap-3">
        <button
          onClick={() => onSearch(filters)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Search
        </button>

        <button
          onClick={onReset}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default VehicleFilters;