import type { ZodError } from "zod";
import { ApiError } from "./ApiError";

export function zodToApiError(error: ZodError): ApiError {
  const fields = error.issues.map((issue) => ({
    path: issue.path.join(".") || "body",
    message: issue.message,
  }));

  return new ApiError(
    400,
    "VALIDATION_ERROR",
    "Invalid input.",
    fields,
  );
}
