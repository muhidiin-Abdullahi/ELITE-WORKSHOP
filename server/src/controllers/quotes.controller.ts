import type { Request, Response } from "express";
import { createQuotationRequest } from "../services/quotes.service";
import { ApiError } from "../utils/ApiError";
import { buildClientMeta } from "../utils/clientMeta";
import { zodToApiError } from "../utils/validationError";
import { quotationRequestSchema } from "../validators/quote.schema";

export async function postQuotationRequest(req: Request, res: Response) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    throw new ApiError(400, "VALIDATION_ERROR", "Invalid input.");
  }

  const parsed = quotationRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw zodToApiError(parsed.error);
  }

  await createQuotationRequest({
    ...parsed.data,
    clientMeta: buildClientMeta(req),
  });

  res.status(201).json({
    success: true,
    data: null,
    meta: res.locals.requestId ? { requestId: res.locals.requestId } : undefined,
  });
}
