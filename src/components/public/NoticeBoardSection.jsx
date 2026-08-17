import { useState } from "react";
import { Link } from "react-router-dom";
import { noticesData } from "@/data/notices.data";
import { cn } from "@/lib/utils";
import { ArrowRight, Bell } from "lucide-react";

export function NoticeBoardSection() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "ACADEMIC", "CIRCULARS", "EVENTS"];

  const filteredNotices = noticesData.filter((notice) => {
    if (selectedCategory === "ALL") return true;
    return notice.category.toUpperCase() === selectedCategory;
  });

  const getCategoryBadgeClass = (category) => {
    const cat = category.toUpperCase();
    if (cat === "ACADEMIC") return "bg-primary-light text-primary border-primary/20";
    if (cat === "CIRCULARS") return "bg-success-light text-success-foreground border-success/20";
    if (cat === "EVENTS") return "bg-warning-light text-warning-foreground border-warning/20";
    return "bg-neutral-light text-neutral-foreground border-neutral/20";
  };

  return (
    <section className="py-20 bg-background border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Stay Updated
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
              Notice Board
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-surface p-1 rounded-full border border-border shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors",
                  selectedCategory === cat
                    ? "bg-text-primary text-text-inverse"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-tertiary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Notice Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="group bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Bar: Badge + Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border",
                      getCategoryBadgeClass(notice.category)
                    )}
                  >
                    {notice.category}
                  </span>
                  <span className="text-xs font-medium text-text-muted">
                    {notice.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                  {notice.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-text-secondary mt-2.5 line-clamp-3 leading-relaxed">
                  {notice.summary}
                </p>
              </div>

              {/* Link */}
              <div className="pt-4 mt-6 border-t border-border-light">
                <Link
                  to={`/notices#${notice.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="size-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
