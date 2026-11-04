import { postJson } from "./client";

export type ContactPayload = {
  fullName: string;
  email?: string;
  phone?: string;
  message: string;
  preferredContactMethod?: "phone" | "email" | "whatsapp";
  website?: string;
};

export function submitContactInquiry(payload: ContactPayload) {
  return postJson("/contact", {
    ...payload,
    website: payload.website ?? "",
  });
}
