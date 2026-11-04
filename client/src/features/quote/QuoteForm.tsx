"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { services } from "@/content/services";
import { quoteDisclaimer, quoteSuccessFallback } from "@/content/pages";
import { submitQuotationRequest } from "@/lib/api/quotes";
import { inputClassName, textareaClassName } from "@/lib/formStyles";
import { isServiceSlug, type ServiceSlug } from "@/types/service";
import {
  validateQuoteForm,
  type QuoteFormValues,
} from "@/lib/validation/quote";

function initialFromSearchParam(service: string | null): ServiceSlug | "" {
  return service && isServiceSlug(service) ? service : "";
}

export function QuoteForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const initialValues = useMemo<QuoteFormValues>(
    () => ({
      fullName: "",
      phone: "",
      email: "",
      serviceCategory: initialFromSearchParam(serviceParam),
      projectDescription: "",
      projectLocation: "",
      preferredContactMethod: "",
      website: "",
    }),
    [serviceParam],
  );

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof QuoteFormValues, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update =
    (field: keyof QuoteFormValues) =>
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

    const validation = validateQuoteForm(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    if (!isServiceSlug(values.serviceCategory)) {
      setErrors({ serviceCategory: "Select a service category." });
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const result = await submitQuotationRequest({
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || undefined,
      serviceCategory: values.serviceCategory,
      projectDescription: values.projectDescription.trim(),
      projectLocation: values.projectLocation.trim() || undefined,
      preferredContactMethod: values.preferredContactMethod || undefined,
      website: values.website,
    });

    setIsSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      setValues({ ...initialValues, serviceCategory: values.serviceCategory });
      return;
    }

    if (result.fieldErrors) {
      setErrors(result.fieldErrors as Partial<Record<keyof QuoteFormValues, string>>);
    }
    setFormError(result.message);
  }

  if (success) {
    return (
      <div className="space-y-4">
        <Alert variant="success" title="Inquiry received">
          {quoteSuccessFallback}
        </Alert>
        <p className="text-sm text-muted">{quoteDisclaimer}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <p className="text-sm leading-relaxed text-muted">
        Fields marked <span className="text-accent-text">*</span> are required.{" "}
        {quoteDisclaimer}
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

      <p className="border-t border-border pt-7 text-overline text-muted">
        Your details
      </p>

      <FormField
        id="quote-fullName"
        label="Full name"
        required
        error={errors.fullName}
      >
        <input
          id="quote-fullName"
          name="fullName"
          className={inputClassName}
          value={values.fullName}
          onChange={update("fullName")}
          autoComplete="name"
          required
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="quote-phone"
          label="Phone number"
          required
          error={errors.phone}
        >
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            className={inputClassName}
            value={values.phone}
            onChange={update("phone")}
            autoComplete="tel"
            required
          />
        </FormField>
        <FormField id="quote-email" label="Email" error={errors.email}>
          <input
            id="quote-email"
            name="email"
            type="email"
            className={inputClassName}
            value={values.email}
            onChange={update("email")}
            autoComplete="email"
          />
        </FormField>
      </div>

      <p className="mt-9! border-t border-border pt-7 text-overline text-muted">
        Your project
      </p>

      <FormField
        id="quote-service"
        label="Service category"
        required
        error={errors.serviceCategory}
      >
        <select
          id="quote-service"
          name="serviceCategory"
          className={inputClassName}
          value={values.serviceCategory}
          onChange={update("serviceCategory")}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="quote-description"
        label="Project description"
        required
        error={errors.projectDescription}
      >
        <textarea
          id="quote-description"
          name="projectDescription"
          className={textareaClassName}
          value={values.projectDescription}
          onChange={update("projectDescription")}
          required
        />
      </FormField>

      <FormField
        id="quote-location"
        label="Project location"
        hint="Optional"
        error={errors.projectLocation}
      >
        <input
          id="quote-location"
          name="projectLocation"
          className={inputClassName}
          value={values.projectLocation}
          onChange={update("projectLocation")}
        />
      </FormField>

      <FormField
        id="quote-preferred"
        label="Preferred contact method"
        hint="Optional"
      >
        <select
          id="quote-preferred"
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
        </Link>
        .
      </p>

      <Button
        type="submit"
        size="lg"
        arrow
        isLoading={isSubmitting}
        className="w-full sm:w-auto"
      >
        Submit quotation inquiry
      </Button>
    </form>
  );
}
