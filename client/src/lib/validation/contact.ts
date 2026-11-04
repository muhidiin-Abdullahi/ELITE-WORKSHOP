export type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  preferredContactMethod: "" | "phone" | "email" | "whatsapp";
  website: string;
};

export type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.website.trim()) {
    errors.website = "Invalid submission.";
  }

  const name = values.fullName.trim();
  if (name.length < 2 || name.length > 100) {
    errors.fullName = "Enter your name (2–100 characters).";
  }

  const email = values.email.trim();
  const phone = values.phone.trim();
  if (!email && !phone) {
    errors.email = "Enter an email or phone number.";
    errors.phone = "Enter a phone number or email.";
  }
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (phone && (phone.length < 6 || phone.length > 30)) {
    errors.phone = "Enter a valid phone number.";
  }

  const message = values.message.trim();
  if (message.length < 10 || message.length > 5000) {
    errors.message = "Message must be between 10 and 5000 characters.";
  }

  return errors;
}
