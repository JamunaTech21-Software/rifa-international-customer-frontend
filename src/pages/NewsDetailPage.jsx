import { Link, useParams } from 'react-router'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import Section from '@/components/ui/Section'
import Seo from '@/components/ui/Seo'
import { image } from '@/data/images'
import { getNews } from '@/data/news'
import { formatDate } from '@/lib/format'
import NotFoundPage from '@/pages/NotFoundPage'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const article = getNews(slug)

  // An unknown slug shows the same page as any other missing URL.
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
            publicId={image(article.imageKey)}
            alt=""
            priority
            sizes="(min-width: 896px) 56rem, 100vw"
            className="mt-6 aspect-[2.2] w-full rounded-card"
          />

          <div className="mt-6 space-y-4 text-base leading-relaxed text-body sm:text-lg">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Section>
    </>
  )
}
