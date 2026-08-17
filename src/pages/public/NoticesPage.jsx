import { useState } from "react";
import { Bell, CalendarDays, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { CtaBanner } from "@/components/public/CtaBanner";
import { noticesData } from "@/data/notices.data";
import { cn } from "@/lib/utils";

const categories = ["ALL", "ACADEMIC", "CIRCULARS", "EVENTS"];

function getCategoryBadgeClass(category) {
  const cat = category.toUpperCase();
  if (cat === "ACADEMIC") return "bg-primary-light text-primary border-primary/20";
  if (cat === "CIRCULARS") return "bg-success-light text-success-foreground border-success/20";
  if (cat === "EVENTS") return "bg-warning-light text-warning-foreground border-warning/20";
  return "bg-neutral-light text-neutral-foreground border-neutral/20";
}

export function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredNotices = noticesData.filter((notice) => {
    if (selectedCategory === "ALL") return true;
    return notice.category.toUpperCase() === selectedCategory;
  });

  return (
    <div className="w-full flex flex-col">
      <PageHero
        eyebrow="Notice Board"
        title="Official Announcements & Circulars"
        subtitle="Date sheets, exam schedules, circulars, and event updates from the school office — all in one place."
        crumb="Notices"
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-bold border transition-all",
                  selectedCategory === cat
                    ? "bg-text-primary text-text-inverse border-text-primary"
                    : "bg-surface border-border text-text-secondary hover:border-primary hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notice list */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredNotices.map((notice) => (
              <article
                key={notice.id}
                id={notice.slug}
                className="group bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-card hover:shadow-md transition-all scroll-mt-32"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border",
                      getCategoryBadgeClass(notice.category)
                    )}
                  >
                    {notice.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
                    <CalendarDays className="size-3.5" />
                    {notice.date}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {notice.title}
                </h2>

                <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                  {notice.summary}
                </p>

                <details className="mt-4 group/details">
                  <summary className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer select-none">
                    <span>Read Full Notice</span>
                    <ArrowUpRight className="size-3.5 group-open/details:rotate-45 transition-transform" />
                  </summary>
                  <div className="mt-3 pt-4 border-t border-border-light">
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {notice.detail}
                    </p>
                  </div>
                </details>
              </article>
            ))}

            {filteredNotices.length === 0 && (
              <div className="text-center py-16">
                <Bell className="size-10 text-text-subtle mx-auto mb-3" />
                <p className="text-sm text-text-muted">No notices in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}