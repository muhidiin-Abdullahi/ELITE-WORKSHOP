type AlertVariant = "success" | "error" | "info";

const styles: Record<AlertVariant, string> = {
  success: "border-success bg-success-subtle",
  error: "border-error bg-error-subtle",
  info: "border-primary bg-surface-alt",
};

export function Alert({
  variant,
  title,
  children,
}: {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border-l-[5px] px-5 py-4 text-[#1d1d33] ${styles[variant]}`}
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      {title ? <p className="font-display text-2xl leading-tight">{title}</p> : null}
      <div className={title ? "mt-2 text-[0.9375rem]" : "text-[0.9375rem]"}>
        {children}
      </div>
    </div>
  );
}
