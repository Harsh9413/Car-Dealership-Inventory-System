import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import vehicleRoutes from "./routes/vehicle.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/auth", authRoutes);

// Global Error Handler (always last)
app.use(errorHandler);

export default app;