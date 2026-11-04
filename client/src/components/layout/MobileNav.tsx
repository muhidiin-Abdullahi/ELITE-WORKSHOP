"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { mobileNavLinks } from "./MainNav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className={`relative z-[60] inline-flex h-11 items-center gap-3 px-1 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          open
            ? "text-white focus-visible:outline-white"
            : "text-primary focus-visible:outline-focus"
        }`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close menu" : "Menu"}
        <span className="relative block h-3 w-7" aria-hidden="true">
          <span
            className={`absolute left-0 h-[3px] w-full bg-current transition-transform duration-300 motion-reduce:transition-none ${
              open ? "top-[5px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-[3px] w-full bg-brand-red transition-transform duration-300 motion-reduce:transition-none ${
              open ? "top-[5px] -rotate-45 bg-current" : "top-[9px]"
            }`}
          />
        </span>
      </button>
      {open ? (
        <>
          <button
            type="button"
            className="menu-scrim fixed inset-0 z-40 bg-ink/50"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <nav
            id={panelId}
            className="menu-panel surface-dark fixed inset-y-0 right-0 z-50 flex w-[min(100%,26rem)] flex-col overflow-y-auto px-6 pb-8 pt-24"
            aria-label="Mobile"
          >
            <ul className="border-t border-border">
              {mobileNavLinks(pathname).map((link, index) => (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    className={`flex items-baseline gap-4 py-4 font-display text-[2rem] leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                      link.isActive ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                    aria-current={link.isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={`text-overline ${link.isActive ? "text-accent-text" : "text-muted"}`}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <ButtonLink
                href="/quote"
                size="lg"
                arrow
                className="w-full justify-between"
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </ButtonLink>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
