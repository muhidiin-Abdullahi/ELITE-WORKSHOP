import { Router } from "express";
import { postContactInquiry } from "../controllers/contact.controller";
import { asyncHandler } from "../middleware/asyncHandler";
import { inquiryRateLimiter } from "../middleware/inquiryRateLimiter";

export const contactRouter = Router();

contactRouter.post(
  "/contact",
  inquiryRateLimiter,
  asyncHandler(postContactInquiry),
);
