import { isDatabaseReady } from "../config/database";
import { QuotationRequestModel } from "../models/QuotationRequest.model";
import { ApiError } from "../utils/ApiError";
import type { QuotationRequestInput } from "../validators/quote.schema";

type CreateQuoteParams = QuotationRequestInput & {
  clientMeta?: { ipHash?: string; userAgent?: string };
};

export async function createQuotationRequest(
  params: CreateQuoteParams,
): Promise<void> {
  if (!isDatabaseReady()) {
    throw new ApiError(
      503,
      "SERVICE_UNAVAILABLE",
      "Unable to submit your request. Please try again or contact us directly.",
    );
  }

  try {
    await QuotationRequestModel.create({
      fullName: params.fullName,
      phone: params.phone,
      email: params.email,
      serviceCategory: params.serviceCategory,
      projectDescription: params.projectDescription,
      projectLocation: params.projectLocation,
      preferredContactMethod: params.preferredContactMethod,
      status: "new",
      source: "quote",
      clientMeta: params.clientMeta,
    });
  } catch (error) {
    console.error("Quotation request persistence failed");
    throw new ApiError(
      503,
      "SERVICE_UNAVAILABLE",
      "Unable to submit your request. Please try again or contact us directly.",
    );
  }
}
