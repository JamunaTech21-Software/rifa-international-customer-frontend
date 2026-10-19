import { Link } from 'react-router'

// Temporary stand-in used by every page until its Jira story is built.
export default function PagePlaceholder({ title, story }) {
  return (
    <section className="bg-surface py-24">
      <title>{`${title} | Rifa International`}</title>
      <div className="container-site">
        <p className="font-semibold text-eyebrow text-muted uppercase">{story}</p>
        <h1 className="mt-3 text-section sm:text-display-xl">{title}</h1>
        <p className="mt-4 max-w-xl text-lg">This page is a placeholder and will be built in {story}.</p>
        <Link to="/" className="mt-8 inline-block font-semibold text-primary-600 hover:text-primary-700">
          ← Back to Home
        </Link>
      </div>
    </section>
  )
}
