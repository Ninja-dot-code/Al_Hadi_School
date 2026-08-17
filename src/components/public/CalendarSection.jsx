import { Link } from "react-router-dom";
import { siteContent } from "@/data/siteContent.data";
import { Clock, MapPin, Plus, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function CalendarSection() {
  const { upcomingEvents } = siteContent;

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Save the Date"
            title="Upcoming School Calendar"
            description="Key academic and co-curricular events for the current term."
            className="mb-0"
          />
          <Reveal>
            <Link
              to="/notices"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors whitespace-nowrap"
            >
              <span>Full Academic Calendar</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event, idx) => (
            <Reveal key={event.id} delay={idx * 80}>
              <div className="bg-surface border border-border rounded-xl p-5 sm:p-6 shadow-card hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="size-16 rounded-xl bg-primary-light text-primary flex flex-col items-center justify-center shrink-0 border border-primary/20">
                    <span className="text-xl font-black leading-none">{event.day}</span>
                    <span className="text-[11px] font-bold tracking-wider uppercase mt-1">
                      {event.month}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-text-primary">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mt-1.5 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-primary" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Added "${event.title}" to calendar reminder!`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-border bg-surface text-xs font-semibold text-text-primary hover:bg-surface-tertiary transition-colors shadow-xs shrink-0 self-stretch sm:self-auto justify-center"
                >
                  <Plus className="size-3.5 text-primary" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}