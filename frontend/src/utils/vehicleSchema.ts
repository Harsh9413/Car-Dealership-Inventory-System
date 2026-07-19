import { z } from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be greater than 0"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;