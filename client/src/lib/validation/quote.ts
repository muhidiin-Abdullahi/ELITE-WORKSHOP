import { isServiceSlug, type ServiceSlug } from "@/types/service";

export type QuoteFormValues = {
  fullName: string;
  phone: string;
  email: string;
  serviceCategory: ServiceSlug | "";
  projectDescription: string;
  projectLocation: string;
  preferredContactMethod: "" | "phone" | "email" | "whatsapp";
  website: string;
};

export type QuoteFormErrors = Partial<Record<keyof QuoteFormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (values.website.trim()) {
    errors.website = "Invalid submission.";
  }

  const name = values.fullName.trim();
  if (name.length < 2 || name.length > 100) {
    errors.fullName = "Enter your name (2–100 characters).";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (phone.length < 6 || phone.length > 30) {
    errors.phone = "Enter a valid phone number.";
  }

  const email = values.email.trim();
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.serviceCategory || !isServiceSlug(values.serviceCategory)) {
    errors.serviceCategory = "Select a service category.";
  }

  const description = values.projectDescription.trim();
  if (description.length < 20 || description.length > 8000) {
    errors.projectDescription =
      "Project description must be between 20 and 8000 characters.";
  }

  const location = values.projectLocation.trim();
  if (location && (location.length < 2 || location.length > 200)) {
    errors.projectLocation = "Location must be between 2 and 200 characters.";
  }

  return errors;
}
