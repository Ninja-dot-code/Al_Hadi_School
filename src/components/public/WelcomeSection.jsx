import { Quote } from "lucide-react";
import { siteContent } from "@/data/siteContent.data";

export function WelcomeSection() {
  const { principal } = siteContent;

  return (
    <section className="py-20 bg-surface border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Principal Photo & Bio (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative w-full max-w-sm">
              {/* Photo Card with Border */}
              <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-surface p-2">
                <img
                  src={principal.image}
                  alt={principal.name}
                  className="w-full h-80 object-cover rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Principal Name & Title Tag */}
              <div className="mt-4 flex items-center justify-between px-2">
                <div>
                  <h4 className="text-base font-bold text-text-primary">
                    {principal.name}
                  </h4>
                  <p className="text-xs text-text-muted font-medium">
                    {principal.title}
                  </p>
                </div>
                {/* Decorative Seal / Signature Mark */}
                <div className="font-serif italic text-sm font-semibold text-primary">
                  {principal.name}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message & Vision (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quote Icon */}
            <div className="size-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
              <Quote className="size-6 rotate-180" />
            </div>

            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              {principal.welcomeHeading}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed">
              {principal.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* LSA Highlight Badge / Card */}
            <div className="bg-primary-muted border-l-4 border-primary rounded-r-xl p-4 text-xs sm:text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">Holistic LSA Framework: </span>
              {principal.lsaNote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
