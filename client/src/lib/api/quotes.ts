import type { ServiceSlug } from "@/types/service";
import { postJson } from "./client";

export type QuotePayload = {
  fullName: string;
  phone: string;
  email?: string;
  serviceCategory: ServiceSlug;
  projectDescription: string;
  projectLocation?: string;
  preferredContactMethod?: "phone" | "email" | "whatsapp";
  website?: string;
};

export function submitQuotationRequest(payload: QuotePayload) {
  return postJson("/quotes", {
    ...payload,
    website: payload.website ?? "",
  });
}
