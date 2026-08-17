import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  FileCheck2,
  ReceiptText,
  BookOpen,
  FileText,
} from "lucide-react";
import { siteContent } from "@/data/siteContent.data";
import { dummyImages } from "@/lib/dummyImages";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const actionIcons = {
  GraduationCap: GraduationCap,
  FileCheck2: FileCheck2,
  ReceiptText: ReceiptText,
  BookOpen: BookOpen,
};

export function HeroSection() {
  const getIcon = (iconName) => {
    const Icon = actionIcons[iconName] || FileText;
    return <Icon className="size-5" />;
  };

  const slides = dummyImages.heroSlides || [dummyImages.pageHeroBg];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      {/* 1. HERO — auto-rotating campus images + clean hierarchy */}
      <section className="relative min-h-screen overflow-hidden text-white flex items-center">
        {/* Background image slider layer */}
        <div className="absolute inset-0 z-0">
          {slides.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden={index !== activeIndex}
              className={cn(
                "absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-out",
                index === activeIndex ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
          {/* Depth scrim — dark toward text, image stays visible above */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
        </div>

        {/* Centered content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            <Reveal delay={80}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold     tracking-tight leading-[1.06] drop-shadow-sm">
                Welcome to{" "}
                <span className="text-primary-light ">Al-Hadi School.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                {siteContent.heroSubtitle}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Slider dots — pinned to bottom of hero */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-2">
            {slides.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-white"
                    : "w-3 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2. QUICK LINKS STRIP — refined, quiet, one line each */}
      <section className="bg-surface border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {siteContent.quickActions.map((action) => (
              <Link
                key={action.id}
                to={action.link}
                className="group flex items-center gap-3.5 px-5 py-5 transition-colors hover:bg-surface-tertiary/70"
              >
                <span className="size-10 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {getIcon(action.icon)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-text-primary transition-colors group-hover:text-primary">
                    {action.title}
                  </span>
                  <span className="block text-xs text-text-muted mt-0.5 truncate">
                    {action.subtitle}
                  </span>
                </span>
                <ArrowRight className="size-4 text-primary shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}