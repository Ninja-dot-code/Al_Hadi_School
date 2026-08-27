import { Link } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  Cpu,
  ArrowRight,
  Target,
  Eye,
  History,
  Quote,
} from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { CtaBanner } from "@/components/public/CtaBanner";
import { siteContent } from "@/data/siteContent.data";
import { StaffCard } from "@/components/shared/StaffCard";

const valueIcons = {
  GraduationCap: GraduationCap,
  ShieldCheck: ShieldCheck,
  HeartHandshake: HeartHandshake,
  Cpu: Cpu,
};

export function AboutPage() {
  const { about, principal } = siteContent;

  return (
    <div className="w-full flex flex-col">
      <PageHero
        title="About Us"
        subtitle={about.heroSubtitle}
        crumb="About Us"
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-surface border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-muted rounded-xl p-6 sm:p-8 border border-border">
              <div className="size-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-5">
     
                <Eye className="size-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Mission</span>
              <p className="mt-3 text-text-secondary leading-relaxed text-sm sm:text-base">
                {about.vision}
              </p>
            </div>
            <div className="bg-surface-tertiary rounded-xl p-6 sm:p-8 border border-border">
              <div className="size-12 rounded-xl bg-surface flex items-center justify-center text-primary mb-5 shadow-card">
                <Target className="size-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Our Vision</span>
              <p className="mt-3 text-text-secondary leading-relaxed text-sm sm:text-base">
                {about.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="size-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                <History className="size-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed">
                {about.story.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <div className="bg-primary-muted border-l-4 border-primary rounded-r-xl p-4 text-xs sm:text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">From the Principal: </span>
                {principal.lsaNote}
              </div>
            </div>

            {/* Milestones timeline */}
            <div className="lg:col-span-5">
              <div className="bg-surface border border-border rounded-xl shadow-card p-6 sm:p-8">
                <h3 className="text-lg font-bold text-text-primary mb-6">
                  Milestones
                </h3>
                <ol className="relative space-y-6 border-l border-border pl-6">
                  {about.milestones.map((m) => (
                    <li key={m.year} className="relative">
                      <span className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary-light" />
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-sm font-bold text-primary">{m.year}</span>
                        <span className="text-sm font-semibold text-text-primary">{m.title}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{m.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((value) => {
              const Icon = valueIcons[value.icon] || GraduationCap;
              return (
                <div
                  key={value.title}
                  className="group bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="size-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="staff" className="py-20 bg-background border-b border-border-light scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
                Meet Our Leadership Team
              </h2>
            </div>
            <p className="text-sm sm:text-base text-text-secondary max-w-md">
              Experienced educators guiding every facet of academic and co-curricular life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.leadership.map((member,index) => (
           <StaffCard key={index} member={member} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/staff"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              <span>View all start</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}