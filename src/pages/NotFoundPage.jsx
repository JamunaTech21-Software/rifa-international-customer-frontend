import { Link } from 'react-router'

// Final 404 design is built in FE-16.
export default function NotFoundPage() {
  return (
    <section className="bg-surface py-24 text-center">
      <title>Page Not Found | Rifa International</title>
      <div className="container-site">
        <p className="font-display text-display-xl font-extrabold text-primary-600">404</p>
        <h1 className="mt-2 text-section">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-btn bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
