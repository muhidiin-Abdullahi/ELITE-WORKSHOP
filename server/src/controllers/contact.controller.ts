import type { Request, Response } from "express";
import { createContactInquiry } from "../services/contact.service";
import { ApiError } from "../utils/ApiError";
import { buildClientMeta } from "../utils/clientMeta";
import { zodToApiError } from "../utils/validationError";
import { contactInquirySchema } from "../validators/contact.schema";

export async function postContactInquiry(req: Request, res: Response) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    throw new ApiError(400, "VALIDATION_ERROR", "Invalid input.");
  }

  const parsed = contactInquirySchema.safeParse(req.body);
  if (!parsed.success) {
    throw zodToApiError(parsed.error);
  }

  await createContactInquiry({
    ...parsed.data,
    clientMeta: buildClientMeta(req),
  });

  res.status(201).json({
    success: true,
    data: null,
    meta: res.locals.requestId ? { requestId: res.locals.requestId } : undefined,
  });
}
