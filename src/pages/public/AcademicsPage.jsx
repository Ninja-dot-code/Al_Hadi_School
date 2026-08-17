import { useState } from "react";
import {
  Lightbulb,
  ClipboardCheck,
  MonitorSmartphone,
  HeartHandshake,
  BookOpen,
  Check,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/public/PageHero";
import { CtaBanner } from "@/components/public/CtaBanner";
import { siteContent } from "@/data/siteContent.data";
import { cn } from "@/lib/utils";

const approachIcons = {
  Lightbulb: Lightbulb,
  ClipboardCheck: ClipboardCheck,
  MonitorSmartphone: MonitorSmartphone,
  HeartHandshake: HeartHandshake,
};

export function AcademicsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { academicsPage, academicPrograms } = siteContent;

  const tabs = [
    { id: "all", label: "All Programs" },
    { id: "middle", label: "Middle" },
    { id: "secondary", label: "Secondary" },
    { id: "stem", label: "STEM Wings" },
  ];

  const filteredPrograms =
    activeTab === "all"
      ? academicPrograms
      : academicPrograms.filter((p) => p.id === activeTab);

  return (
    <div className="w-full flex flex-col">
      <PageHero
        eyebrow={academicsPage.heroEyebrow}
        title={academicsPage.heroTitle}
        subtitle={academicsPage.heroSubtitle}
        crumb="Academics"
      />

      {/* Learning approach */}
      <section className="py-20 bg-background border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">How We Teach</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
              {academicsPage.approachTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicsPage.approach.map((item) => {
              const Icon = approachIcons[item.icon] || Lightbulb;
              return (
                <div
                  key={item.title}
                  className="group bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="size-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-surface border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Curriculum</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
                Academic Programs
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-surface-tertiary p-1 rounded-full border border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold transition-colors",
                    activeTab === tab.id
                      ? "bg-text-primary text-text-inverse"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className="group bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-52 w-full overflow-hidden bg-surface-tertiary relative">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-text-primary shadow-xs">
                    {prog.grades}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Subjects */}
                  <div className="mt-5 pt-5 border-t border-border-light">
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                      Subjects
                    </p>
                    <ul className="space-y-2">
                      {prog.subjects.map((subject) => (
                        <li key={subject} className="flex items-start gap-2.5 text-xs text-text-secondary">
                          <span className="size-4 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-2.5 text-primary" />
                          </span>
                          <span>{subject}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div className="mt-5 pt-5 border-t border-border-light">
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                      Highlights
                    </p>
                    <ul className="space-y-2">
                      {prog.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-xs text-text-secondary">
                          <span className="size-4 rounded-full bg-success-light flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-2.5 text-success-foreground" />
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border-light">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <span>Enquire About This Program</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LSA strip */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-primary-muted border border-border p-8 sm:p-12 text-center">
            <div className="mx-auto size-14 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-5">
              <BookOpen className="size-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Life Skills & Activities — at Every Grade
            </h3>
            <p className="text-sm sm:text-base text-text-secondary mt-3 max-w-2xl mx-auto leading-relaxed">
              Academics are only half the story. Our LSA program develops confidence, teamwork, and character through athletics, creative arts, clubs, and leadership — all assessed and reported on every result card.
            </p>
            <div className="mt-7">
              <Link
                to="/activities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                <span>Explore LSA Activities</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}