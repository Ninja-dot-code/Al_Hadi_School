# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

This is the School Management System component registry. Components are React `.jsx` (JavaScript, no TypeScript), built on shadcn/ui (JS mode) primitives in `src/components/ui/` and styled with the tokens in ui-tokens.md.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here.
2. If yes — match its exact classes and structure.
3. If no — check whether a shadcn/ui primitive covers it (add via `npx shadcn@latest add ...` into `src/components/ui/`). Then build the feature component following ui-rules.md and ui-tokens.md, and add it here.

After building any component — update this file with the component name, file path, and the exact classes/tokens used (and which shadcn primitive it wraps, if any).

---

## Conventions

- **Location:** shadcn primitives in `src/components/ui/`; shared building blocks in `src/components/shared/`; feature components in `src/components/<domain>/` (e.g. `marks/`, `results/`, `students/`).
- **Naming:** PascalCase files, named exports, one component per file.
- **Styling:** Tailwind classes using project tokens only — no hex values, no raw color scales, no inline styles.

---

## Components

### Layout Components

#### `PublicNavbar`
- **Path:** `src/components/layout/PublicNavbar.jsx`
- **Tokens/Classes:** `sticky top-0 z-50 bg-surface shadow-xs`, top announcement bar `bg-primary text-text-inverse`, navigation pills `bg-text-primary text-text-inverse` (active) / `text-text-secondary hover:text-primary`, primary CTA `bg-primary hover:bg-primary-hover text-primary-foreground rounded-sm px-5 py-2.5 text-sm font-semibold`.
- **Purpose:** Public website header with responsive drawer navigation and announcement strip.

#### `PublicFooter`
- **Path:** `src/components/layout/PublicFooter.jsx`
- **Tokens/Classes:** `bg-[#0B132B] text-slate-300 border-t border-slate-800`, newsletter input `bg-slate-900 border border-slate-700 text-white`, submit icon button `bg-primary hover:bg-primary-hover text-white rounded-md`.
- **Purpose:** 4-column public site footer with contact details, quick links, portal links, newsletter form, and copyright.

#### `PublicShell`
- **Path:** `src/components/layout/PublicShell.jsx`
- **Tokens/Classes:** `min-h-screen flex flex-col bg-background text-text-primary`.
- **Purpose:** Outer layout wrapper for all public pages mounting `PublicNavbar`, `<Outlet />`, and `PublicFooter`.

### Public Homepage Components

#### `HeroSection`
- **Path:** `src/components/public/HeroSection.jsx`
- **Tokens/Classes:** `bg-background pt-12 pb-20`, headline `text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary`, accent `text-primary`, CTA `bg-primary text-primary-foreground rounded-sm px-6 py-3.5 shadow-card`, action cards `bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-md`.
- **Purpose:** Main hero section with announcement pill, dual CTAs, student illustration, and 4 quick-action cards.

#### `WelcomeSection`
- **Path:** `src/components/public/WelcomeSection.jsx`
- **Tokens/Classes:** `bg-surface py-20 border-b border-border-light`, quote icon `size-12 rounded-xl bg-primary-light text-primary`, LSA highlight card `bg-primary-muted border-l-4 border-primary rounded-r-xl p-4`.
- **Purpose:** Principal welcome message, institutional philosophy, and LSA framework highlight.

#### `StatsBar`
- **Path:** `src/components/public/StatsBar.jsx`
- **Tokens/Classes:** `bg-surface-secondary py-12 border-b border-border`, stat values `text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary`, labels `text-xs sm:text-sm font-semibold tracking-wider uppercase text-text-muted`.
- **Purpose:** Key institutional metrics grid.

#### `TalentsSection`
- **Path:** `src/components/public/TalentsSection.jsx`
- **Tokens/Classes:** `bg-background py-20`, cards `bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-md`.
- **Purpose:** Beyond Academics co-curricular activities showcase (Athletics, Creative Arts, Leadership).

#### `AcademicPrograms`
- **Path:** `src/components/public/AcademicPrograms.jsx`
- **Tokens/Classes:** `bg-surface py-20`, category filter buttons `px-5 py-2 rounded-full text-xs font-bold border`, active `bg-text-primary text-text-inverse`.
- **Purpose:** Curriculum overview with interactive category filter pills.

#### `NoticeBoardSection`
- **Path:** `src/components/public/NoticeBoardSection.jsx`
- **Tokens/Classes:** `bg-background py-20`, category filter pills `bg-surface p-1 rounded-full border`, notice cards `bg-surface border border-border rounded-xl p-6 shadow-card`.
- **Purpose:** Filterable official notices and circulars grid.

#### `AdmissionsGuide`
- **Path:** `src/components/public/AdmissionsGuide.jsx`
- **Tokens/Classes:** `bg-surface py-20`, numbered step circles `size-14 rounded-full bg-surface border-2 border-primary text-primary font-bold`.
- **Purpose:** 4-step progressive admissions timeline.

#### `CalendarSection`
- **Path:** `src/components/public/CalendarSection.jsx`
- **Tokens/Classes:** `bg-background py-20`, date pill `size-16 rounded-xl bg-primary-light text-primary border border-primary/20`.
- **Purpose:** Upcoming academic and co-curricular event calendar stack.

#### `CtaBanner`
- **Path:** `src/components/public/CtaBanner.jsx`
- **Tokens/Classes:** `rounded-3xl bg-gradient-to-r from-primary to-[#165a94] px-8 py-16 text-white shadow-lg`, button `bg-white text-primary rounded-sm px-6 py-3.5 font-bold`.
- **Purpose:** High-conversion admissions call to action banner.
