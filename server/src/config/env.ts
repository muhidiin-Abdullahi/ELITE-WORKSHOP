import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function required(name: string, value: string | undefined): string {
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const nodeEnv = process.env.NODE_ENV ?? "development";
const isProduction = nodeEnv === "production";

export const env = {
  nodeEnv,
  isProduction,
  port: Number(process.env.PORT ?? 5010),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:3020",
  mongodbUri: process.env.MONGODB_URI ?? "",
} as const;

export function validateEnvForStartup(): void {
  if (Number.isNaN(env.port) || env.port <= 0) {
    throw new Error("PORT must be a positive number");
  }

  if (nodeEnv !== "test") {
    required("MONGODB_URI", process.env.MONGODB_URI);
  }

  if (isProduction) {
    required("CLIENT_URL", process.env.CLIENT_URL);
  }
}
