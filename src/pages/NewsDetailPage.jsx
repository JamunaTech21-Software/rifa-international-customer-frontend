import { Link, useParams } from 'react-router'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import Section from '@/components/ui/Section'
import Seo from '@/components/ui/Seo'
import { formatDate } from '@/lib/format'
import { newsImage } from '@/lib/newsImage'
import { useArticle } from '@/lib/useNews'
import NotFoundPage from '@/pages/NotFoundPage'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const { article, loading } = useArticle(slug)

  if (loading) {
    return (
      <Section spacing="none" className="py-8 lg:py-10" containerClassName="max-w-4xl">
        <div role="status" aria-label="Loading the article" className="space-y-4">
          <div className="h-5 w-48 animate-pulse rounded bg-surface-2" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-surface-2" />
          <div className="aspect-[2.2] w-full animate-pulse rounded-card bg-surface-2" />
          <div className="h-4 w-full animate-pulse rounded bg-surface-2" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-surface-2" />
        </div>
      </Section>
    )
  }

  // An unknown, draft or not-yet-published slug shows the same page as any other missing URL.
  if (!article) return <NotFoundPage />

  return (
    <>
      <Seo title={article.title} description={article.excerpt} path={`/news/${article.slug}`} />

      <Section spacing="none" className="py-8 lg:py-10" containerClassName="max-w-4xl">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 rounded-sm text-[0.9375rem] font-semibold text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to News & Updates
        </Link>

        <article className="mt-5">
          <p className="flex items-center gap-2 text-sm text-muted">
            <CalendarDays size={16} aria-hidden="true" />
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
          <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">{article.title}</h1>

          <CloudinaryImage
            publicId={newsImage(article)}
            alt=""
            priority
            sizes="(min-width: 896px) 56rem, 100vw"
            className="mt-6 aspect-[2.2] w-full rounded-card"
          />

          <div className="mt-6 space-y-4 text-base leading-relaxed text-body sm:text-lg">
            {article.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Section>
    </>
  )
}
