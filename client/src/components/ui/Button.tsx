import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "border border-border-strong text-primary hover:border-primary hover:bg-primary hover:text-[var(--color-surface-alt)] [.surface-dark_&]:hover:text-ink",
  ghost: "text-primary hover:bg-surface-alt [.surface-dark_&]:hover:bg-white/10",
} as const;

const sizes = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-7 text-base",
} as const;

const base =
  "btn group/btn inline-flex items-center justify-center gap-3 font-medium transition-colors duration-200 motion-reduce:transition-none";

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  isLoading?: boolean;
  /** Shows the sliding arrow used on primary calls to action. */
  arrow?: boolean;
} & ComponentPropsWithoutRef<"button">;

type LinkButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  href: string;
  arrow?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      width="20"
      height="12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 6h18M13 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  isLoading,
  disabled,
  children,
  arrow,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        base,
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...buttonProps}
    >
      {isLoading ? (
        "Please wait…"
      ) : (
        <>
          {children}
          {arrow ? <ArrowIcon className="btn-arrow" /> : null}
        </>
      )}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  arrow,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {arrow ? <ArrowIcon className="btn-arrow" /> : null}
    </Link>
  );
}
