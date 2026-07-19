import { useState } from "react";
import type { SearchVehicleParams } from "../../api/vehicle.api";
import "./VehicleFilters.css";

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
    <div className="vehicle-filters">
      <div className="filter-grid">
  <input
    placeholder="Make"
    className="filter-input"
    onChange={(e) =>
      setFilters({
        ...filters,
        make: e.target.value,
      })
    }
  />

  <input
    placeholder="Model"
    className="filter-input"
    onChange={(e) =>
      setFilters({
        ...filters,
        model: e.target.value,
      })
    }
  />

  <input
    placeholder="Category"
    className="filter-input"
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
    className="filter-input"
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
    className="filter-input"
    onChange={(e) =>
      setFilters({
        ...filters,
        maxPrice: Number(e.target.value),
      })
    }
  />

  <div className="filter-actions">
    <button
      onClick={() => onSearch(filters)}
      className="search-btn"
    >
      Search
    </button>

    <button
      onClick={onReset}
      className="reset-btn"
    >
      Reset
    </button>
  </div>
</div>

    </div>
  );
}

export default VehicleFilters;