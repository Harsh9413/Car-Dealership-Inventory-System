import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Vehicle } from "../../types/vehicle.types";
import type { VehiclePayload } from "../../types/vehicle.types";
import { vehicleSchema } from "../../utils/vehicleSchema";
import type { VehicleFormData } from "../../utils/vehicleSchema";

interface VehicleFormProps {
  mode: "create" | "edit";
  vehicle?: Vehicle | null;

  onSubmit: (data: VehiclePayload) => Promise<boolean>;

  onClose: () => void;
}

function VehicleForm({
  mode,
  vehicle,
  onSubmit,
  onClose,
}: VehicleFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
    },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),

    defaultValues: {
      make: "",
      model: "",
      category: "",
      price: 0,
      quantity: 0,
    },
  });

  useEffect(() => {
    if (mode === "edit" && vehicle) {
      reset({
        make: vehicle.make,
        model: vehicle.model,
        category: vehicle.category,
        price: vehicle.price,
        quantity: vehicle.quantity,
      });
    }

    if (mode === "create") {
      reset({
        make: "",
        model: "",
        category: "",
        price: 0,
        quantity: 0,
      });
    }
  }, [vehicle, mode, reset]);

  const submitForm = async (data: VehicleFormData) => {
    try {
      setLoading(true);

      const success = await onSubmit(data);

      if (success) {
        reset();

        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-5"
    >
      {/* Make */}

      <div>
        <label className="mb-2 block font-medium">
          Make
        </label>

        <input
          {...register("make")}
          className="w-full rounded border p-3"
          placeholder="Toyota"
        />

        {errors.make && (
          <p className="mt-1 text-sm text-red-500">
            {errors.make.message}
          </p>
        )}
      </div>

      {/* Model */}

      <div>
        <label className="mb-2 block font-medium">
          Model
        </label>

        <input
          {...register("model")}
          className="w-full rounded border p-3"
          placeholder="Fortuner"
        />

        {errors.model && (
          <p className="mt-1 text-sm text-red-500">
            {errors.model.message}
          </p>
        )}
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <input
          {...register("category")}
          className="w-full rounded border p-3"
          placeholder="SUV"
        />

        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>
            {/* Price */}

      <div>
        <label className="mb-2 block font-medium">
          Price
        </label>

        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="w-full rounded border p-3"
          placeholder="4800000"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* Quantity */}

      <div>
        <label className="mb-2 block font-medium">
          Quantity
        </label>

        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          className="w-full rounded border p-3"
          placeholder="10"
        />

        {errors.quantity && (
          <p className="mt-1 text-sm text-red-500">
            {errors.quantity.message}
          </p>
        )}
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded bg-gray-200 px-5 py-2 font-medium hover:bg-gray-300 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Vehicle"
            : "Update Vehicle"}
        </button>
      </div>
    </form>
  );
}

export default VehicleForm;