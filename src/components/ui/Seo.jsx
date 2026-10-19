import { useEffect } from 'react'

const SITE_NAME = 'Rifa International'
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
const DEFAULT_IMAGE = '/og-default.jpg'

// Open Graph and Twitter need absolute URLs; fall back to a root-relative path when no site URL is set.
const absolute = (path) => (SITE_URL ? `${SITE_URL}${path}` : path)

/**
 * Per-page <head> tags. React 19 hoists these into <head> automatically.
 *
 * title — page name; the tab title becomes "<title> | Rifa International" (no title = the site's default title).
 * description — meta description (also used for social sharing).
 * path — the page's own path ("/about"); sets the canonical link and og:url.
 * image — optional share image path (default: /og-default.jpg, 1200 × 630).
 * noIndex — keep the page out of search results (success page, 404, error page).
 */
export default function Seo({ title, description, path, image = DEFAULT_IMAGE, noIndex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} (RL-693) | Jobs in Malaysia`
  const url = SITE_URL && path != null ? `${SITE_URL}${path}` : undefined

  // index.html ships default description/share tags for crawlers without JavaScript; drop them so each page
  // has exactly one set (its own).
  useEffect(() => {
    document.querySelectorAll('[data-seo-default]').forEach((element) => element.remove())
  }, [])

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}
      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={absolute(image)} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={absolute(image)} />
    </>
  )
}
