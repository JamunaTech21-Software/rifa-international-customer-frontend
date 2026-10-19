const SITE_NAME = 'Rifa International'
const SITE_URL = import.meta.env.VITE_SITE_URL

// React 19 hoists these tags into <head>. Title format: "<Page> | Rifa International".
export default function Seo({ title, description, path, noIndex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} (RL-693) | Jobs in Malaysia`
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content={SITE_NAME} />
      {SITE_URL && path != null && <link rel="canonical" href={`${SITE_URL}${path}`} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  )
}
