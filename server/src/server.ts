import { createApp } from "./app";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { env, validateEnvForStartup } from "./config/env";

async function start() {
  validateEnvForStartup();
  await connectDatabase();

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down...`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

start().catch((error) => {
  console.error("Failed to start API server");
  if (error instanceof Error && !env.isProduction) {
    console.error(error.message);
  }
  process.exit(1);
});
