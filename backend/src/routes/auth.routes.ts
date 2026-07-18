import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { registerValidator } from "../validator/auth.validator";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

export default router;