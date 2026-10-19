# Rifa International — Customer site (frontend/customer)

Public website for Rifa International (RL-693). React 19 + Vite + Tailwind CSS v4 single-page app.
The admin panel is a **separate app** in `frontend/admin/` — never add admin routes or code here.

## Commands

```bash
npm run dev      # http://localhost:5173 (proxies /api → http://localhost:8000)
npm run build    # production build into dist/
npm run lint     # must pass with zero errors before a story is done
npm run format   # prettier (sorts Tailwind classes)
```

## Folder map

```
src/
├── main.jsx              entry: mounts RouterProvider, imports styles
├── router.jsx            all routes, each page lazy-loaded
├── styles/index.css      Tailwind import + @theme design tokens + base styles
├── pages/                one file per route: <Name>Page.jsx
├── components/
│   ├── layout/           PublicLayout, TopBar, Header, MobileNav, Footer, ScrollToTop
│   ├── ui/               primitives: Button, Container, Section, SectionHeading, Card, Badge, IconCircle, CheckList,
│   │                     Alert, Spinner, Seo, CloudinaryImage, Logo — all previewed at /dev/ui (dev only)
│   ├── form/             FormField, TextInput, PhoneInput, Select, RadioGroup, Checkbox, DateInput, Textarea, FileDrop
│   ├── sections/         shared page sections: PageHero, TrustStrip, CategoryCard, JobCard, ProcessSteps, CtaBanner, HelpBox …
│   └── common/           small helpers shared across pages
├── data/                 site.js (contact info, nav), categories.js, jobs.js, process.js, images.js
├── api/                  client.js, mock.js, lookups.js, applications.js, messages.js
├── assets/brand/         rifa-logo.png, rifa-logo-white.png (temporary crops from /doc — replace with official SVG)
└── lib/                  cn.js, format.js, age.js, cloudinary.js, formStyles.js (shared input class strings)
```

Before building a new component, check `/dev/ui` — reuse and extend existing variants instead of creating look-alikes.
Form controls take `ref` as a normal prop (React 19), so `{...register('name')}` works directly; use `<Controller>` for `FileDrop`.

## Routes

| Path | Page | Story |
| --- | --- | --- |
| `/` | HomePage | FE-05 |
| `/about` | AboutPage | FE-06 |
| `/malaysia-jobs` | MalaysiaJobsPage (`?category=<slug>`) | FE-07 |
| `/recruitment-process` | RecruitmentProcessPage | FE-08 |
| `/apply` | ApplyPage (`?category=<slug>`) | FE-09 |
| `/apply/success` | ApplySuccessPage | FE-10 |
| `/contact` | ContactPage | FE-11 |
| `/services` | ServicesPage | FE-12 |
| `/job-seekers` | JobSeekersPage | FE-13 |
| `/employers` | EmployersPage | FE-14 |
| `/news`, `/news/:slug`, `/career` | NewsPage, NewsDetailPage, CareerPage | FE-15 |
| `/faq`, `*` | FaqPage, NotFoundPage (router errorElement: ErrorPage) | FE-16 |
| `/dev/ui` | UI kit preview (dev only) | SET-05 |

## Design rules — match the references exactly

- Reference designs are in `/doc/*.jpeg` (1536px wide). Every page with a reference must match it at 1536px:
  layout, spacing, colours, font sizes, icons, copy.
- Every page must be **fully responsive**: check 375px (mobile), 768px (tablet), 1280px and 1536px (desktop).
  No horizontal scroll at any width. Multi-column rows collapse to 2 or 1 columns; process arrows hide on mobile.
- Fonts: **Figtree** for everything (`font-sans`/`font-display`), **Satisfy** for handwritten hero taglines (`font-script`).

## Styling rules

- Tailwind classes only, using the tokens in `src/styles/index.css`:
  `primary-50…900`, `navy-700…950`, `ink` (headings), `body` (text), `muted`, `eyebrow`, `surface`, `surface-2`,
  `line`, `success-*`, `warning-*`, `danger-*`, `tone-{blue|green|purple|orange|teal|red}` and `-50` tints,
  `text-display-xl | text-display | text-section | text-eyebrow`, `rounded-btn | rounded-card`,
  `shadow-card | shadow-card-hover | shadow-header`, `max-w-site` / `container-site`.
- **No hex/rgb values in JSX, no inline `style` attributes**, no new CSS files. If a value is missing, add a token to `@theme`.
- Merge conditional classes with `cn()` from `@/lib/cn` (clsx + tailwind-merge).
- Icons: `lucide-react` only, imported by name.

## Code rules

- Components: PascalCase file names, **one component per file, default export**.
- Hooks/utilities: camelCase, named exports allowed in `lib/` and `data/`.
- Import with the `@/` alias (`@/components/ui/Button`), never long `../../` chains.
- Forms: `react-hook-form` + `zod` (`@hookform/resolvers/zod`). Form controls forward refs.
- Page `<title>`/meta: use the `Seo` component (React 19 metadata tags), title format `"<Page> | Rifa International"`.

## Data rules

- Copy text lives in `src/data/*` or in the page file itself — not in shared components.
- Contact info (phone, WhatsApp, email, address, hours, social links) comes **only** from `src/data/site.js`. Never type it into a component.
- Job categories, jobs and process steps come from `src/data/categories.js`, `jobs.js`, `process.js`.

## Images

- Use the `CloudinaryImage` component for every photo (it shows a placeholder gradient while `publicId` is empty).
- Image keys live in `src/data/images.js`; pages reference keys, not URLs.
- Every image needs meaningful `alt` text (empty `alt=""` only for purely decorative images).

## Accessibility

- Every form control has a visible `<label>`; required fields show `*` and use `aria-required`.
- Errors are linked with `aria-describedby` and announced (`role="alert"`).
- Keyboard focus is always visible (global `focus-visible` ring — do not remove outlines).
- Navigation = `<Link>`/`<a>`; actions = `<button>`. Never put `onClick` on a `div`.
- Icon-only buttons need `aria-label`. Colour contrast ≥ 4.5:1 for text.

## API

- Calls go through `src/api/*` only (built in BE-05). `VITE_API_MOCK=true` uses the in-browser mock.
- Env vars: see `.env.example`. Copy it to `.env` locally; never commit `.env`.

## Execution protocol (per Jira story, project RI)

1. Read the story in Jira and the matching reference image(s) in `/doc`.
2. Move the story to **In Progress**.
3. Build only what the story asks for, reusing existing `ui/`, `form/` and `sections/` components before creating new ones.
4. Compare the result against the reference at 1536px, then check 375 / 768 / 1280px.
5. Run `npm run lint` and `npm run build` — both must pass with zero errors.
6. Move the story to **Done** with a comment listing files delivered and anything left open.
7. Git is handled manually by the project owner — do not run git commands.
