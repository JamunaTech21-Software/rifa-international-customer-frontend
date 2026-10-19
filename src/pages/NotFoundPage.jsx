import { Briefcase, Home } from 'lucide-react'
import Button from '@/components/ui/Button'
import Seo from '@/components/ui/Seo'

export default function NotFoundPage() {
  return (
    <section className="bg-linear-to-b from-surface-2 to-white py-16 text-center sm:py-24">
      <Seo title="Page Not Found" noIndex />
      <div className="container-site">
        <p className="font-display text-[5rem] leading-none font-extrabold text-primary-600 sm:text-[8rem]">
          404
        </p>
        <h1 className="mt-3 text-3xl sm:text-section">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-body">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" iconLeft={Home}>
            Back to Home
          </Button>
          <Button to="/malaysia-jobs" variant="outline" iconLeft={Briefcase}>
            Browse Malaysia Jobs
          </Button>
        </div>
      </div>
    </section>
  )
}
