"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { contactSuccessFallback } from "@/content/pages";
import { submitContactInquiry } from "@/lib/api/contact";
import { inputClassName, textareaClassName } from "@/lib/formStyles";
import {
  validateContactForm,
  type ContactFormValues,
} from "@/lib/validation/contact";

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
  preferredContactMethod: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update =
    (field: keyof ContactFormValues) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setFormError(null);
    };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validateContactForm(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const result = await submitContactInquiry({
      fullName: values.fullName.trim(),
      email: values.email.trim() || undefined,
      phone: values.phone.trim() || undefined,
      message: values.message.trim(),
      preferredContactMethod: values.preferredContactMethod || undefined,
      website: values.website,
    });

    setIsSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      setValues(initialValues);
      return;
    }

    if (result.fieldErrors) {
      setErrors(result.fieldErrors as Partial<Record<keyof ContactFormValues, string>>);
    }
    setFormError(result.message);
  }

  if (success) {
    return (
      <Alert variant="success" title="Message sent">
        {contactSuccessFallback}
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <p className="text-sm text-muted">
        Fields marked <span className="text-accent-text">*</span> are required. Provide
        at least one of email or phone.
      </p>
      {formError ? <Alert variant="error">{formError}</Alert> : null}

      <input
        type="text"
        name="website"
        value={values.website}
        onChange={update("website")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <FormField
        id="contact-fullName"
        label="Full name"
        required
        error={errors.fullName}
      >
        <input
          id="contact-fullName"
          name="fullName"
          className={inputClassName}
          value={values.fullName}
          onChange={update("fullName")}
          autoComplete="name"
          required
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={inputClassName}
            value={values.email}
            onChange={update("email")}
            autoComplete="email"
          />
        </FormField>
        <FormField id="contact-phone" label="Phone" error={errors.phone}>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className={inputClassName}
            value={values.phone}
            onChange={update("phone")}
            autoComplete="tel"
          />
        </FormField>
      </div>

      <FormField
        id="contact-message"
        label="Message"
        required
        error={errors.message}
      >
        <textarea
          id="contact-message"
          name="message"
          className={textareaClassName}
          value={values.message}
          onChange={update("message")}
          required
        />
      </FormField>

      <FormField
        id="contact-preferred"
        label="Preferred contact method"
        hint="Optional"
      >
        <select
          id="contact-preferred"
          name="preferredContactMethod"
          className={inputClassName}
          value={values.preferredContactMethod}
          onChange={update("preferredContactMethod")}
        >
          <option value="">No preference</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </FormField>

      <p className="text-sm text-muted">
        See our{" "}
        <Link
          href="/privacy"
          className="text-accent-text underline underline-offset-4 hover:no-underline"
        >
          Privacy Policy
        </Link>{" "}
        for how we handle inquiry information.
      </p>

      <Button
        type="submit"
        size="lg"
        arrow
        isLoading={isSubmitting}
        className="w-full sm:w-auto"
      >
        Send message
      </Button>
    </form>
  );
}
