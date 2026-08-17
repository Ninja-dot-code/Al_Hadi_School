import { Link } from "react-router-dom";
import { siteContent } from "@/data/siteContent.data";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";

export function CalendarSection() {
  const { upcomingEvents } = siteContent;

  return (
    <section className="py-20 bg-background border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Save the Date
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
              Upcoming School Calendar
            </h2>
          </div>

          <Link
            to="/notices"
            className="text-xs sm:text-sm font-bold text-primary hover:underline self-start sm:self-auto"
          >
            Full Academic Calendar →
          </Link>
        </div>

        {/* Events Cards Stack */}
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-surface border border-border rounded-xl p-5 shadow-card hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Left: Date Badge + Event Title & Details */}
              <div className="flex items-center gap-5">
                {/* Date Pill / Badge */}
                <div className="size-16 rounded-xl bg-primary-light text-primary flex flex-col items-center justify-center shrink-0 border border-primary/20">
                  <span className="text-xl font-black leading-none">{event.day}</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase mt-1">
                    {event.month}
                  </span>
                </div>

                {/* Event Info */}
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

              {/* Right Action Button */}
              <button
                type="button"
                onClick={() => alert(`Added "${event.title}" to calendar reminder!`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-border bg-surface text-xs font-semibold text-text-primary hover:bg-surface-tertiary transition-colors shadow-xs shrink-0 self-stretch sm:self-auto justify-center"
              >
                <Plus className="size-3.5 text-primary" />
                <span>Add to Calendar</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
