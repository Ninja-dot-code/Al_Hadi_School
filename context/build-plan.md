# Build Plan

## Core Principle

Full page UI built with mock/static data first — verified visually before any logic is written. Then functionality is built and wired to the UI step by step. Every feature must be visible and testable before moving to the next. No invisible backend phases.

Each feature below has a **UI** part (build the screen with mock or static data, verify against ui-rules.md / ui-tokens.md) and a **Logic** part (wire it to Supabase via services + query hooks where applicable).

Build order begins with the foundation and the **public website and homepage** with rich, static frontend content and assets, followed by the staff app shells and the core academic/exam/marks/results/admissions pipeline.

---

## Phase 0 — Foundation & Setup

### 01 Project Scaffold & Design Tokens

**Logic / setup:**

- Vite + React 19 app (JavaScript, `.jsx`). `@/` alias in `vite.config.js` + `jsconfig.json`.
- Tailwind CSS v4 via `@tailwindcss/vite`; `src/index.css` with `@import "tailwindcss"` + the full `@theme` token block (see ui-tokens.md) and the shadcn variable mapping.
- Initialize shadcn/ui in **JS mode** (`components.json` → `"tsx": false`); add base primitives (button, input, select, dialog, table, dropdown-menu, form, badge, tabs, toast).
- Install Inter (`@fontsource-variable/inter`) imported in `main.jsx`.
- Create `lib/supabase.js`, `lib/queryClient.js`, `lib/constants.js` (roles, statuses, result defaults), `lib/utils.js` (`cn()`).
- Set up `src/data/` structure for static website content (notices, blogs, facilities, memories, site copy).
- Wrap the app in `QueryClientProvider` and the router in `App.jsx`.

### 02 Database Schema & RLS Foundation

**Logic:**

- Create all core private and academic tables in Supabase, with keys, FKs, and the `academic_weight + lsa_weight = 100` check (no CMS tables needed — public website content is static).
- Add helper functions for role detection (is-admin, is-teacher) and class-teacher assignment lookup.
- **Enable RLS on every private table** with baseline policies (Admin full; teacher scoped; public read-published / insert-admissions). Policies are tightened per feature and hardened in Phase 11.
- Create storage buckets: `school` (public read), `student-photos`, `teacher-photos` (authenticated staff only), with write restricted to Admin.
- Seed one `academic_sessions` row (current), the primary `admin_profiles` row, and default `grade_rules` + `school_settings`.

### 03 Auth & Role-Based Routing

**UI:** Login page (email + password, school logo, error state).

**Logic:**

- Supabase email/password sign-in; Auth context provider with `onAuthStateChange`; `useAuth` + `useRole` (checks `admin_profiles` then `teachers`).
- `routes/guards.jsx`: `ProtectedRoute` and `RoleRoute`. Unauthenticated → `/login`; wrong role → own dashboard.
- After login, route Admin → `/admin`, Teacher → `/teacher`. Sign-out clears session and query cache.

---

## Phase 1 — Public Website & Pages (Static Frontend)

### 04 Public Shell & Homepage

**UI:** Public navbar (with Activities dropdown) + footer; homepage (hero, highlights, static notices strip, static blog teasers, admissions/results CTAs). Fully responsive with modern aesthetics, animations, and static images.
**Logic:** Powered by static frontend files (`src/data/siteContent.data.js`, `src/data/notices.data.js`, `src/data/blogs.data.js`) and local assets.

### 05 Public Informational Pages

**UI:** Static About, Facilities showcase cards, Activities (co-curricular & extra-curricular), Memories photo gallery with lightbox, and Contact pages with clean typography and imagery.
**Logic:** Reads from `src/data/facilities.data.js`, `src/data/memories.data.js`, and `src/data/siteContent.data.js`. No backend CMS required.

### 06 Public Static Blog & Notices

**UI:** Public `/notices` announcements list with category badges; public `/blogs` article listing with featured images + `/blogs/:slug` article detail view with rich formatting.
**Logic:** Static routing and data lookup via `src/data/notices.data.js` and `src/data/blogs.data.js`.

---

## Phase 2 — App Shells & Dashboards

### 07 App Shells & Dashboards (UI, mock data)

**UI:**

- `AdminShell`: collapsible sidebar (grouped nav: Dashboard, Academic, People, Examinations, Admissions, Settings) + topbar (logo, active session selector, user menu) + content outlet.
- `TeacherShell`: same shell, reduced nav (Dashboard, My Class, Marks, Timetable).
- Admin Dashboard with mock data: stat cards (students, teachers, classes, pending approvals), a **pending marks-approval** list, quick actions.
- Teacher Dashboard with mock data: assigned class, active exams, marks status.
- Shared components: `PageHeader`, `EmptyState`, `StatusBadge`, `ConfirmDialog`, `DataTable`.

*(Real data for the dashboards is wired in Feature 29.)*

---

## Phase 3 — Academic Structure (Admin)

### 08 Academic Sessions

**UI:** Sessions list, create/edit form (name, start/end dates), "set current" control, active-session badge.
**Logic:** `academic.service` CRUD; only one `is_current`; the topbar session selector reads/sets the active session; queries downstream scope to it.

### 09 Classes & Sections

**UI:** Classes list (with `sort_order`), class create/edit; per-class sections management.
**Logic:** `academic.service` for classes + sections; ordering; guard against deleting a class/section that has students.

### 10 Subjects & Class-Subject Mapping

**UI:** Subjects registry (name, code, `is_lsa`, `is_active`); per-class subject picker (which subjects a class takes this session).
**Logic:** `subject.service` for subjects + `class_subjects`; LSA flagged and visually distinguished; mapping scoped to the session.

### 11 School Settings & Grade Rules

**UI:** School profile form (name, logo upload, principal, contact, address, website); grade-rules editor (bands with min/max %); default result weights; principal-signature reference.
**Logic:** `settings.service` for `school_settings` + `grade_rules`; logo → `school` bucket; validate grade bands don't overlap/gap; weights default feed the exam wizard.

---

## Phase 4 — People (Admin)

### 12 Teachers

**UI:** Teacher list (search, status filter, export button), teacher create/edit (name, photo, subject, phone, WhatsApp, qualification, joining date, status), password-reset action.
**Logic:** `teacher.service` CRUD; provision Supabase auth user on create; Admin-driven password reset; photo → `teacher-photos`; Excel export of the list.

### 13 Class-Teacher Assignments

**UI:** Assignment screen: pick teacher → class → section for the current session; list of current assignments.
**Logic:** `class_teacher_assignments` CRUD scoped to session; one assignment drives a teacher's entire scope; prevent conflicting/duplicate assignments.

### 14 Students

**UI:** Student list (search by name/roll, filter by class/section/status, export), add/edit student form (all fields from schema), student profile view, photo upload.
**Logic:** `student.service` CRUD scoped to session/class; unique roll number handling; photo → `student-photos`; Excel export (resolved class/section names, not UUIDs).

### 15 Student Promotion

**UI:** Promotion tool: select source class/section → multi-select students → choose target class/section (and session); individual exceptions; graduate/mark-left action.
**Logic:** `student.service` bulk update of `class_id`/`section_id`/`academic_session_id`; no history table (simple update per doc 03 §36); Admin-only.

---

## Phase 5 — Examinations (Admin)

### 16 Exam Creation Wizard

**UI:** Stepper: (1) exam name + session, (2) participating classes, (3) per-class subjects with `max_marks` and academic-vs-LSA, (4) academic/LSA weights with live "must total 100" validation, (5) review & create.
**Logic:** `exam.service` writes `exams` + `exam_classes` + `exam_subjects` (+ weights); zod enforces weights = 100 and `max_marks > 0`; created by Admin.

### 17 Exam List & Management

**UI:** Exam list (status: draft/active/completed), exam detail (classes, subjects, weights), edit while draft, activate/complete.
**Logic:** `exam.service` reads/updates; status transitions; block edits that would invalidate already-entered marks.

---

## Phase 6 — Marks Entry (Teacher)

### 18 Teacher Class View

**UI:** Teacher's assigned class: student roster, subjects, and active exams; entry-point into marks for a given exam.
**Logic:** query scoped by class-teacher assignment (RLS-enforced); list students of the assigned class/section only; show per-student marks status for the selected exam.

### 19 Marks Focus Card

**UI:** Per-student **Focus Card** (see ui-rules.md): student header, academic subject rows with `max` hints + numeric inputs and a running subtotal, a **separate LSA block**, live Final % preview, status pill, prev/next student navigation, Save Draft + Submit.
**Logic:** `marks.service` upsert per student/subject; validate each mark ≤ max; Draft (`draft`) then Submit (`pending`); rejected marks return editable with the Admin's reason; RLS ensures only the assigned teacher writes, and status can't jump to `approved`.

---

## Phase 7 — Approval & Results (Admin)

### 20 Marks Approval Queue

**UI:** Pending-marks queue grouped by exam/class/teacher; review view of a class's submitted marks; Approve and Reject (with reason) actions.
**Logic:** `marks.service` approve/reject (Admin-only, never own marks); reject sets `rejected` + reason back to the teacher; approve sets `approved`. Bulk approve per class.

### 21 Result Calculation & Review

**UI:** Per exam/class: "Calculate results" action; results review table (academic %, LSA %, final %, grade, pass/fail) with failed rows highlighted; drill into a student's subject breakdown.
**Logic:** `result.service.calculateResults(examId, classId)` reads approved marks + `exam_subjects` (max, `is_lsa`) + weights + `grade_rules`; writes `results` + `result_subjects` (`is_published = false`). Recalculation is idempotent and never edits marks. All math defined once here.

### 22 Result Publishing & Countdown Scheduling

**UI:** Publish panel: set `publish_at`, preview, Publish / Unpublish; per-exam publication status.
**Logic:** `result.service` sets `is_published` + `published_at`; before `publish_at` the public portal shows a countdown; unpublish removes public access. Admin-only.

---

## Phase 8 — Public Result Portal

### 23 Results Portal — Countdown & Lookup

**UI:** `/results`: when the latest exam is unpublished, a branded **countdown** to `publish_at`; when live, a roll-number lookup with clear not-found/instructions states.
**Logic:** public (anon) query returns only `is_published = true` results by roll number (RLS-enforced); countdown driven by `publish_at`; no auth required.

### 24 Result Card & Bulk Print

**UI:** `/results/:rollNo` printable A4 card (school band, student block, academics table, separate LSA table, summary with grade + pass/fail, signature/date). Admin bulk-print view: one card per page for a class.
**Logic:** reads `results` + `result_subjects` (public for published; Admin for any); `@media print` layer hides chrome, sets A4, preserves colors, one card per page for bulk. Browser `Print → Save as PDF` — no PDF library.

---

## Phase 9 — Timetable

### 25 Timetable Builder (Admin)

**UI:** Weekly grid builder per class/section: periods with start/end times, subject, teacher; break rows with labels; fixed-interval helper.
**Logic:** `timetable.service` CRUD on `timetable_entries` scoped to session; store actual start/end times; detect teacher clashes.

### 26 Timetable Views (Teacher/Class)

**UI:** Read-only weekly timetable for a class and a teacher's personal timetable; current-period highlight.
**Logic:** query by class/section or teacher; teachers cannot edit (RLS + UI); no notifications/period confirmations.

---

## Phase 10 — Admissions

### 27 Admissions Settings & Public Form

**UI:** Admin: open/close portal, allowed classes, opening/closing dates. Public `/admissions`: info + application form (name, father, requested class, phone, address, extra fields), gated by open/closed state.
**Logic:** `admission.service` reads `admission_settings`; public **INSERT-only** into `admission_applications` (status `pending`); RLS blocks public SELECT/UPDATE/DELETE; closed portal shows an informational state instead of the form.

### 28 Admission Review → Create Student

**UI:** Admin applications table (filter by status/class), application detail, Accept/Reject, and "Create student from application" (prefilled student form).
**Logic:** `admission.service` sets status + `reviewed_by`/`reviewed_at`; accepting does **not** auto-create a student — Admin explicitly creates the `students` record from the prefilled data.

---

## Phase 11 — Wiring, Hardening & Deploy

### 29 Dashboards & Exports — Real Data

**Logic:**

- Wire Admin dashboard: real counts (students, teachers, classes), pending marks-approval queue, recent activity derived from real rows; quick actions link to real screens.
- Wire Teacher dashboard: assigned class, active exams, per-exam marks status.
- Finalize Excel exports for students, teachers, and results (clean, resolved fields; scoped to role).

### 30 RLS & Storage Policy Hardening

**Logic:**

- Review every table's RLS against the permission matrix; verify teacher scoping, marks approval lock (no self-approve, no status jump), published-only public reads, admissions insert-only.
- Verify storage policies (`school` public read, write Admin-only; `student-photos` and `teacher-photos` private to authenticated staff).
- Adversarially test: a teacher tampering with `class_id`/`status`, an anon reading unpublished results or the applications table — all must be blocked by the database.

### 31 Responsive, Print QA & Vercel Deploy

**Logic:**

- Responsive pass (admin tables, sidebar drawer, public mobile nav).
- Print QA for result cards (single + bulk) across browsers; A4, colors, page breaks.
- Configure Vercel (SPA rewrites to `index.html`, `VITE_` env vars); production build; smoke-test the full pipeline end to end.

---

## Feature Count

| Phase | Features |
| --- | --- |
| Phase 0 — Foundation & Setup | 3 |
| Phase 1 — Public Website & Pages (Static Frontend) | 3 |
| Phase 2 — App Shells & Dashboards | 1 |
| Phase 3 — Academic Structure | 4 |
| Phase 4 — People | 4 |
| Phase 5 — Examinations | 2 |
| Phase 6 — Marks Entry (Teacher) | 2 |
| Phase 7 — Approval & Results | 3 |
| Phase 8 — Public Result Portal | 2 |
| Phase 9 — Timetable | 2 |
| Phase 10 — Admissions | 2 |
| Phase 11 — Wiring, Hardening & Deploy | 3 |
| **Total** | **31** |

