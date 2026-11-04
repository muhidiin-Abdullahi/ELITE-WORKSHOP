"use client";

import { useEffect, useState } from "react";

/** Subtle page enter — inspired by scroll-driven marketing sites (e.g. travel booking UIs). */
export default function RouteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      requestAnimationFrame(() => setEntered(true));
      return;
    }
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={entered ? "motion-route-enter" : "motion-route-pending"}>
      {children}
    </div>
  );
}
