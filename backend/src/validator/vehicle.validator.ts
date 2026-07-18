import { body } from "express-validator";

const vehicleCategories = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Truck",
  "Van",
  "Coupe",
  "Convertible",
  "Wagon",
  "Electric",
  "Hybrid",
];

export const createVehicleValidator = [
  body("make")
    .trim()
    .notEmpty()
    .withMessage("Make is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Make must be between 2 and 50 characters"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Model must be between 1 and 50 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn(vehicleCategories)
    .withMessage("Invalid vehicle category"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

export const updateVehicleValidator = [
  body("make")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Make must be between 2 and 50 characters"),

  body("model")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Model must be between 1 and 50 characters"),

  body("category")
    .optional()
    .trim()
    .isIn(vehicleCategories)
    .withMessage("Invalid vehicle category"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

export const purchaseVehicleValidator = [
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

export const restockVehicleValidator = [
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];