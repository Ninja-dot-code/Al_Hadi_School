import { Link } from "react-router-dom";
import { noticesData } from "@/data/notices.data";
import { cn } from "@/lib/utils";
import { ArrowRight, Bell, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

function getCategoryBadgeClass(category) {
  const cat = category.toUpperCase();
  if (cat === "ACADEMIC") return "bg-primary-light text-primary border-primary/20";
  if (cat === "CIRCULARS") return "bg-success-light text-success-foreground border-success/20";
  if (cat === "EVENTS") return "bg-warning-light text-warning-foreground border-warning/20";
  return "bg-neutral-light text-neutral-foreground border-neutral/20";
}

export function NoticeBoardSection() {
  const recentNotices = noticesData.slice(0, 3);

  return (
    <section className="py-20 sm:py-24 bg-background border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Stay Updated"
            title="Notice Board"
            description="Official announcements, date sheets, and circulars from the school office."
            className="mb-0"
          />
          <Reveal>
            <Link
              to="/notices"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors whitespace-nowrap"
            >
              <span>View All Notices</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-card">
          {recentNotices.map((notice, idx) => (
            <Reveal key={notice.id} delay={idx * 60}>
              <Link
                to={`/notices#${notice.slug}`}
                className={cn(
                  "group flex items-start gap-4 sm:gap-6 px-6 py-5 transition-colors hover:bg-surface-tertiary/70",
                  idx !== recentNotices.length - 1 && "border-b border-border-light"
                )}
              >
                <div className="hidden sm:flex items-center justify-center size-12 rounded-lg bg-primary-muted text-primary shrink-0">
                  <Bell className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-1">
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
                  <h3 className="text-sm sm:text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed line-clamp-2">
                    {notice.summary}
                  </p>
                </div>
                <ArrowRight className="size-4 text-primary shrink-0 mt-1.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}