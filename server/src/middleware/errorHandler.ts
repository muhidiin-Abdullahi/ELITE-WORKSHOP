import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const requestId = res.locals.requestId as string | undefined;

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.fields ? { fields: err.fields } : {}),
      },
      meta: requestId ? { requestId } : undefined,
    });
    return;
  }

  if (!env.isProduction && err instanceof Error) {
    console.error(err);
  } else if (env.isProduction) {
    console.error("Unhandled error");
  }

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred.",
    },
    meta: requestId ? { requestId } : undefined,
  });
}
