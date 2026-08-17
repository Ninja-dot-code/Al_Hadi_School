import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/data/siteContent.data";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function TalentsSection() {
  const [featured, ...rest] = siteContent.coCurricular;

  return (
    <section className="py-20 sm:py-24 bg-background border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Beyond Academics"
          title="Nurturing Talents in Every Direction"
          description="Our Life Skills & Activities (LSA) program ensures every student finds their passion and builds lifelong confidence."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured program — larger, horizontal */}
          <Reveal className="lg:row-span-1">
            <Link
              to={featured.link}
              className="group flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-md transition-all"
            >
              <div className="h-64 lg:h-80 w-full overflow-hidden bg-surface-tertiary">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2.5 leading-relaxed">
                  {featured.description}
                </p>
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                    <span>{featured.linkText}</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Secondary programs — stacked, compact */}
          <div className="flex flex-col gap-8">
            {rest.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 100} className="flex-1">
                <Link
                  to={item.link}
                  className="group flex flex-col sm:flex-row h-full bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-md transition-all"
                >
                  <div className="sm:w-2/5 h-44 sm:h-auto w-full overflow-hidden bg-surface-tertiary shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                        <span>{item.linkText}</span>
                        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}