import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const preferredContactMethod = z.enum(["phone", "email", "whatsapp"]);

export const contactInquirySchema = z
  .object({
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().max(320).optional(),
    phone: z.string().trim().max(30).optional(),
    message: z.string().trim().min(10).max(5000),
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
    const phone = data.phone?.trim() ?? "";
    if (!email && !phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter an email or phone number.",
        path: ["email"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a phone number or email.",
        path: ["phone"],
      });
    }

    if (email && !EMAIL_RE.test(email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid email address.",
        path: ["email"],
      });
    }

    if (phone && (phone.length < 6 || phone.length > 30)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid phone number.",
        path: ["phone"],
      });
    }
  })
  .transform((data) => ({
    fullName: data.fullName.trim(),
    email: data.email?.trim() || undefined,
    phone: data.phone?.trim() || undefined,
    message: data.message.trim(),
    preferredContactMethod: data.preferredContactMethod,
  }));

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
