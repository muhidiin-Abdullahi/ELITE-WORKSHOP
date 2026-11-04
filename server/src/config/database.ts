import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export async function connectDatabase(): Promise<void> {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  if (!env.mongodbUri) {
    throw new Error(
      "MONGODB_URI is not configured. Set it in server/.env before starting the API.",
    );
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.mongodbUri);
  isConnected = true;

  mongoose.connection.on("disconnected", () => {
    isConnected = false;
  });
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    return;
  }
  await mongoose.disconnect();
  isConnected = false;
}

export function isDatabaseReady(): boolean {
  return mongoose.connection.readyState === 1;
}
