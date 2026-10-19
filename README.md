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

## Deploying to Vercel

The project is ready to deploy as is: `vercel.json` sets the build, makes every route fall back to `index.html` (so refreshing `/about` or `/apply` works), and adds caching and security headers.

1. In Vercel choose **Add New → Project**, import this repository, and keep the **Root Directory** at the repository root.
   Framework preset **Vite**, build command `npm run build` and output directory `dist` are detected automatically.
2. Under **Settings → Environment Variables** add the variables below, then deploy.
3. Every push to the production branch redeploys; other branches get preview URLs.

| Variable | Value |
| --- | --- |
| `VITE_API_MOCK` | `true` for a demo without a backend (forms look like they work but nothing is sent or saved). `false` once the real API is reachable. |
| `VITE_API_BASE_URL` | `/api` (default). The API is called at `<VITE_API_BASE_URL>/v1/...`. |
| `VITE_SITE_URL` | The public site URL, e.g. `https://your-project.vercel.app`, used for canonical links. |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name, once photos are uploaded (empty = built-in photos only). |

`VITE_*` values are baked in at build time, so change a variable and **redeploy** for it to take effect.

### Connecting the real backend

The site calls `/api/v1/...` on its own domain. The PHP backend is not hosted on Vercel, so forward `/api` to it by adding this rewrite **above** the catch-all rewrite in `vercel.json` (replace the host with your backend's URL):

```json
{ "source": "/api/:path*", "destination": "https://api.your-backend-host.com/api/:path*" }
```

Keeping the calls on the same domain means no CORS configuration is needed. Then set `VITE_API_MOCK` to `false` and redeploy.

## UI kit preview

While the dev server runs, open `/dev/ui` to see every shared component. This page is not part of the production build.

## Conventions

See [CLAUDE.md](./CLAUDE.md) for the folder map, styling rules, data rules and accessibility rules.

## Temporary assets

The logo (`src/assets/brand/`) and the photos (`public/images/ref/`) are low-resolution crops from the reference designs. Replace them with the real files before launch; photo slots are listed in `src/data/images.js`.
