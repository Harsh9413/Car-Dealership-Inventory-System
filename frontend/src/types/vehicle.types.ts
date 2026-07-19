export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type VehiclePayload = Pick<
  Vehicle,
  "make" | "model" | "category" | "price" | "quantity"
>;

export type UpdateVehiclePayload = Partial<VehiclePayload>;