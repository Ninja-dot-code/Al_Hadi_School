import { Link } from "react-router-dom";
import { ArrowRight, UserRound } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { CtaBanner } from "@/components/public/CtaBanner";
import { siteContent } from "@/data/siteContent.data";

export function StaffPage() {
  const { leadership } = siteContent.about;

  return (
    <div className="w-full flex flex-col">
      <PageHero
        title="Staff Information"
        subtitle="Our leadership team brings experience, care, and a shared commitment to academic and personal growth."
        crumb="Staff Information"
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <article
                key={member.name}
                className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-md transition-all text-center"
              >
                <div className="mx-auto size-24 rounded-full bg-primary-light overflow-hidden flex items-center justify-center text-primary mb-4 ring-4 ring-primary-muted">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <UserRound className="size-8" />
                  )}
                </div>
                <h2 className="text-base font-bold text-text-primary">{member.name}</h2>
                <p className="text-xs font-semibold text-primary mt-1">{member.role}</p>
                <p className="text-sm text-text-muted mt-3 leading-relaxed">{member.bio}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              <span>Contact the Office</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}