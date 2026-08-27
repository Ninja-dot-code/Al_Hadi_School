import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/public/PageHero";
import { CtaBanner } from "@/components/public/CtaBanner";
import { siteContent } from "@/data/siteContent.data";

export function CurriculumPage() {
  return (
    <div className="w-full flex flex-col">
      <PageHero
        title="Curriculum"
        subtitle="Explore the learning journey from middle school foundations to board exam preparation, with STEM and life skills woven throughout."
        crumb="Curriculum"
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {siteContent.academicPrograms.map((program) => (
              <article
                key={program.id}
                className="bg-surface border border-border rounded-xl overflow-hidden shadow-card flex flex-col"
              >
                <div className="h-52 overflow-hidden bg-surface-tertiary">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{program.grades}</span>
                  <h2 className="text-xl font-bold text-text-primary mt-2">{program.name}</h2>
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed">{program.description}</p>

                  <div className="mt-6 pt-5 border-t border-border-light">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Core subjects</h3>
                    <ul className="space-y-2">
                      {program.subjects.map((subject) => (
                        <li key={subject} className="flex items-start gap-2.5 text-sm text-text-secondary">
                          <span className="size-4 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-2.5 text-primary" />
                          </span>
                          <span>{subject}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="mt-auto pt-6 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
                  >
                    Ask about this program
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}