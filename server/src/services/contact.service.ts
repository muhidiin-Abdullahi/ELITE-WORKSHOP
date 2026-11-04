import { isDatabaseReady } from "../config/database";
import { ContactInquiryModel } from "../models/ContactInquiry.model";
import { ApiError } from "../utils/ApiError";
import type { ContactInquiryInput } from "../validators/contact.schema";

type CreateContactParams = ContactInquiryInput & {
  clientMeta?: { ipHash?: string; userAgent?: string };
};

export async function createContactInquiry(
  params: CreateContactParams,
): Promise<void> {
  if (!isDatabaseReady()) {
    throw new ApiError(
      503,
      "SERVICE_UNAVAILABLE",
      "Unable to submit your request. Please try again or contact us directly.",
    );
  }

  try {
    await ContactInquiryModel.create({
      fullName: params.fullName,
      email: params.email,
      phone: params.phone,
      message: params.message,
      preferredContactMethod: params.preferredContactMethod,
      source: "contact",
      clientMeta: params.clientMeta,
    });
  } catch (error) {
    console.error("Contact inquiry persistence failed");
    throw new ApiError(
      503,
      "SERVICE_UNAVAILABLE",
      "Unable to submit your request. Please try again or contact us directly.",
    );
  }
}
