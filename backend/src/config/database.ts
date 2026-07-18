import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
};