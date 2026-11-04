export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-brand-red"
    >
      Skip to main content
    </a>
  );
}
