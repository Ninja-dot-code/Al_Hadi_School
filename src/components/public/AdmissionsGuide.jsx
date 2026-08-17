import { siteContent } from "@/data/siteContent.data";

export function AdmissionsGuide() {
  const { admissionsGuide } = siteContent;

  return (
    <section className="py-20 bg-surface border-b border-border-light text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Enrollment
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2 mb-16">
          Step-by-Step Admissions Guide
        </h2>

        {/* 4 Steps Timeline Container */}
        <div className="relative">
          {/* Connecting Line behind steps (hidden on mobile) */}
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-border -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {admissionsGuide.map((step) => (
              <div
                key={step.step}
                className="flex flex-col items-center text-center group"
              >
                {/* Number Circle Badge */}
                <div className="size-14 rounded-full bg-surface border-2 border-primary text-primary flex items-center justify-center text-lg font-bold shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-4">
                  {step.step}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
