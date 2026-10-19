import { Outlet } from 'react-router'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import ScrollToTop from '@/components/layout/ScrollToTop'
import TopBar from '@/components/layout/TopBar'

export default function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only z-50 rounded-btn bg-primary-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <TopBar />
      <Header />
      <main id="main" tabIndex={-1} className="min-h-screen focus-visible:ring-0">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
