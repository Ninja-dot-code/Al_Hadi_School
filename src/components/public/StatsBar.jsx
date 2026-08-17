import { siteContent } from "@/data/siteContent.data";

export function StatsBar() {
  return (
    <section className="py-12 bg-surface-secondary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {siteContent.stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center px-4 py-3 flex flex-col items-center justify-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-text-muted mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
