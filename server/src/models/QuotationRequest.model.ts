import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { SERVICE_CATEGORY_SLUGS } from "../constants/serviceCategories";

const quotationRequestSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 320 },
    serviceCategory: {
      type: String,
      required: true,
      enum: SERVICE_CATEGORY_SLUGS,
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 8000,
    },
    projectLocation: { type: String, trim: true, maxlength: 200 },
    preferredContactMethod: {
      type: String,
      enum: ["phone", "email", "whatsapp"],
    },
    status: {
      type: String,
      required: true,
      default: "new",
      enum: ["new"],
    },
    source: { type: String, required: true, default: "quote", immutable: true },
    clientMeta: {
      ipHash: { type: String, maxlength: 64 },
      userAgent: { type: String, maxlength: 200 },
    },
  },
  {
    timestamps: true,
    strict: "throw",
  },
);

quotationRequestSchema.index({ createdAt: -1 });
quotationRequestSchema.index({ serviceCategory: 1, createdAt: -1 });

export type QuotationRequestDocument = InferSchemaType<
  typeof quotationRequestSchema
>;

export const QuotationRequestModel =
  mongoose.models.QuotationRequest ??
  mongoose.model(
    "QuotationRequest",
    quotationRequestSchema,
    "quotation_requests",
  );
