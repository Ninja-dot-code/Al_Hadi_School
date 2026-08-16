# Code Standards

Implementation rules and conventions for the entire project. The AI agent must follow these in every session without exception. These rules prevent pattern drift across sessions.

---

## Engineering Mindset

The AI agent on this project operates as a senior engineer. This means:

- **Think before implementing** — understand what is being built and why before writing a line.
- **Read context files first** — never assume; verify against architecture.md and project-overview.md.
- **Scope is sacred** — build only what the current feature requires. Never go beyond scope even if it seems helpful.
- **Every feature must be testable** — if it cannot be verified immediately after implementation, it is incomplete.
- **Clean over clever** — simple, readable code a junior can follow beats clever abstractions.
- **One thing at a time** — finish one feature fully before touching the next.
- **Security is not the UI's job** — the database (RLS) enforces every permission; the UI only reflects it.

---

## Language: JavaScript (not TypeScript)

This project is **JavaScript** — `.js` and `.jsx`. Do not introduce TypeScript, `.ts`/`.tsx` files, or a `tsconfig.json`.

- Use modern ES modules (`import`/`export`), `const` by default, `let` only when reassigning, never `var`.
- Prefer small pure functions; avoid implicit surprises. Validate external/user data at the boundary (forms with zod, service inputs) rather than trusting shapes.
- Document non-trivial data shapes (a student, a mark, a result, a dossier of subjects) with **JSDoc `@typedef`** in `lib/` or the relevant service, and reference them with `@param`/`@returns`. This gives editor intellisense without TypeScript.
- No floating promises — always `await` or `.catch()`. Async functions handle their own errors (see Error Handling).
- Enums/allowed values (statuses, roles) live as frozen constants in `lib/constants.js` — never as scattered string literals.

```js
/** @typedef {{ id: string, roll_number: string, name: string, class_id: string, section_id: string, status: "active"|"left"|"inactive" }} Student */

/** @param {string} classId @returns {Promise<Student[]>} */
export async function getStudentsByClass(classId) { /* ... */ }
```

---

## React + Vite Conventions

- **Function components only**, with hooks. No class components.
- This is a **Vite SPA** — there is no Next.js. Never write `"use client"`, `"use server"`, `next/*` imports, Server Components, Server Actions, API route handlers, `app/`, or `pages/`-router files.
- The app entry is `src/main.jsx` → `src/App.jsx`. Global CSS and the Inter font import live in `main.jsx`.
- **One component per file**; **named exports** (no default exports for components).
- Props are destructured in the signature. Keep components presentational — data comes in via props or a query hook, never a direct Supabase call.
- Respect the Rules of Hooks (top level only, stable order). Extract reusable logic into `hooks/`.
- No inline styles — style with Tailwind classes using tokens from ui-tokens.md.

### Component structure (order)

```jsx
// 1. External imports
import { useState } from "react";
import { Plus } from "lucide-react";

// 2. Internal imports (@/ alias)
import { Button } from "@/components/ui/button";
import { useStudents } from "@/hooks/useStudents";

// 3. Component (named export)
export function StudentTable({ classId }) {
  // hooks / query hooks
  // derived values
  // handlers
  // return JSX
}
```

---

## Routing (React Router)

- The route tree lives in `src/routes/index.jsx`; guards in `src/routes/guards.jsx`.
- Protected areas use `<ProtectedRoute>` (must be authenticated) and `<RoleRoute role="admin|teacher">` (must match role). Unauthenticated → `/login`; wrong role → their own dashboard.
- Public routes (`/`, `/about`, `/blogs`, `/admissions`, `/results`, …) are open.
- Navigate with `<Link>`/`useNavigate` — never mutate `window.location` for in-app navigation.
- Route params (`:id`, `:examId`, `:slug`, `:rollNo`) are read with `useParams`.

---

## Data Layer: Services + Query Hooks

**Every** database interaction goes through a service module; **every** component consumes data through a TanStack Query hook that wraps a service. Components never import `supabase`.

### Service modules (`services/*.service.js`)

```js
// services/student.service.js
import { supabase } from "@/lib/supabase";

/** @returns {Promise<Student[]>} */
export async function listStudents({ classId, sessionId }) {
  let q = supabase
    .from("students")
    .select("*")
    .eq("academic_session_id", sessionId)
    .order("roll_number");
  if (classId) q = q.eq("class_id", classId);

  const { data, error } = await q;
  if (error) throw normalizeError(error, "listStudents");
  return data;
}
```

- Services are the only place `supabase` is imported for data access.
- Always handle the `error` return — never assume success. Throw a normalized error (message safe for logging) so the query hook can surface a friendly message.
- Use `.single()` when exactly one row is expected.
- Never trust the client for authorization — but still scope queries sensibly (session, class) to keep results correct and small.
- Business rules (result calculation, status transitions, weight validation) live in the relevant service, defined once.

### Query hooks (`hooks/*.js`)

```js
// hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as studentService from "@/services/student.service";

export function useStudents(filters) {
  return useQuery({
    queryKey: ["students", filters],
    queryFn: () => studentService.listStudents(filters),
  });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: studentService.createStudent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}
```

- Query keys are arrays namespaced by domain: `["students", filters]`, `["exam", examId]`, `["result", rollNo]`.
- Mutations `invalidateQueries` for affected keys on success.
- Components read `{ data, isLoading, isError }` and render loading/empty/error states (see ui-rules.md) — never leave a bare unhandled state.

---

## Forms (react-hook-form + zod)

- All non-trivial forms (student, teacher, exam wizard, marks, admission, school settings) use **react-hook-form** with a **zod** schema via `@hookform/resolvers/zod`.
- The zod schema is the single source of validation truth; reuse it for defaults and error messages.
- Use shadcn/ui's `Form` primitives (built on react-hook-form) for consistent labels, descriptions, and error text.
- Submit handlers call a mutation hook; show loading state on the submit button and a success/error toast. Never submit silently.

---

## Supabase Usage

```js
import { supabase } from "@/lib/supabase";
```

- One browser client (`lib/supabase.js`) using `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`. There is no server/service-role client in this app.
- Never put the service-role key in the frontend or in any `VITE_`-prefixed variable.
- Assume **RLS is on** for every table. If a query returns empty where you expected rows, suspect a policy — do not attempt to bypass RLS from the client.
- Marks/results status transitions and publishing are Admin-only at the DB level; the client must never try to set `status = "approved"` or `is_published = true` from a teacher context.

---

## File and Folder Naming

- Folders: kebab-case — `students`, `marks`, `result-card`.
- Component files: PascalCase — `StudentForm.jsx`, `FocusCard.jsx`.
- Page files: PascalCase — `Dashboard.jsx`, `MarksEntry.jsx`.
- Service files: `domain.service.js` — `student.service.js`, `result.service.js`.
- Hook files: `useThing.js` — `useStudents.js`, `useMarks.js`.
- Utility/lib files: camelCase — `supabase.js`, `queryClient.js`, `utils.js`, `constants.js`.
- One component per file. Barrel `index.js` files only inside `components/ui/` (shadcn) — never elsewhere.

---

## shadcn/ui (JS mode)

- `components.json` has `"tsx": false` → components are generated as `.jsx` into `src/components/ui/`.
- Add primitives with the CLI (`npx shadcn@latest add button dialog table ...`) — don't hand-write Radix wrappers that shadcn already provides.
- shadcn components read semantic CSS variables; those variables are mapped to our tokens in `src/index.css` (see ui-tokens.md). Never let shadcn ship its default palette.
- Extend/compose shadcn primitives in feature folders; don't fork or heavily edit files in `components/ui/` (keeps them upgradeable).
- Use the `cn()` helper (`lib/utils.js`) for conditional classes — never string-concatenate class names.

---

## Error Handling

- No empty catch blocks — always handle or log.
- Log with a context prefix: `console.error("[student.service:listStudents]", error)`.
- User-facing errors are **human-readable** — never surface raw Supabase/Postgres messages. Map known cases (permission denied, duplicate roll number, network) to clear sentences; fall back to a generic "Something went wrong. Please try again."
- TanStack Query surfaces errors via `isError`/`error`; render an error state with a retry action.
- Validate inputs before writing (zod on forms, guards in services) — fail early with a clear message.

---

## Environment Variables

All env vars live in `.env.local` for development and in Vercel project settings for deploy. Never hardcode a key, URL, or secret anywhere.

| Variable | Used in | Exposed to browser? |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `lib/supabase.js` | Yes (public URL) |
| `VITE_SUPABASE_ANON_KEY` | `lib/supabase.js` | Yes (anon key, RLS-protected) |

- Only the `VITE_` prefix exposes a variable to the client bundle. **Never** give a secret (e.g. a service-role key) a `VITE_` prefix — it must not exist in this app at all.
- Access via `import.meta.env.VITE_*` (Vite), never `process.env`.

---

## Result & Marks Invariants (in code)

- Result math is implemented once in `result.service.js` and imported — never re-derived in a component or duplicated per screen.
- Weight rule `academic_weight + lsa_weight === 100` is validated in the exam wizard (zod) and enforced by a DB check.
- LSA subjects (`is_lsa === true`) are always summed and weighted separately from academics.
- Absent handling is defined once in `result.service.js` and reused by the result card and exports.
- Status/role/enum strings come from `lib/constants.js` (e.g. `MARK_STATUS.PENDING`, `ROLE.ADMIN`) — never inline literals like `"pending"` scattered across files.

---

## Import Aliases

Use the `@/` alias (configured in `vite.config.js` + `jsconfig.json`) — never relative paths that climb more than one level.

```js
// Correct
import { Button } from "@/components/ui/button";
import { useStudents } from "@/hooks/useStudents";
import { MARK_STATUS } from "@/lib/constants";

// Never
import { Button } from "../../../components/ui/button";
```

---

## Comments

- No comments restating what code does — code must be self-explanatory.
- Comments only for **why** — a non-obvious decision, a business rule, an RLS assumption.
- JSDoc typedefs/annotations are encouraged for core data shapes and service signatures.
- Never leave `TODO`/`FIXME` in delivered code — either do it or note it in progress-tracker.md.

---

## Dependencies

Never install a package without a clear reason. Before adding anything, check: (1) does shadcn/ui already provide it? (2) is there a small native/existing solution? (3) does it earn its weight?

Approved dependencies for this project:

- `@supabase/supabase-js` — Supabase client (auth, DB, storage)
- `react`, `react-dom` — UI
- `react-router-dom` — routing
- `@tanstack/react-query` — server state
- `react-hook-form`, `zod`, `@hookform/resolvers` — forms + validation
- `tailwindcss`, `@tailwindcss/vite` — styling (v4)
- `shadcn/ui` primitives (Radix under the hood) — UI components (JS mode)
- `lucide-react` — icons
- `@fontsource-variable/inter` — Inter font
- `xlsx` (SheetJS) — Excel `.xlsx` export
- `browser-image-compression` — client-side image compression before upload
- `clsx` + `tailwind-merge` (via `cn()`) — class composition
- `date-fns` — date formatting/handling (timetable, publish dates)

Do not install anything else without updating this list first. Notably **not** used: any TypeScript tooling, any PDF-generation library (printing is browser-native), any CSV/Excel **import** library (export only), any analytics SDK.
