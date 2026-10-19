# Rifa International — Customer site

Public website for Rifa International (RL-693): React 19, Vite, Tailwind CSS 4.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env     # then adjust values if needed
npm run dev              # http://localhost:5173
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (proxies `/api` to `http://localhost:8000`) |
| `npm run build` | Production build into `dist/` |
| `npm run lint` | ESLint (must have zero errors) |
| `npm run format` | Prettier, with Tailwind class sorting |
| `npm run preview` | Serve the production build locally |

## UI kit preview

While the dev server runs, open `/dev/ui` to see every shared component. This page is not part of the production build.

## Conventions

See [CLAUDE.md](./CLAUDE.md) for the folder map, styling rules, data rules and accessibility rules.

## Temporary assets

The logo (`src/assets/brand/`) and the photos (`public/images/ref/`) are low-resolution crops from the reference designs. Replace them with the real files before launch; photo slots are listed in `src/data/images.js`.
