import { UserRound } from "lucide-react";

export function StaffCard({ member }) {
    return (
        <article
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
    )
}
