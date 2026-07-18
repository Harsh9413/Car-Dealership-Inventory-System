import { Schema, model, HydratedDocument } from "mongoose";

export interface IVehicle {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export type VehicleDocument = HydratedDocument<IVehicle>;

const vehicleSchema = new Schema<IVehicle>(
  {
    make: {
      type: String,
      required: [true, "Make is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;