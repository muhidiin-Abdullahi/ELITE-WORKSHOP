import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy =
    [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control =
    isValidElement(children) ?
      cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required ? true : undefined,
      })
    : children;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="block text-sm font-medium text-primary">
          {label}
          {required ? (
            <span className="text-accent-text" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
        {hint ? (
          <p id={hintId} className="text-overline text-muted">
            {hint}
          </p>
        ) : null}
      </div>
      {control}
      {error ? (
        <p id={errorId} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
