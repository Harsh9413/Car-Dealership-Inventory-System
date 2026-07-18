import { Router } from "express";

import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  searchVehicles,
  purchaseVehicle,
  restockVehicle,
} from "../controllers/vehicle.controller";

import {
  createVehicleValidator,
  updateVehicleValidator,
  purchaseVehicleValidator,
  restockVehicleValidator,
} from "../validator/vehicle.validator";

import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeAdmin } from "../middleware/admin.middleware";

const router = Router();

// Create Vehicle (User & Admin)
router.post(
  "/",
  authenticate,
  createVehicleValidator,
  validate,
  createVehicle
);

// Search Vehicles (User & Admin)
// IMPORTANT: Place before "/:id"
router.get(
  "/search",
  authenticate,
  searchVehicles
);

// Get All Vehicles (User & Admin)
router.get(
  "/",
  authenticate,
  getAllVehicles
);

// Get Vehicle by ID (User & Admin)
router.get(
  "/:id",
  authenticate,
  getVehicleById
);

// Update Vehicle (User & Admin)
router.put(
  "/:id",
  authenticate,
  updateVehicleValidator,
  validate,
  updateVehicle
);

// Purchase Vehicle (User & Admin)
router.post(
  "/:id/purchase",
  authenticate,
  purchaseVehicleValidator,
  validate,
  purchaseVehicle
);

// Restock Vehicle (Admin Only)
router.post(
  "/:id/restock",
  authenticate,
  authorizeAdmin,
  restockVehicleValidator,
  validate,
  restockVehicle
);

// Delete Vehicle (Admin Only)
router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteVehicle
);

export default router;