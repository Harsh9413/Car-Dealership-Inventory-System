import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

export default router;