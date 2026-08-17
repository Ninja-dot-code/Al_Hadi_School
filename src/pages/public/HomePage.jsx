import { HeroSection } from "@/components/public/HeroSection";
import { WelcomeSection } from "@/components/public/WelcomeSection";
import { StatsBar } from "@/components/public/StatsBar";
import { TalentsSection } from "@/components/public/TalentsSection";
import { AcademicPrograms } from "@/components/public/AcademicPrograms";
import { NoticeBoardSection } from "@/components/public/NoticeBoardSection";
import { AdmissionsGuide } from "@/components/public/AdmissionsGuide";
import { CalendarSection } from "@/components/public/CalendarSection";
import { CtaBanner } from "@/components/public/CtaBanner";

export function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero & Quick Actions */}
      <HeroSection />

      {/* 2. Principal Welcome & Vision */}
      <WelcomeSection />

      {/* 3. Key Statistics Bar */}
      <StatsBar />

      {/* 4. Beyond Academics / Co-Curricular */}
      <TalentsSection />

      {/* 5. Academic Programs & Curriculum */}
      <AcademicPrograms />

      {/* 6. Notice Board & Circulars */}
      <NoticeBoardSection />

      {/* 7. Step-by-Step Admissions Guide */}
      <AdmissionsGuide />

      {/* 8. Upcoming School Calendar */}
      <CalendarSection />

      {/* 9. Final Call to Action Banner */}
      <CtaBanner />
    </div>
  );
}
