import { Router } from "express";
import { postQuotationRequest } from "../controllers/quotes.controller";
import { asyncHandler } from "../middleware/asyncHandler";
import { inquiryRateLimiter } from "../middleware/inquiryRateLimiter";

export const quotesRouter = Router();

quotesRouter.post(
  "/quotes",
  inquiryRateLimiter,
  asyncHandler(postQuotationRequest),
);
