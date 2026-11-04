"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TitleBlock } from "@/components/ui/TitleBlock";
import type { HeroSlide } from "@/content/heroSlides";

const SLIDE_INTERVAL_MS = 5000;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function HeroHeadline({
  words,
  accentIndex,
}: {
  words: string[];
  accentIndex: number;
}) {
  return (
    <p className="text-display text-primary" aria-hidden="true">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={index === accentIndex ? "italic text-accent-text" : undefined}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

type HomeHeroProps = {
  slides: HeroSlide[];
  description: string;
};

export function HomeHero({ slides, description }: HomeHeroProps) {
  const slideCount = slides.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [paused, setPaused] = useState(false);

  const slide = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      const target = ((index % slideCount) + slideCount) % slideCount;
      if (target === activeIndex) return;
      setPreviousIndex(activeIndex);
      setActiveIndex(target);
    },
    [activeIndex, slideCount],
  );

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (reduceMotion || slideCount <= 1 || paused) return;

    const id = window.setInterval(next, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, slideCount, paused, next]);

  if (!slide) {
    return null;
  }

  const autoplaying = !reduceMotion && !paused && slideCount > 1;

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      aria-labelledby="home-hero-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <h1 id="home-hero-heading" className="sr-only">
        {slide.headlineWords.join(" ")} — {slide.subtitle}
      </h1>

      <div className="shell grid gap-10 pb-10 pt-10 md:pt-14 lg:min-h-[calc(100dvh-9.625rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-8">
        {/* Copy */}
        <div className="lg:col-span-7 lg:pr-10">
          <div key={`copy-${activeIndex}`} className="hero-copy-in">
            <Eyebrow>{slide.eyebrow}</Eyebrow>
            <div className="mt-6 lg:min-h-[3em] lg:text-[clamp(3rem,6vw,6rem)]">
              <HeroHeadline
                words={slide.headlineWords}
                accentIndex={slide.headlineAccentIndex}
              />
            </div>
          </div>
          <p className="mt-7 max-w-xl text-body-lg text-muted">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote" arrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View Projects
            </ButtonLink>
          </div>
        </div>

        {/* Framed photo: slides change like a sliding door opening. */}
        <div
          className="relative mx-auto w-full max-w-[34rem] lg:col-span-5 lg:max-w-none"
          aria-live="polite"
          aria-atomic="true"
        >
          <p
            className="dimension-line mb-4 text-overline max-sm:tracking-[0.06em]"
            aria-hidden="true"
          >
            Measured · Built · Installed
          </p>
          <div className="window-frame aspect-[4/5] lg:aspect-auto lg:h-[min(calc(100dvh-16rem),44rem)] lg:min-h-[26rem]">
            <div className="window-frame-glass">
              {slides.map((item, index) => {
                const isActive = index === activeIndex;
                const isPrevious = index === previousIndex;
                return (
                  <div
                    key={item.image.src}
                    className={`absolute inset-0 ${
                      isActive
                        ? `z-20 ${previousIndex !== null ? "hero-door-open" : ""}`
                        : isPrevious
                          ? "z-10"
                          : "opacity-0"
                    }`}
                  >
                    <Image
                      src={item.image.src}
                      alt={isActive ? item.image.alt : ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 92vw, 42vw"
                      loading={index === 0 ? "eager" : undefined}
                      fetchPriority={index === 0 ? "high" : undefined}
                    />
                  </div>
                );
              })}
              {previousIndex !== null ? (
                <span
                  key={`rail-${activeIndex}`}
                  className="hero-door-rail"
                  aria-hidden="true"
                />
              ) : null}
              <span className="window-frame-mullion" aria-hidden="true" />
            </div>
          </div>
          <TitleBlock
            className="relative z-40 mx-4 -mt-10 lg:absolute lg:bottom-6 lg:-left-8 lg:mx-0 lg:mt-0 lg:w-[19rem] xl:-left-20"
            heading={slide.title}
            reference={`${pad(activeIndex + 1)}/${pad(slideCount)}`}
            rows={[
              { label: "Service", value: slide.subtitle },
              ...slide.highlights
                .slice(0, 2)
                .map((item) => ({ label: item.label, value: item.detail })),
            ]}
          />
        </div>
      </div>

      {/* Slide index */}
      <div className="border-t border-border">
        <div
          className="shell flex gap-6 overflow-x-auto lg:grid lg:grid-cols-6"
          role="tablist"
          aria-label="Featured project slides"
        >
          {slides.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.image.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${item.title}, ${item.subtitle}`}
                onClick={() => goTo(index)}
                className="group relative flex min-w-[11rem] shrink-0 items-center gap-2.5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus lg:min-w-0"
              >
                <span
                  className="absolute inset-x-0 top-[-1px] h-[3px] overflow-hidden"
                  aria-hidden="true"
                >
                  {isActive ? (
                    <span
                      key={`${activeIndex}-${autoplaying}`}
                      className={`block h-full w-full bg-brand-red ${autoplaying ? "hero-progress" : ""}`}
                      style={
                        {
                          "--hero-interval": `${SLIDE_INTERVAL_MS}ms`,
                        } as CSSProperties
                      }
                    />
                  ) : null}
                </span>
                <span className="relative block h-10 w-10 shrink-0 overflow-hidden bg-surface-alt lg:hidden xl:block">
                  <Image
                    src={item.image.src}
                    alt=""
                    fill
                    className="img-zoom object-cover"
                    sizes="40px"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-overline text-muted">
                    {pad(index + 1)}
                  </span>
                  <span
                    className={`mt-0.5 block truncate text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted group-hover:text-primary"
                    }`}
                  >
                    {item.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
