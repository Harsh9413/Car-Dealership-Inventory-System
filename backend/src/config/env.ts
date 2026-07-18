import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
] as const;

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  PORT: Number(process.env.PORT),
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
};