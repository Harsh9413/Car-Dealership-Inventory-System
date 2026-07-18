export interface CreateVehicleDto {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

export interface UpdateVehicleDto {
  make?: string;
  model?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export interface SearchVehicleDto {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface PurchaseVehicleDto {
  quantity: number;
}

export interface RestockVehicleDto {
  quantity: number;
}