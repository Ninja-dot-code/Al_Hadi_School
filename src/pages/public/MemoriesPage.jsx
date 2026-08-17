import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Images, CalendarDays, Camera } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { CtaBanner } from "@/components/public/CtaBanner";
import { memoriesData } from "@/data/memories.data";

const categories = ["All", "Sports", "Academic", "Culture", "Events"];

export function MemoriesPage() {
  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const filtered =
    filter === "All" ? memoriesData : memoriesData.filter((m) => m.category === filter);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setActiveIndex((i) => (i + 1) % filtered.length);

  return (
    <div className="w-full flex flex-col">
      <PageHero
        eyebrow="Photo Gallery"
        title="Memories That Shape Our Story"
        subtitle="Visual archives of sports galas, annual exhibitions, cultural festivals, and student achievements across the years."
        crumb="Gallery"
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${
                  filter === cat
                    ? "bg-text-primary text-text-inverse border-text-primary"
                    : "bg-surface border-border text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((memory, idx) => (
              <button
                key={memory.id}
                type="button"
                onClick={() => openLightbox(idx)}
                className="group relative rounded-xl overflow-hidden bg-surface border border-border shadow-card hover:shadow-md transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Open ${memory.title}`}
              >
                <div className="h-56 w-full overflow-hidden bg-surface-tertiary">
                  <img
                    src={memory.cover}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/90">
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                      {memory.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {memory.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">{memory.title}</h3>
                  <p className="text-xs text-white/70 mt-0.5 inline-flex items-center gap-1">
                    <Camera className="size-3" />
                    {memory.count} photos
                  </p>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Images className="size-10 text-text-subtle mx-auto mb-3" />
              <p className="text-sm text-text-muted">No memories in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {activeIndex !== null && filtered[activeIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={filtered[activeIndex].title}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute top-5 right-5 size-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="size-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 size-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[activeIndex].image}
              alt={filtered[activeIndex].title}
              className="w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
            />
            <div className="mt-5 text-center">
              <h3 className="text-lg font-bold text-white">{filtered[activeIndex].title}</h3>
              <p className="text-xs text-white/70 mt-1">
                {filtered[activeIndex].category} · {filtered[activeIndex].date}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 size-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}

      <CtaBanner />
    </div>
  );
}