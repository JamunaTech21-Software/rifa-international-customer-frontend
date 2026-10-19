import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { news } from './src/data/news.js'

// Public pages, in sitemap order. News articles are added from src/data/news.js.
const SITEMAP_PATHS = [
  '/',
  '/about',
  '/malaysia-jobs',
  '/services',
  '/recruitment-process',
  '/job-seekers',
  '/employers',
  '/news',
  '/career',
  '/faq',
  '/contact',
  '/apply',
]

/**
 * Builds sitemap.xml and robots.txt with the real site address (VITE_SITE_URL), and puts that address
 * into index.html's fallback share tags (__SITE_URL__). Reads the address at build time, so a Vercel
 * preview or the production domain each get correct absolute URLs.
 */
function seoFiles(siteUrl) {
  const base = siteUrl.replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)
  const urls = [...SITEMAP_PATHS, ...news.map((item) => `/news/${item.slug}`)]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url>\n    <loc>${base}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /apply/success

Sitemap: ${base}/sitemap.xml
`
  return { base, sitemap, robots }
}

function seoPlugin(siteUrl) {
  const { base, sitemap, robots } = seoFiles(siteUrl)
  return {
    name: 'rifa-seo-files',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', base),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml')
          return res.end(sitemap)
        }
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain')
          return res.end(robots)
        }
        return next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://rifaint.com'

  return {
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  }
})
