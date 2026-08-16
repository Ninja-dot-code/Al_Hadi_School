# UI Rules

Concise rules for building the School Management System UI. The UI/UX specification (doc 06) is the source of truth for visual decisions; `ui-tokens.md` holds the exact values. These rules cover the patterns and constraints that keep the app consistent — a modern SaaS dashboard for staff and a clean, trustworthy public website — without over-specifying every screen.

---

## Two UI Surfaces

The app has two distinct visual contexts. Do not mix their chrome.

1. **Admin / Teacher app** (`/admin/*`, `/teacher/*`) — authenticated SaaS dashboard: **sidebar + topbar + content**. Dense, table-heavy, form-heavy.
2. **Public website** (`/`, `/about`, `/blogs`, `/admissions`, `/results`, …) — marketing/informational: **top navbar + footer**, wider hero sections, no sidebar.

Both share the same tokens (colors, type, radius) so the brand stays consistent.

---

## Font

Load **Inter** once via `@fontsource-variable/inter` imported at the top of `src/main.jsx` (Google Fonts `<link>` in `index.html` is an acceptable alternative). The `--font-sans` token is declared in `@theme` in `src/index.css`; apply `font-sans` on `<body>`. Never use a bare system font as the primary face. This is a Vite app — there is no `next/font`.

---

## Admin / Teacher Layout

```
┌───────────┬────────────────────────────────────┐
│           │  Topbar (h-16): logo · session · user │
│  Sidebar  ├────────────────────────────────────┤
│ (240px,   │                                    │
│ collapsible│  Content area (max-w-[1280px])     │
│ to 64px)  │  padding 24px · section gap 24px    │
│           │                                    │
└───────────┴────────────────────────────────────┘
```

- **Sidebar:** 240px expanded, 64px collapsed (icons only). `bg-sidebar`, right border `border-border`. Grouped nav with small uppercase group labels (`text-text-muted`, 12px). Active item: `bg-sidebar-active` + `text-primary` + 600 weight + a 3px left primary accent bar. Inactive: `text-text-secondary`, hover `bg-surface-tertiary`.
- **Topbar:** 64px, `bg-surface`, bottom border. Shows school logo/name (left), the **active academic session** selector, and the user menu (right). Collapse toggle at the sidebar/topbar junction.
- **Teacher shell** reuses the same components with a reduced nav (Dashboard, My Class, Marks, Timetable) scoped to the assigned class.
- Content max-width **1280px**, centered; page padding **24px**; gap between sections **24px**.
- Every admin page starts with a **page header**: title (24px/700) on the left, primary actions (e.g. "Add student", "Create exam", "Export") on the right.

---

## Public Website Layout

- **Top navbar:** `bg-surface`, full width, 64px, school logo left, links right (Home, About, Facilities, Activities ▾, Memories, Blog, Admissions, Results, Contact). "Activities" is a dropdown (extra-curricular / co-curricular). Active link: `text-primary` 600.
- **Hero / sections:** wider content (`max-w-[1200px]`), generous vertical rhythm, `rounded-xl` (16px) feature panels.
- **Footer:** contact info, quick links, social; `bg-surface-secondary`, top border.
- Public pages must be fully responsive and read well on mobile (single column, hamburger nav under `md`).

---

## Cards

Every content grouping in the app lives in a card.

```
background: bg-surface
border: 1px solid var(--color-border)
border-radius: 12px            (rounded-lg)
padding: 24px                  (p-6)
box-shadow: var(--shadow-card)
```

Large sections, hero panels, and modals use **16px** (`rounded-xl`). Never use a colored card surface — color goes inside via badges, chips, and text. Never nest more than two radius levels.

---

## Typography Hierarchy

Used consistently everywhere:

- **Page title** — 24px / 700 / `text-text-primary`
- **Section / card heading** — 16px / 600 / `text-text-primary`
- **Body / cell text** — 14px / 400 / `text-text-primary`
- **Label** — 14px / 500 / `text-text-secondary`
- **Caption / meta** — 12px / 400 / `text-text-muted`

Dashboard stat numbers: 28px / 700 / `text-text-primary`. Never use more than one font weight within a single UI element.

---

## Buttons

- **Primary** — `bg-primary` / white text / `rounded-sm` (8px) / `px-4 py-2` / 14px 500. Hover `bg-primary-hover`. One primary action per view context.
- **Secondary** — white bg, `border-border`, `text-text-primary`, same size/radius.
- **Destructive** — `bg-error` / white text — for delete and **reject** actions; always behind a confirm.
- **Ghost** — transparent, `text-text-secondary`, hover `bg-surface-tertiary` — for low-emphasis/table row actions.
- Focus is always visible: `ring-2 ring-primary ring-offset-2`.
- Disabled buttons: reduced contrast, `cursor-not-allowed`, and never the only feedback — pair with a reason where relevant (e.g. "Approve" disabled with tooltip "You cannot approve your own marks").

---

## Forms

- Label above input. Required fields marked with `*`. Helper text below in `text-text-muted`; error text in `text-error-foreground` with `border-error` on the field.
- Inputs use `rounded-md` (10px), `border-border`, focus `ring-primary`.
- Group long forms (student, teacher, exam wizard) into **sections** with a heading, laid out in a responsive 2-column grid (`grid md:grid-cols-2 gap-4`) that collapses to one column on mobile.
- Multi-step flows (exam creation, promotion) use a **stepper** with a clear back/next and a final review step.
- Validate on submit (and on blur for expensive checks); never submit silently — show a loading state and a success/error toast.

---

## Tables

The admin app is table-heavy (students, teachers, exams, marks, admissions).

- Container: `bg-surface`, `rounded-lg`, `border-border`, `overflow-hidden`.
- Header: `bg-surface-secondary`, 12px uppercase `text-text-muted`, `tracking-wide`.
- Rows: 14px `text-text-primary`, separated by `border-light`. **No zebra striping.** Hover `bg-surface-tertiary`.
- Right-align numeric columns (marks, %, counts). Status columns use badges.
- Row actions in a trailing column (icon buttons or a `⋯` menu).
- Every table has: a **search/filter** bar above, an **empty state**, a **loading skeleton**, and pagination when long.
- Bulk-selectable tables (e.g. promotion, bulk print) use a leading checkbox column with a selection toolbar.

---

## Status Badges

Marks, results, and admissions all use pill badges (`rounded-full`, 12px/500, `px-2.5 py-0.5`). **Never rely on color alone** — always show the label text (and an icon where helpful).

| Domain | States → token |
| --- | --- |
| Marks | Draft (neutral) · Pending (warning) · Approved (success) · Rejected (error) |
| Results | Draft (neutral) · Ready (info) · Published (primary) |
| Admissions | Submitted (info) · Under review (warning) · Accepted (success) · Rejected (error) |
| Notices / Blog Tags | Category badges: General · Academic · Exam · Event (primary-light / info-light) |

---

## Marks Entry — Focus Card

The single most important teacher screen. Enter marks **one student at a time**.

- One student per **card** (`rounded-xl`, `p-6`, `shadow-md`): a primary-tinted header strip with the student's name, roll number, and class.
- List every academic subject as a row: subject name, a `max = N` hint, and a numeric input (`rounded-md`). Show a live running academic subtotal.
- Render **LSA** as a **visually separate block** (`bg-primary-muted`) with its own subtotal — it is weighted separately and must never look like just another academic subject.
- Show a live **Final % preview** and the current **status pill** (Draft/Pending) at the top-right.
- Validate each input against its max: invalid values get `border-error` and inline helper text; submission is blocked until valid.
- Navigation between students: prev/next controls + a class roster rail; unsaved-change guard before leaving.
- Actions: **Save draft** (secondary) and **Submit for approval** (primary). After submit, inputs become read-only with a Pending badge.

---

## Result Card (Public & Print)

- Distinct from app chrome: A4 white page, school logo + name band (primary), exam + session, student block, an academics subject table, a **separate LSA table**, and a summary (Academic %, LSA %, Final %, Grade, Pass/Fail), then a footer with principal signature and date.
- Failed subject rows highlighted with `bg-error-light`.
- See the print rules below — the card must print cleanly.

---

## Printing

Result cards and report views must print to A4 (browser `Print → Save as PDF`; there is no PDF service).

- Provide a print CSS layer (`@media print`) that **hides app chrome** — sidebar, topbar, navbar, footer, buttons, filters (`.no-print { display: none }`).
- Set A4 page geometry (`@page { size: A4; margin: 12mm; }`), white background, black-on-white text where appropriate.
- Preserve brand/status colors with `print-color-adjust: exact` (and `-webkit-print-color-adjust`).
- Avoid breaking a student's card across pages (`break-inside: avoid`); bulk class print puts one card per page (`break-after: page`).
- Never use `position: fixed` inside printable content.

---

## Empty, Loading & Error States

Every list/section that can be empty, loading, or failing must handle all three:

- **Empty:** short muted text (`text-text-subtle`), optional icon, and a CTA when there's a logical next action ("No students yet — Add student").
- **Loading:** skeletons for tables/cards; never a bare spinner on a full page where layout is known.
- **Error:** human-readable message + retry — **never** a raw Supabase/Postgres error string.

---

## Responsiveness

- Admin sidebar collapses to icons on `md`, becomes an off-canvas drawer under `sm`.
- Tables become horizontally scrollable or switch to stacked cards on small screens.
- Public pages are mobile-first; hero and multi-column sections stack under `md`.

---

## Accessibility

- Visible focus rings on all interactive elements (`ring-primary`).
- Sufficient contrast (tokens are chosen for AA on their backgrounds).
- Status conveyed by text/icon in addition to color.
- Labels tied to inputs; buttons and icon-only controls have accessible names.
- Prefer shadcn/ui primitives (Radix-based) so dialogs, menus, and selects are keyboard- and screen-reader-accessible by default.

---

## Tailwind v4 Note

This project uses **Tailwind CSS v4** with the `@tailwindcss/vite` plugin. Tokens are defined with `@theme` in `src/index.css` — there is **no `tailwind.config.js`** for colors/tokens. Never define colors in a config file; add new tokens to `@theme`.

---

## Do Nots

- Never use raw Tailwind color classes (`bg-blue-600`, `text-gray-500`) — project tokens only.
- Never define colors in a Tailwind config file — use `@theme` in `src/index.css`.
- Never use a hex value directly in a component.
- Never use a color scale other than `#1C74BD` for the brand blue.
- Never add gradients to card surfaces.
- Never use more than one font weight in a single UI element.
- Never show a raw error message to a user — always human-readable text.
- Never nest more than two radius levels inside each other.
- Never let LSA look like a plain academic subject — it is always a separate, weighted block.
- Never rely on the UI alone for a permission boundary — the design must reflect what RLS already enforces (e.g. teachers never see an enabled "Approve" on their own marks).
