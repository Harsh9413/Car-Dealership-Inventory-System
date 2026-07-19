import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Vehicle } from "../../types/vehicle.types";
import type { VehiclePayload } from "../../types/vehicle.types";
import { vehicleSchema } from "../../utils/vehicleSchema";
import type { VehicleFormData } from "../../utils/vehicleSchema";
import "./VehicleForm.css";

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
    formState: { errors },
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
      className="vehicle-form"
    >
      <div className="form-group">
        <label>Make</label>

        <input
          {...register("make")}
          className="form-input"
          placeholder="Toyota"
        />

        {errors.make && (
          <p className="form-error">
            {errors.make.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Model</label>

        <input
          {...register("model")}
          className="form-input"
          placeholder="Fortuner"
        />

        {errors.model && (
          <p className="form-error">
            {errors.model.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Category</label>

        <input
          {...register("category")}
          className="form-input"
          placeholder="SUV"
        />

        {errors.category && (
          <p className="form-error">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Price</label>

        <input
          type="number"
          {...register("price", {
            valueAsNumber: true,
          })}
          className="form-input"
          placeholder="4800000"
        />

        {errors.price && (
          <p className="form-error">
            {errors.price.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Quantity</label>

        <input
          type="number"
          {...register("quantity", {
            valueAsNumber: true,
          })}
          className="form-input"
          placeholder="10"
        />

        {errors.quantity && (
          <p className="form-error">
            {errors.quantity.message}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="cancel-btn"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
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