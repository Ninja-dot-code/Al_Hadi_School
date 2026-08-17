import { useState } from "react";
import { Link } from "react-router-dom";
import { siteContent } from "@/data/siteContent.data";
import { cn } from "@/lib/utils";
import { BookOpen, GraduationCap, Microscope, Sparkles } from "lucide-react";

export function AcademicPrograms() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Programs" },
    { id: "primary", label: "Primary" },
    { id: "middle", label: "Middle" },
    { id: "secondary", label: "Secondary" },
    { id: "stem", label: "STEM Wings" },
  ];

  const filteredPrograms =
    activeTab === "all"
      ? siteContent.academicPrograms
      : siteContent.academicPrograms.filter((p) => p.id === activeTab);

  return (
    <section className="py-20 bg-surface border-b border-border-light text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Curriculum
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
          Academic Programs
        </h2>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all border",
                activeTab === tab.id
                  ? "bg-text-primary text-text-inverse border-text-primary shadow-sm"
                  : "bg-surface text-text-secondary border-border hover:bg-surface-tertiary hover:border-border-strong"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {filteredPrograms.slice(0, 3).map((prog) => (
            <div
              key={prog.id}
              className="group bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Container with Grayscale to Color hover effect matching design */}
              <div className="h-64 w-full overflow-hidden bg-surface-tertiary relative">
                <img
                  src={prog.image}
                  alt={prog.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-text-primary shadow-xs">
                  {prog.grades}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-light">
                  <Link
                    to="/academics"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Curriculum Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
