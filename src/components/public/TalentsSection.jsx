import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteContent } from "@/data/siteContent.data";

export function TalentsSection() {
  return (
    <section className="py-20 bg-background border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Split Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Beyond Academics
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
              Nurturing Talents in <br className="hidden sm:inline" />
              Every Direction
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-secondary max-w-md">
            Our comprehensive Life Skills & Activities (LSA) program ensures every student finds their passion and builds lifelong confidence.
          </p>
        </div>

        {/* 3 Co-Curricular Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.coCurricular.map((item) => (
            <div
              key={item.id}
              className="group bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="h-52 w-full overflow-hidden bg-surface-tertiary">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
                >
                  <span>{item.linkText}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
