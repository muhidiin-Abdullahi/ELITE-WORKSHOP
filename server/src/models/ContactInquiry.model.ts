import mongoose, { Schema, type InferSchemaType } from "mongoose";

const contactInquirySchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, trim: true, lowercase: true, maxlength: 320 },
    phone: { type: String, trim: true, maxlength: 30 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    preferredContactMethod: {
      type: String,
      enum: ["phone", "email", "whatsapp"],
    },
    source: { type: String, required: true, default: "contact", immutable: true },
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

contactInquirySchema.index({ createdAt: -1 });

contactInquirySchema.pre("validate", function validateContactChannels(next) {
  if (!this.email && !this.phone) {
    next(new Error("Either email or phone is required."));
  } else {
    next();
  }
});

export type ContactInquiryDocument = InferSchemaType<typeof contactInquirySchema>;

export const ContactInquiryModel =
  mongoose.models.ContactInquiry ??
  mongoose.model("ContactInquiry", contactInquirySchema, "contact_inquiries");
