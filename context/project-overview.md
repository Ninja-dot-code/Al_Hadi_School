# Project Overview

## About the Project

This is a full-stack **School Management System (SMS)** for a single school. It has two halves:

1. **A public-facing school website** — homepage, about, facilities, activities, memories gallery, blog, notices, an admissions portal, and a public exam-result portal. The public website is fast, modern, and powered by static frontend files and assets — no CMS is required for now.
2. **A private admin application** — a modern SaaS-style dashboard used by two staff roles to run the school day to day: managing academic sessions, classes, subjects, students, teachers, exams, marks, results, timetables, admissions, and school settings.

The defining feature is the **examination and result pipeline**: the school configures exams, the assigned **Class Teacher** enters every subject's marks (including Learning Skills Assessment) for their class, the **Admin/Principal** reviews and approves those marks, results are calculated (academic + LSA weighted into a final percentage and grade), and finally results are **published** to the public portal where anyone can look up a printable result card by roll number.

---

## The Problem It Solves

Small and mid-size schools run on paper registers, spreadsheets, and WhatsApp. Marks live in one teacher's notebook, result cards are typed by hand every term, parents phone the office to ask when results are out, and the school lacks a clean, modern online presence.

This system replaces all of that with one source of truth:

- Teachers enter marks once, in a guided per-student card, and submit them for approval.
- The Admin approves marks and the system calculates every result identically, every time — no manual arithmetic, no inconsistent grade cut-offs.
- Results publish to a public portal on a scheduled date with a countdown; parents look them up themselves and print an official result card.
- Prospective parents can view school details and submit admission applications directly through the website.

---

## Roles

There are exactly **three** roles. There are **no student or parent login accounts** — students and parents only interact with the public website.

| Role | Logs in? | What they do |
| --- | --- | --- |
| **Admin / Principal** | Yes | Full control: academic setup, students, teachers, exams, marks **approval**, result calculation & **publishing**, admissions decisions, school settings. |
| **Class Teacher** | Yes | Sees only their **assigned class**. Enters **all subjects'** marks (including LSA) for that class, submits them for approval, views their class students and timetable. Cannot approve their own marks. |
| **Public user** | No | Browses the public website, submits an admission application, and looks up **published** results by roll number. |

> **Core rule:** Only the assigned Class Teacher enters marks, and they enter marks for **every** subject their class takes — there is no per-subject-teacher marks entry. A teacher can never approve or publish their own marks; only an Admin approves and publishes.

---

## Pages

### Public website (no login)

```
/                       → Homepage (hero, highlights, notices strip, blog teasers, CTA)
/about                  → About the school
/facilities             → Facilities (static showcase cards & details)
/activities             → Extra-curricular & co-curricular activities
/memories               → Photo gallery (static image albums & events)
/blogs                  → Blog listing (static articles)
/blogs/:slug            → Single blog post
/notices                → Public notices / announcements (static list)
/admissions             → Admissions info + application form (open/closed per settings)
/results                → Result portal: countdown when unpublished, roll-number lookup when live
/results/:rollNo        → Printable result card for a published result
/contact                → Contact info
```

### Auth

```
/login                  → Staff login (Admin & Class Teacher). Supabase email/password.
```

### Admin / Principal app (protected)

```
/admin                          → Dashboard (counts, pending approvals, quick actions)
/admin/academic/sessions        → Academic sessions (year setup, active session)
/admin/academic/classes         → Classes & sections
/admin/academic/subjects        → Subjects & per-class subject mapping
/admin/academic/timetable       → Timetable builder
/admin/students                 → Student list (search, filter, export)
/admin/students/new             → Add student
/admin/students/:id             → Student profile / edit
/admin/students/promote         → Promote / graduate students between sessions
/admin/teachers                 → Teacher list & accounts
/admin/teachers/assignments     → Class-teacher assignments
/admin/exams                    → Exam list
/admin/exams/new                → Create exam (wizard: classes, subjects, max marks, weights)
/admin/marks                    → Marks review & approval queue
/admin/results                  → Result calculation, review, publish & countdown scheduling
/admin/admissions               → Admission applications (review, accept → create student)
/admin/admissions/settings      → Open/close admissions, intake config
/admin/settings                 → School settings, grade rules, result weights, signature, logo
```

### Class Teacher app (protected)

```
/teacher                        → Dashboard (assigned class, active exams, marks status)
/teacher/class/:id              → Class view: students, subjects, timetable tabs
/teacher/marks/:examId/:classId → Marks entry — the per-student Focus Card
/teacher/timetable              → Personal / class timetable
```

---

## Navigation

- **Admin app:** collapsible **left sidebar** (grouped nav: Dashboard, Academic, People, Examinations, Admissions, Settings) + a **topbar** (school name/logo, active session, user menu). This is a modern SaaS dashboard layout.
- **Class Teacher app:** the same shell but a slimmed-down sidebar scoped to their class (Dashboard, My Class, Marks, Timetable).
- **Public website:** top navbar with the school logo and an "Activities" dropdown; a footer with contact info and quick links. No sidebar on public pages.

---

## Core Workflow (end to end)

This is the spine of the product. Everything else supports it.

1. **Academic setup (Admin)** — create the academic session, classes & sections, subjects, and map which subjects each class takes. Configure grade rules (percentage → grade) and default result weights in settings.
2. **People (Admin)** — add teachers (which creates their login) and students; assign each class a Class Teacher for the session.
3. **Create an exam (Admin)** — a wizard picks the classes, the subjects per class, each subject's max marks, whether a subject is academic or **LSA**, and the academic/LSA weighting (must total 100%).
4. **Enter marks (Class Teacher)** — the teacher opens their class for the exam and works through students one at a time in a **Focus Card**: all subjects + LSA for that student on a single screen. Saved as **Draft**, then **submitted** (status → **Pending**).
5. **Approve marks (Admin)** — Admin reviews the pending marks and **Approves** or **Rejects** (with a reason; rejected marks return to the teacher for correction).
6. **Calculate results (system)** — once marks are approved, the system computes each student's Academic %, LSA %, weighted **Final %**, **grade** (from grade rules), and pass/fail. Results are held in **Draft/Ready** state for review.
7. **Publish (Admin)** — Admin sets a publish date (a public **countdown** shows until then) and publishes. Only **published** results are ever visible publicly.
8. **Public lookup (parent/student)** — on the results portal they enter the roll number and see/print an official **result card** (A4, browser print → Save as PDF).
9. **Promotion (Admin)** — at session end, students are promoted to the next class (or graduated) into a new academic session.

Running alongside this: **admissions** (public applies → Admin accepts → student record created). The **public website** provides school information, notices, blogs, facilities, and photo galleries directly from static frontend files.

---

## Result & LSA Model (summary)

- **LSA** = Learning Skills Assessment. It appears as subject lines but is scored and weighted **separately** from academic subjects.
- `Academic % = (total academic obtained / total academic max) × 100`
- `LSA % = (LSA obtained / LSA max) × 100`
- `Final % = (Academic % × academicWeight) + (LSA % × lsaWeight)` where `academicWeight + lsaWeight = 100`.
- **Grade** comes from the Admin-configured `grade_rules` (percentage bands). Pass/fail follows the same rules.
- The formula lives in **one** result-calculation service and is never re-implemented per screen. Absent/exempt handling is defined once and applied everywhere.

---

## Data Architecture (high level)

- **Students vs. admissions are separate.** An admission application is a public submission; it becomes a `students` record only when an Admin **accepts** it. The two are never conflated.
- **Marks vs. results are separate.** `marks` are raw per-subject scores with an approval status. `results` (and `result_subjects`) are the calculated, publishable output. Recalculating results never edits marks.
- **Everything is scoped to an academic session.** Classes, students, exams, marks, and results all belong to a session, so historical years stay intact.
- **Published is the only public gate.** Results have a published/draft flag; the public site reads only published rows. This is enforced by Row Level Security, not just the UI.
- **Public website content is static.** Public page copy, facilities, memories, activities, notices, and blog articles live in static frontend data files and assets — fast, reliable, and with no CMS complexity.

---

## Features In Scope

- Public website: homepage, about, facilities, activities, memories gallery, blog, notices, contact — built with static frontend data and assets.
- Admissions portal: public application form gated by open/closed settings; Admin review and accept → auto-create student.
- Public result portal: publish-date countdown, roll-number lookup, printable A4 result card.
- Staff auth (Admin & Class Teacher) via Supabase email/password with role-based access.
- Admin dashboard: key counts, pending marks-approval queue, quick actions.
- Academic setup: sessions, classes, sections, subjects, class-subject mapping, timetable.
- Student management: CRUD, search/filter, profile, promotion/graduation between sessions, Excel export.
- Teacher management: CRUD (creates login), class-teacher assignments, Excel export.
- Exam creation wizard: classes, subjects, academic vs. LSA, max marks, academic/LSA weights.
- Marks entry: per-student **Focus Card** covering all subjects + LSA; Draft → submit for approval.
- Marks approval: Admin approve/reject with reason; rejected returns to teacher.
- Result calculation: academic %, LSA %, weighted final %, grade, pass/fail — from a single service.
- Result publishing: schedule publish date + public countdown; publish/unpublish.
- Result card: official printable layout (browser print → PDF), plus Admin bulk print for a class.
- Excel (`.xlsx`) export for students, teachers, and results.
- School settings: grade rules, default result weights, school profile, logo, principal signature.

---

## Features Out of Scope

- **No CMS / website content management system** — website content and images are served statically from frontend files.
- **No student or parent login accounts** — public access only for them.
- **No per-subject-teacher marks entry** — only the assigned Class Teacher enters marks, for all subjects.
- **No data import** (no CSV/Excel upload of students or marks) — records are created via forms; export only.
- **No PDF-generation service** — printing is browser-native (`Print → Save as PDF`).
- **No fees / payments / accounting / payroll module.**
- **No attendance tracking module** (unless later scoped).
- **No SMS/email/push notifications** — communication is via on-site notices.
- **No realtime chat / messaging.**
- **No mobile app** — responsive web only.
- **No multi-school / multi-tenant support** — this is a single school.
- **No third-party analytics** (no PostHog/GA) — the admin dashboard shows only the school's own counts.

---

## Target Users

- **Admin / Principal:** a non-technical school administrator who needs full control over academics, results, admissions, and settings from one place, with confidence that result math is correct and consistent.
- **Class Teacher:** a teacher responsible for one class who needs a fast, error-resistant way to enter a full class's marks and submit them for approval.
- **Public (parents & prospective students):** anyone who visits the school website to read notices/blogs, learn about facilities, apply for admission, or look up and print a published result — quickly, on any device, without an account.

---

## Success Criteria

- An Admin can set up a session, classes, subjects, teachers, and students, then create an exam, and a Class Teacher can enter a full class's marks without confusion.
- Marks flow cleanly through Draft → Pending → Approved/Rejected, and a teacher can never approve or publish their own marks.
- Result calculation is correct and identical for every student: academic %, LSA %, weighted final %, grade, and pass/fail all match the configured rules.
- Results stay completely private until published; before the publish date the public portal shows only a countdown.
- A parent can look up a published result by roll number and print a clean, official A4 result card.
- Admissions flow works end to end: public applies, Admin accepts, a student record is created without re-typing.
- The public website is fast, visually engaging, responsive, and easy to maintain with static frontend content.
- Row Level Security enforces every role boundary at the database — the UI is never the only line of defense.
- The whole app is responsive and visually consistent, following the design tokens and UI rules.
