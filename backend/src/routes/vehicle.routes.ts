import { Router } from "express";

import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";

import {
  createVehicleValidator,
  updateVehicleValidator,
} from "../validator/vehicle.validator";

import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeAdmin } from "../middleware/admin.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  createVehicleValidator,
  validate,
  createVehicle
);

router.get(
  "/",
  authenticate,
  getAllVehicles
);

router.get(
  "/:id",
  authenticate,
  getVehicleById
);

router.put(
  "/:id",
  authenticate,
  updateVehicleValidator,
  validate,
  updateVehicle
);

router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteVehicle
);

export default router;