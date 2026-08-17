import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

export function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-2xl mb-12",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2 leading-tight">
        {title}
      </h2>
      {description && (
        <p className={cn("text-sm sm:text-base text-text-secondary mt-3 leading-relaxed", centered && "mx-auto max-w-xl")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}