import { z } from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(2, "Make is required"),
  model: z.string().min(2, "Model is required"),
  category: z.string().min(2, "Category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;