import { useRouteError } from 'react-router'
import { Phone, RotateCw, TriangleAlert } from 'lucide-react'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import Seo from '@/components/ui/Seo'
import { site } from '@/data/site'

/**
 * Shown by the router when a page crashes or its code fails to load (for example, a lost connection).
 * It stands alone — no header or footer — so it still works if the layout itself is what failed.
 */
export default function ErrorPage() {
  const error = useRouteError()
  if (import.meta.env.DEV && error) console.error(error)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-surface-2 to-white px-4 py-12 text-center">
      <Seo title="Something went wrong" noIndex />
      <a href="/" aria-label="Rifa International – Home">
        <Logo />
      </a>
      <span className="mt-10 inline-flex size-16 items-center justify-center rounded-full bg-warning-50 text-warning-500">
        <TriangleAlert size={32} aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-3xl sm:text-section">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-body">
        We could not show this page. Please reload, or call us and we will help you.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button onClick={() => window.location.reload()} iconLeft={RotateCw}>
          Reload Page
        </Button>
        <Button href={site.phoneHref} variant="outline" iconLeft={Phone}>
          {site.phone}
        </Button>
      </div>
      <a href="/" className="mt-6 rounded-sm font-semibold text-primary-600 hover:text-primary-700">
        Go to Home
      </a>
    </main>
  )
}
