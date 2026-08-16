# Library Docs

Project-specific usage patterns for every third-party library in this project. This file covers **how we use each library in this specific School Management System** — the rules, patterns, and constraints that apply here, not general tutorials.

Read the relevant section before implementing any feature that touches these libraries.

---

## Before Using Any Library

1. **Check AGENTS.md** at the project root — it lists the skills installed for this project and how to use them. Skills carry up-to-date API docs and patterns specific to this codebase.
2. **Check for an MCP server** for that tool (e.g. a Supabase MCP). If one is configured, use it for real-time docs/schema/debugging before falling back to general knowledge.
3. **Read this file** for project-specific patterns that override general library knowledge.

Order of authority:

```
MCP server (real-time) → Skills via AGENTS.md → This file (project rules) → General training knowledge
```

Never rely on training knowledge alone for library APIs — they change, and Tailwind v4, React Router, and Supabase have all shifted meaningfully across versions.

---

## Supabase

**Check first:** AGENTS.md for a Supabase skill; use a Supabase MCP if configured.

Supabase is the entire backend: **Auth + PostgreSQL + Row Level Security + Storage**. The React SPA talks to it directly through one browser client. There is no server-side/service-role client in this app.

### Client

```js
// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
```

- Only `services/*` import `supabase`. Components go through query hooks.
- Env vars use the `VITE_` prefix and are read with `import.meta.env` — never `process.env`.
- **Never** add a service-role key to the frontend.

### Auth (email + password)

```js
// Sign in
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// Current session / user
const { data: { session } } = await supabase.auth.getSession();
const { data: { user } } = await supabase.auth.getUser();

// Sign out
await supabase.auth.signOut();

// React to auth changes (in the Auth provider)
supabase.auth.onAuthStateChange((_event, session) => { /* update context */ });
```

- No self-signup and no OAuth. Accounts are created by the Admin; teacher provisioning and password resets are Admin-driven.
- After login, resolve the role by checking `admin_profiles` then `teachers` (see `useRole`) and route to `/admin` or `/teacher`.

### DB queries (RLS is always on)

```js
// Read — scope to session/class; RLS still filters to what the user may see
const { data, error } = await supabase
  .from("students")
  .select("*")
  .eq("academic_session_id", sessionId)
  .eq("class_id", classId)
  .order("roll_number");

// Insert
const { data, error } = await supabase
  .from("students")
  .insert({ name, roll_number, class_id, section_id, academic_session_id })
  .select()
  .single();

// Update
const { error } = await supabase
  .from("marks")
  .update({ obtained_marks, is_absent })
  .eq("id", markId);
```

**Rules:**

- Always handle `error` — never assume success.
- Use `.select()` after insert/update when you need the row back; `.single()` when exactly one row is expected.
- Join related data with nested selects (`select("*, sections(name), classes(name)")`) rather than N+1 round-trips.
- Assume RLS filters results. Empty data where you expected rows usually means a policy — never try to work around RLS from the client.
- Never attempt Admin-only transitions from a teacher context (e.g. setting `marks.status = "approved"` or `results.is_published = true`). Those are DB-authorized to Admin.

### Storage

```js
// Upload (compress first — see browser-image-compression)
const { error } = await supabase.storage
  .from("school")
  .upload(`logos/${fileName}`, compressedFile, { upsert: true, contentType: file.type });

// Public URL (public bucket: school)
const { data } = supabase.storage.from("school").getPublicUrl(`logos/${fileName}`);
const logoUrl = data.publicUrl; // save to school_settings.school_logo_url
```

**Buckets:** `school` (public read for logo/branding) and `student-photos`, `teacher-photos` (authenticated only). Write is Admin-only via policy. Public website photos/gallery images are hosted as static frontend assets.

**Rules:** compress images client-side before upload; save the resulting URL/path back to the row; never write files to disk; keep student/teacher photos in the non-public buckets.

---

## React Router

**Check first:** AGENTS.md for a React Router skill. The data-router APIs differ from older versions — verify before using loaders/actions.

### Route tree + guards

```jsx
// src/routes/index.jsx (shape)
createBrowserRouter([
  { path: "/", element: <PublicLayout />, children: [ /* Home, About, Blogs, Admissions, Results, ... */ ] },
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: <RoleRoute role="admin"><AdminShell /></RoleRoute>,
    children: [ /* Dashboard, students, exams, marks, results, website, settings */ ],
  },
  {
    path: "/teacher",
    element: <RoleRoute role="teacher"><TeacherShell /></RoleRoute>,
    children: [ /* Dashboard, ClassView, MarksEntry, Timetable */ ],
  },
]);
```

**Rules:**

- Guards read the session from the Auth context (`useAuth`) and role from `useRole`. Unauthenticated → redirect `/login`; wrong role → redirect to that user's own dashboard.
- Navigate with `<Link>` / `useNavigate`; read params with `useParams`. Never use `window.location` for in-app navigation.
- Keep data fetching in query hooks inside the page component; a loader (if used) should still call services, not `supabase` directly.

---

## TanStack Query (React Query)

**Check first:** AGENTS.md for a TanStack Query skill.

Server state (everything from Supabase) is owned by TanStack Query — not `useState`/`useEffect`. It gives us caching, dedupe, loading/error state, and controlled refetching, which is exactly what doc 06 asks for (avoid redundant calls, keep the dashboard responsive).

```js
// Provider in App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});
```

**Rules:**

- Every server read is a `useQuery` in `hooks/`; every write is a `useMutation` that `invalidateQueries` for affected keys on success.
- Query keys are arrays namespaced by domain and filters: `["students", { classId, sessionId }]`, `["exam", examId]`, `["result", rollNo]`.
- Read `{ data, isLoading, isError, error }` in components and render loading/empty/error states.
- Don't duplicate server data into local state; derive from `data`. Use `enabled` to defer dependent queries (e.g. don't fetch marks until an exam+class is chosen).

---

## react-hook-form + zod

**Check first:** AGENTS.md for a related skill.

All non-trivial forms use react-hook-form with a zod schema through `@hookform/resolvers/zod`, rendered with shadcn/ui `Form` primitives.

```js
const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roll_number: z.string().min(1, "Roll number is required"),
  class_id: z.string().uuid(),
  section_id: z.string().uuid(),
  father_number: z.string().optional(),
});

const form = useForm({ resolver: zodResolver(studentSchema), defaultValues });
```

**Rules:**

- The zod schema is the single validation source; reuse it for defaults and messages.
- The exam wizard schema enforces `academic_weight + lsa_weight === 100` and per-subject `max_marks > 0`.
- The marks Focus Card validates each subject's `obtained_marks` against its `max_marks` (and blocks submit while invalid).
- On submit, call a mutation hook; show button loading state and a toast; never submit silently.

---

## shadcn/ui (JS mode)

**Check first:** AGENTS.md for a shadcn skill.

shadcn/ui runs in **JavaScript mode** — components are generated as `.jsx`, not `.tsx`.

```jsonc
// components.json (key settings)
{ "tsx": false, "aliases": { "components": "@/components", "ui": "@/components/ui", "utils": "@/lib/utils" } }
```

```bash
# add primitives as needed
npx shadcn@latest add button input select dialog table dropdown-menu form badge tabs
```

**Rules:**

- Generated primitives live in `src/components/ui/` as `.jsx`. Don't hand-write what the CLI provides; don't heavily edit generated files (keeps them upgradeable).
- shadcn reads semantic CSS variables (`--primary`, `--border`, `--ring`, `--radius`, …); these are mapped to our tokens in `src/index.css` (see ui-tokens.md), so primitives inherit the `#1C74BD` palette automatically.
- Compose primitives into feature components (`marks/FocusCard.jsx`, `students/StudentForm.jsx`) in feature folders.
- Use the `cn()` helper (`clsx` + `tailwind-merge`) for conditional classes.
- Radix underpins dialogs/menus/selects, so keyboard and screen-reader behavior is handled — don't reinvent it.

---

## Tailwind CSS v4

**Check first:** AGENTS.md for a Tailwind skill. v4 config differs substantially from v3 — do not apply v3 patterns.

- Enabled via the Vite plugin: `@tailwindcss/vite` in `vite.config.js`, and `@import "tailwindcss";` at the top of `src/index.css`.
- All design tokens are defined with `@theme` in `src/index.css`. **There is no `tailwind.config.js`** for colors/tokens.
- Utility classes are generated from tokens (`bg-primary`, `text-text-muted`, `rounded-lg`). See ui-tokens.md for the full token set and rules.
- Never use raw color scales (`bg-blue-600`) or hex values in components.

---

## lucide-react

- Icon set that ships with shadcn/ui. Import per-icon: `import { Plus, Check, X } from "lucide-react";`.
- Size via Tailwind (`className="size-4"`); color inherits `currentColor` — drive it with text tokens.
- Use icons to reinforce status/actions (e.g. check for Approved, x for Rejected) — but status must never be icon/color **only**; always include the text label.

---

## SheetJS (`xlsx`) — Excel Export

**Check first:** AGENTS.md for an xlsx skill.

Export-only. There is **no import** — students, teachers, and marks are created via forms, never uploaded.

```js
import * as XLSX from "xlsx";

export function exportRows(rows, sheetName, fileName) {
  const ws = XLSX.utils.json_to_sheet(rows);      // rows = clean, flattened objects
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);                    // triggers browser download
}
```

**Rules:**

- Build export rows in the relevant service (`student.service`, `teacher.service`, `result.service`) as clean, human-readable objects — resolve foreign keys to names (class name, section name, grade), never dump raw UUIDs.
- Results export includes per-subject columns plus academic %, LSA %, final %, grade, and pass/fail — matching the result card.
- Respect RLS/scope: export only what the current user is allowed to see (Admin: full; teacher: their class where applicable).
- File names are descriptive: `students-class-5-2026-2027.xlsx`.

---

## browser-image-compression

- Compress user-selected images in the browser **before** uploading to Supabase Storage (school logo, student/teacher photos).

```js
import imageCompression from "browser-image-compression";
const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1600, useWebWorker: true });
```

**Rules:** compress before upload; keep photos reasonably sized; then hand the result to `storage.service` / `supabase.storage.upload`.

---

## Printing (browser-native, no PDF library)

Result cards and printable reports use the browser's own print (`Print → Save as PDF`). **Do not add any PDF-generation library.**

- A print stylesheet (`@media print`) hides app chrome (`.no-print`) and sets A4 geometry: `@page { size: A4; margin: 12mm; }`.
- Preserve brand/status colors with `print-color-adjust: exact` (+ `-webkit-print-color-adjust: exact`).
- Prevent a single card from splitting across pages (`break-inside: avoid`); bulk class print puts one card per page (`break-after: page`).
- Trigger printing with `window.print()` from a dedicated print view (or a print-scoped layout). No `position: fixed` inside printable content.

---

## date-fns

- Use `date-fns` for formatting and arithmetic (publish dates, result countdown, timetable times, "submitted 2 days ago"). Prefer it over hand-rolled date math or bringing in a heavier library.
- Store timestamps as `timestamptz` in Supabase; format at the edge for display.
