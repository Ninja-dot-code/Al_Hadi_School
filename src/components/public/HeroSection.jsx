import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Play, 
  GraduationCap, 
  FileCheck2, 
  ReceiptText, 
  BookOpen,
  FileText
} from "lucide-react";
import { siteContent } from "@/data/siteContent.data";
import { dummyImages } from "@/lib/dummyImages";

export function HeroSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="size-6 text-primary" />;
      case "FileCheck2":
        return <FileCheck2 className="size-6 text-primary" />;
      case "ReceiptText":
        return <ReceiptText className="size-6 text-primary" />;
      case "BookOpen":
        return <BookOpen className="size-6 text-primary" />;
      default:
        return <FileText className="size-6 text-primary" />;
    }
  };

  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-20 border-b border-border-light">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary-light/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Admission pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary tracking-wide">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span>ADMISSIONS OPEN {siteContent.admissionsSession}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
              Tomorrow's <br />
              Leaders <br />
              <span className="text-primary">Start Here.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-secondary max-w-xl font-normal leading-relaxed">
              {siteContent.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-all shadow-card hover:shadow-md"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="size-4" />
              </Link>
              <button
                type="button"
                onClick={() => alert("Virtual Campus Tour coming soon!")}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm bg-surface border border-border text-text-primary text-sm font-semibold hover:bg-surface-tertiary transition-colors shadow-card"
              >
                <div className="size-5 rounded-full bg-primary-light flex items-center justify-center text-primary">
                  <Play className="size-3 fill-current ml-0.5" />
                </div>
                <span>Watch Video Tour</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-md">
              {/* Soft decorative backdrop shape */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/60 to-primary/10 rounded-full scale-95 -rotate-6 blur-xs" />
              
              {/* Main Student Cutout / Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-surface bg-surface">
                <img
                  src={dummyImages.heroStudent}
                  alt="Student holding books smiling"
                  className="w-full h-auto object-cover object-center transform hover:scale-102 transition-transform duration-500 max-h-[460px]"
                  loading="eager"
                />
                
                {/* Floating Achievement Badge */}
                <div className="absolute bottom-4 left-4 bg-surface/95 backdrop-blur-xs border border-border rounded-xl p-3 shadow-md flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary">100% University Prep</div>
                    <div className="text-[11px] text-text-muted">Holistic LSA Curriculum</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Action Cards Grid (Below Hero) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {siteContent.quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.link}
              className="group bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="size-11 rounded-lg bg-primary-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(action.icon)}
                </div>
                <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-text-muted mt-1.5 line-clamp-2">
                  {action.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border-light flex items-center justify-between">
                <span className="text-xs font-semibold text-primary group-hover:underline">
                  {action.actionText}
                </span>
                <ArrowRight className="size-3.5 text-primary transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
