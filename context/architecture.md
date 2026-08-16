# Architecture

## Stack

| Layer | Tool | Purpose |
| --- | --- | --- |
| Build tool / dev server | Vite | Fast dev server + production bundling |
| UI framework | React 19 | Component model |
| Routing | React Router | Client-side routing, protected routes |
| Language | JavaScript (`.js` / `.jsx`) | Throughout — **no TypeScript** |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Utility CSS + design tokens via `@theme` |
| Components | shadcn/ui (**JS mode**, `tsx: false`) + Radix | Accessible UI primitives as `.jsx` |
| Icons | lucide-react | Icon set (ships with shadcn/ui) |
| Backend | Supabase | Auth + PostgreSQL + Row Level Security + Storage |
| Server state | TanStack Query (React Query) | Caching, loading/error state, invalidation |
| Forms | react-hook-form + zod | Form state + validation |
| Excel export | SheetJS (`xlsx`) | Export students / teachers / results to `.xlsx` |
| Printing | Browser-native print + `@media print` | Result cards → `Print → Save as PDF` (no PDF service) |
| Hosting | Vercel | Static SPA build + deploy |

There is **no custom server** and **no serverless API layer**. The React app talks to Supabase directly; every security boundary is enforced by Supabase Auth + PostgreSQL Row Level Security (RLS). The frontend is never the security layer.

---

## Folder Structure

```
/
├── AGENTS.md
├── context/                         → these guidance files
├── docs/                            → product specs (source of truth)
├── index.html                       → Vite entry HTML (mounts #root)
├── vite.config.js                   → Vite + @tailwindcss/vite + @ alias
├── jsconfig.json                    → editor path intellisense for @/
├── components.json                  → shadcn/ui config (tsx: false → .jsx)
├── .env.local                       → VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
└── src/
    ├── main.jsx                     → mount App, import index.css + Inter, providers
    ├── App.jsx                      → RouterProvider + QueryClientProvider + Auth provider
    ├── index.css                    → @import "tailwindcss" + @theme tokens (see ui-tokens.md)
    ├── routes/
    │   ├── index.jsx                → route tree: public / admin / teacher
    │   └── guards.jsx               → ProtectedRoute, RoleRoute (admin | teacher)
    ├── lib/
    │   ├── supabase.js              → single Supabase browser client
    │   ├── queryClient.js           → TanStack Query client instance
    │   ├── constants.js             → enums, status values, result defaults
    │   └── utils.js                 → cn(), formatters, small helpers
    ├── services/                    → ALL database access lives here (one module per domain)
    │   ├── auth.service.js
    │   ├── student.service.js
    │   ├── teacher.service.js
    │   ├── academic.service.js      → sessions, classes, sections
    │   ├── subject.service.js       → subjects, class_subjects
    │   ├── exam.service.js          → exams, exam_classes, exam_subjects
    │   ├── marks.service.js         → marks + submit/approve/reject transitions
    │   ├── result.service.js        → result calculation, publish/unpublish, public lookup
    │   ├── timetable.service.js
    │   ├── admission.service.js     → applications + settings + accept→student
    │   ├── settings.service.js      → school_settings, grade_rules
    │   └── storage.service.js       → image uploads (school logo, student/teacher photos)
    ├── data/                        → static frontend data for public website
    │   ├── notices.data.js          → static public notices & announcements
    │   ├── blogs.data.js            → static blog articles
    │   ├── facilities.data.js       → static school facilities
    │   ├── memories.data.js         → static photo gallery & albums
    │   └── siteContent.data.js      → static text, hero, about & contact copy
    ├── hooks/                       → TanStack Query hooks wrapping services
    │   ├── useAuth.js / useRole.js  → current user + resolved role
    │   ├── useStudents.js, useTeachers.js, useExams.js
    │   ├── useMarks.js, useResults.js, useAdmissions.js
    │   └── ...                       → one hook module per domain
    ├── components/
    │   ├── ui/                      → shadcn/ui primitives ONLY (.jsx)
    │   ├── layout/                  → AdminShell, TeacherShell, Sidebar, Topbar, PublicNavbar, Footer
    │   ├── shared/                  → PageHeader, DataTable, StatusBadge, EmptyState, ConfirmDialog, Stepper
    │   ├── students/                → StudentForm, StudentTable, PromotionPanel
    │   ├── teachers/                → TeacherForm, AssignmentForm
    │   ├── exams/                   → ExamWizard, SubjectConfigTable, WeightConfig
    │   ├── marks/                   → FocusCard, SubjectRow, LsaBlock, ApprovalQueue
    │   ├── results/                 → ResultCard, Countdown, PublishPanel, ResultTable
    │   ├── admissions/              → AdmissionForm (public), ApplicationTable
    │   ├── timetable/               → TimetableGrid, TimetableBuilder
    │   └── public/                  → Hero, sections, BlogCard, MemoryGallery, NoticeList
    ├── pages/
    │   ├── public/                  → Home, About, Facilities, Activities, Memories, Blogs, BlogPost,
    │   │                              Notices, Admissions, Results, ResultCard, Contact
    │   ├── auth/                    → Login
    │   ├── admin/                   → Dashboard, academic/*, students/*, teachers/*, exams/*,
    │   │                              Marks, Results, admissions/*, Settings
    │   └── teacher/                 → Dashboard, ClassView, MarksEntry, Timetable
    └── assets/                      → static assets (images, logos, illustrations for public site)
```

---

## System Boundaries

| Folder | Owns | Never contains |
| --- | --- | --- |
| `pages/` | Route-level composition and layout. | Direct Supabase calls, business logic. |
| `components/` | Presentational UI + local interaction. | Direct Supabase calls, data fetching. |
| `data/` | Static content & configuration for public website pages. | Direct DB queries, dynamic server state. |
| `hooks/` | Server-state via TanStack Query; wraps services; exposes `data/isLoading/error` + mutations. | Raw SQL string building; UI/JSX. |
| `services/` | **All** Supabase reads/writes; the only place `supabase` is imported for data. Business rules (result math, status transitions). | React hooks, JSX, DOM APIs. |
| `lib/` | Client singletons (supabase, queryClient), constants, pure utils. | Feature logic. |
| `routes/` | Route tree + auth/role guards. | Data fetching beyond the guard's session check. |

**Rule:** data flows `pages → hooks → services → supabase`. A component never imports `supabase` directly; a service never imports React.

---

## Data Flow

### Reads

```
Page renders
   ↓
useX() query hook (hooks/, TanStack Query — caches, dedupes, handles loading/error)
   ↓
xService.getX() (services/)
   ↓
supabase.from("...").select(...)   ← RLS filters rows to what this user may see
   ↓
Postgres
```

### Writes (mutations)

```
Form submit / action
   ↓
useX mutation hook  →  xService.createX()/updateX()
   ↓
supabase.from("...").insert/update(...)   ← RLS authorizes the write
   ↓
onSuccess → queryClient.invalidateQueries([...])  → UI refetches
```

### Marks → Results → Publish (the core pipeline)

```
Class Teacher enters marks (Focus Card, per student)
   → marks rows written with status "draft", submitted_by = teacher
Teacher submits  → status "pending"           (RLS: only assigned class teacher)
Admin approves   → status "approved"           (RLS: admin only; never own marks)
Admin calculates → result.service.calculateResults(examId, classId):
      reads APPROVED marks + exam_subjects(max_marks, is_lsa) + weights + grade_rules
      computes academic %, lsa %, weighted final %, grade, pass/fail
      writes results + result_subjects (is_published = false)
Admin schedules publish_at (public countdown shows until then)
Admin publishes  → results.is_published = true, published_at set
Public /results  → reads ONLY is_published = true rows by roll number
```

Result math lives **only** in `result.service.js`. Screens read the stored `results`/`result_subjects` — they never recompute.

### Admissions

```
Public submits AdmissionForm → admission_applications INSERT (status "pending")
   (RLS: public may INSERT only — never SELECT/UPDATE/DELETE)
Admin reviews → status "accepted" | "rejected"
Admin "Create student from application" → students INSERT (prefilled) — application is NOT auto-converted
```

---

## Supabase Database Schema

Single Supabase PostgreSQL database. **Core private & academic tables**. All timestamps are `timestamptz`. IDs are `uuid` (`gen_random_uuid()`). Everything academic is scoped to an `academic_session_id`. Public website content is served from static frontend files and does not require database tables.

### Auth & people

**`admin_profiles`** — one primary Admin/Principal. `id` (uuid, = auth.users.id), `name`, `photo_url`, `created_at`, `updated_at`.

**`teachers`** — `id`, `auth_user_id` (→ auth.users), `name`, `photo_url`, `subject`, `phone`, `whatsapp_number`, `qualification`, `joining_date` (date), `status` (`active`/`inactive`), `created_at`, `updated_at`.

### Academic structure

**`academic_sessions`** — `id`, `name` (e.g. "2026–2027"), `start_date`, `end_date`, `is_current` (bool; normally one true), `created_at`.

**`classes`** — `id`, `name` (e.g. "Class 5"), `sort_order` (int), `created_at`.

**`sections`** — `id`, `name` (e.g. "A"), `class_id` (→ classes), `created_at`.

**`class_teacher_assignments`** — `id`, `teacher_id`, `class_id`, `section_id`, `academic_session_id`, `created_at`. **Determines which students a Class Teacher can access.**

**`subjects`** — `id`, `name`, `code` (optional), `is_lsa` (bool — LSA is a normal subject flagged true), `is_active` (bool), `created_at`.

**`class_subjects`** — `id`, `class_id`, `subject_id`, `academic_session_id`, `created_at`. Which subjects a class takes.

### Students

**`students`** — `id`, `roll_number` (text), `name`, `age` (int), `class_id`, `section_id`, `photo_url`, `father_name`, `father_number`, `background`, `admission_year` (int), `belongs_from`, `permanent_address`, `status` (`active`/`left`/`inactive`), `academic_session_id`, `created_at`, `updated_at`. No user-facing permanent student ID beyond `roll_number`; the uuid is internal only.

### Examinations

**`exams`** — `id`, `name`, `academic_session_id`, `created_by` (admin), `status` (`draft`/`active`/`completed`), `publication_at`, `created_at`, `updated_at`. Admin-only creation.

**`exam_classes`** — `id`, `exam_id`, `class_id`, `created_at`. Which classes sit the exam.

**`exam_subjects`** — `id`, `exam_id`, `class_id`, `subject_id`, `max_marks` (numeric), `created_at`. Per-class-per-subject max marks. Also carries the **weight config**: `academic_weight`, `lsa_weight` (stored at exam/class level; DB check enforces `academic_weight + lsa_weight = 100`).

**`marks`** — `id`, `exam_id`, `student_id`, `class_id`, `subject_id`, `max_marks`, `obtained_marks`, `is_absent` (bool), `status` (`draft`/`pending`/`approved`/`rejected`), `submitted_by` (teacher), `created_at`, `updated_at`. RLS verifies `submitted_by` is the assigned Class Teacher of the student's class/section.

**`results`** — `id`, `exam_id`, `student_id`, `academic_percentage`, `lsa_percentage`, `academic_contribution`, `lsa_contribution`, `final_percentage`, `grade`, `status` (`pass`/`fail`), `is_published` (bool), `published_at`, `created_at`, `updated_at`.

**`result_subjects`** — `id`, `result_id`, `subject_id`, `max_marks`, `obtained_marks`, `grade`, `is_absent`, `created_at`. Per-subject lines for the result card.

**`grade_rules`** — `id`, `name` (e.g. "A+"), `min_percentage`, `max_percentage`, `created_at`. Admin-configured grade bands; drives grade + pass/fail.

### Operations

**`timetable_entries`** — `id`, `academic_session_id`, `day_of_week` (int), `start_time` (time), `end_time` (time), `class_id`, `section_id`, `subject_id`, `teacher_id`, `is_break` (bool), `break_label`, `created_at`, `updated_at`.

### Admissions

**`admission_applications`** — `id`, `name`, `father_name`, `requested_class_id`, `phone`, `address`, `application_data` (jsonb), `status` (`pending`/`accepted`/`rejected`), `submitted_at`, `reviewed_at`, `reviewed_by`.

**`admission_settings`** — `id`, `is_open` (bool), `allowed_classes` (uuid[] or related), `opening_date`, `closing_date`, `updated_at`.

### School Settings

**`school_settings`** — single-row config: `school_name`, `school_logo_url`, `principal_name`, `phone`, `email`, `address`, `website`, `result_signature_reference` (principal/class-teacher signature reference). Includes result defaults where relevant.

> `created_by` / `reviewed_by` / `updated_by` reference the authenticated admin (`admin_profiles.id` = `auth.users.id`).

### Explicitly NOT modeled

No CMS/website tables (content is static frontend files), no attendance, fees, accounting, transport, library, audit/activity logs, login history, student/parent accounts, subject-teacher marks entry, complex student history, or automatic promotion rules.

---

## Row Level Security (RLS) Model

RLS is enabled on **every** private table. A user tampering with a request must still be blocked by the database (doc 04). Exact SQL policies are written during implementation; conceptually:

- **Role detection** — helper functions determine whether the current `auth.uid()` is an Admin (`admin_profiles`) or a Teacher (`teachers`), plus a Teacher's class-teacher assignment(s).
- **Admin** — full CRUD across administrative tables; sole authority to **approve marks** and **publish results**.
- **Teacher** — read/write limited to their assigned class/section/session:
  - `students`: SELECT only their assigned class's students.
  - `marks`: INSERT/UPDATE only for their students, for a valid exam/subject of that class, and only while status is `draft`/`pending`/`rejected`. A teacher **cannot** set `status = "approved"` and cannot touch other classes.
  - `results`/`timetable`: read relevant rows; never publish, never edit timetable.
- **Public (anon)**:
  - `admission_applications`: **INSERT only** — no SELECT/UPDATE/DELETE.
  - `results`: SELECT only where `is_published = true`.
  - `school_settings`: SELECT only (for public branding if queried).
  - everything else: no access.

See doc 04 §23 for the full permission matrix. **RLS is the source of truth; the UI only mirrors it** (e.g. a teacher never sees an enabled "Approve" on their own marks).

---

## Supabase Storage

| Bucket | Read access | Contents |
| --- | --- | --- |
| `school` | public | School logo and signature assets |
| `student-photos` | authenticated staff only | `students.photo_url` (not public) |
| `teacher-photos` | authenticated staff only | `teachers.photo_url` (not public) |

Storage policies mirror table RLS: public bucket is anon-readable, write is admin-only; people-photo buckets are private to authenticated staff. Images are compressed client-side before upload (see library-docs.md). Public website images and gallery photos are served directly from static frontend assets. No student documents or medical files are stored.

---

## Authentication

- **Provider:** Supabase Auth, **email + password** (no OAuth, no self-signup).
- **Accounts:** created by the Admin. Adding a teacher provisions their auth user; there is one primary Admin. Password resets are Admin-driven (doc 04 §21).
- **Role resolution:** after login, `useRole()` checks `admin_profiles` vs `teachers` to route the user to `/admin` or `/teacher`.
- **Protected routes:** `/admin/*` (admin role) and `/teacher/*` (teacher role) are guarded in `routes/guards.jsx`; unauthenticated access redirects to `/login`. All `/` public routes and `/results` are open.
- **Session:** Supabase persists the session in the browser client; guards read it via `useAuth()`.

---

## Supabase Client Pattern

One browser client for the whole SPA. There is **no** service-role key in the app — the service-role key must never reach the browser.

```js
// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
```

Only `services/*` import `supabase`. Services return `{ data, error }` (or throw a normalized error for TanStack Query to surface); hooks translate that into UI state.

---

## Result Calculation (authoritative rules)

Implemented once in `result.service.js`:

```
academic_percentage   = (Σ academic obtained / Σ academic max) × 100
lsa_percentage        = (Σ lsa obtained / Σ lsa max) × 100
academic_contribution = academic_percentage × (academic_weight / 100)
lsa_contribution      = lsa_percentage × (lsa_weight / 100)
final_percentage      = academic_contribution + lsa_contribution
grade                 = grade_rules band containing final_percentage
status (pass/fail)    = from grade_rules
```

- `academic_weight + lsa_weight = 100` (DB check + validated in the exam wizard).
- LSA (`subjects.is_lsa = true`) is summed and weighted **separately** — never mixed into the academic totals.
- Absent (`is_absent`) handling is defined once here and applied everywhere (result card, exports).
- Only `approved` marks feed calculation.

---

## Invariants

Rules the AI agent must never violate:

- Components never import `supabase` or build queries — all DB access goes through `services/`, surfaced via `hooks/`.
- Services never import React or touch the DOM; hooks never contain JSX.
- The security boundary is **RLS**, never the UI. Never rely on hiding a button as protection.
- The **service-role key is never in the browser** — the app uses only `VITE_SUPABASE_ANON_KEY`.
- Only the **assigned Class Teacher** may enter marks, and they enter **all** subjects (incl. LSA) for their class — there is no subject-teacher marks entry.
- A teacher can never approve or publish their own marks; only an Admin approves marks and publishes results.
- Only **approved** marks generate results; only **published** results are publicly readable.
- Public users may only **INSERT** admission applications — never read the applications table.
- Result math lives only in `result.service.js`; screens read stored results and never recompute.
- `academic_weight + lsa_weight` must equal 100 wherever weights are set.
- Every academic query is scoped to the relevant `academic_session_id`.
- No hardcoded hex values or raw Tailwind color classes in components — use tokens from ui-tokens.md.
- Errors surfaced to users are human-readable — never raw Supabase/Postgres error strings.
- No secrets, keys, or URLs are hardcoded — everything sensitive comes from `VITE_`-prefixed env vars, and only non-secret values may carry that prefix.
