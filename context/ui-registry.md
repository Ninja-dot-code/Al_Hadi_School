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

_Empty. Components will be added here as they are built._
