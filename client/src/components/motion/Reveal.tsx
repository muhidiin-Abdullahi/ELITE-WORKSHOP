"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  /** Initial vertical offset in pixels */
  offsetY?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  offsetY = 28,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const revealIfInView = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        setVisible(true);
        observer.disconnect();
        return true;
      }
      return false;
    };

    if (!revealIfInView()) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-is-visible" : ""} ${className}`.trim()}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${offsetY}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
