import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

export function PlaceholderPage({ title, description, badge = "Coming in Phase 1-3" }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary mb-6">
        <Construction className="size-4" />
        <span>{badge}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
        {title}
      </h1>
      <p className="text-base text-text-secondary mt-3 max-w-lg mx-auto">
        {description || "This section is part of the planned build roadmap and will be loaded in the upcoming feature phase."}
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
