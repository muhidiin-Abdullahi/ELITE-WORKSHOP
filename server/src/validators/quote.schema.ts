import { z } from "zod";
import { SERVICE_CATEGORY_SLUGS } from "../constants/serviceCategories";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const preferredContactMethod = z.enum(["phone", "email", "whatsapp"]);

export const quotationRequestSchema = z
  .object({
    fullName: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(6).max(30),
    email: z.string().trim().max(320).optional(),
    serviceCategory: z.enum(SERVICE_CATEGORY_SLUGS),
    projectDescription: z.string().trim().min(20).max(8000),
    projectLocation: z.string().trim().max(200).optional(),
    preferredContactMethod: preferredContactMethod.optional(),
    website: z.string().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.website && data.website.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid submission.",
        path: ["website"],
      });
    }

    const email = data.email?.trim() ?? "";
    if (email && !EMAIL_RE.test(email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid email address.",
        path: ["email"],
      });
    }

    const location = data.projectLocation?.trim() ?? "";
    if (location && (location.length < 2 || location.length > 200)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Location must be between 2 and 200 characters.",
        path: ["projectLocation"],
      });
    }
  })
  .transform((data) => ({
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || undefined,
    serviceCategory: data.serviceCategory,
    projectDescription: data.projectDescription.trim(),
    projectLocation: data.projectLocation?.trim() || undefined,
    preferredContactMethod: data.preferredContactMethod,
  }));

export type QuotationRequestInput = z.infer<typeof quotationRequestSchema>;
