import mongoose from "mongoose";

let isConnected = false;

export async function connectDatabase() {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = Boolean(db.connections[0].readyState);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}