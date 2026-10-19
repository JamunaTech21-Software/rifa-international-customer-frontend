import { createBrowserRouter } from 'react-router'
import PublicLayout from '@/components/layout/PublicLayout'
import ErrorPage from '@/pages/ErrorPage'

// Every page is code-split; React Router loads the module on first navigation.
const page = (load) => async () => ({ Component: (await load()).default })

const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, lazy: page(() => import('@/pages/HomePage')) },
      { path: 'about', lazy: page(() => import('@/pages/AboutPage')) },
      { path: 'malaysia-jobs', lazy: page(() => import('@/pages/MalaysiaJobsPage')) },
      { path: 'services', lazy: page(() => import('@/pages/ServicesPage')) },
      { path: 'recruitment-process', lazy: page(() => import('@/pages/RecruitmentProcessPage')) },
      { path: 'job-seekers', lazy: page(() => import('@/pages/JobSeekersPage')) },
      { path: 'employers', lazy: page(() => import('@/pages/EmployersPage')) },
      { path: 'news', lazy: page(() => import('@/pages/NewsPage')) },
      { path: 'news/:slug', lazy: page(() => import('@/pages/NewsDetailPage')) },
      { path: 'career', lazy: page(() => import('@/pages/CareerPage')) },
      { path: 'faq', lazy: page(() => import('@/pages/FaqPage')) },
      { path: 'contact', lazy: page(() => import('@/pages/ContactPage')) },
      { path: 'apply', lazy: page(() => import('@/pages/ApplyPage')) },
      { path: 'apply/success', lazy: page(() => import('@/pages/ApplySuccessPage')) },
      // UI kit preview — only registered in development, so it never ships to production.
      ...(import.meta.env.DEV ? [{ path: 'dev/ui', lazy: page(() => import('@/pages/DevUiPage')) }] : []),
      { path: '*', lazy: page(() => import('@/pages/NotFoundPage')) },
    ],
  },
])

export default router
