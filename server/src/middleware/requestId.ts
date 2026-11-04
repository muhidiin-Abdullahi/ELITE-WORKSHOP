import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

export function requestIdMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.locals.requestId = randomUUID();
  next();
}
