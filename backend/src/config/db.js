import mongoose from "mongoose";
import "dotenv/config.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected `);
  } catch (error) {
    console.log(`Error connecting Database`, error.message);
    process.exit(1)
  }
};
