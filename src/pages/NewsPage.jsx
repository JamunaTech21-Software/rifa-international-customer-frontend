import { Link } from 'react-router'
import { ArrowRight, CalendarDays } from 'lucide-react'
import Card from '@/components/ui/Card'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import Section from '@/components/ui/Section'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/sections/PageHero'
import { image } from '@/data/images'
import { news } from '@/data/news'
import { formatDate } from '@/lib/format'

export default function NewsPage() {
  return (
    <>
      <Seo
        title="News & Updates"
        description="Latest news and updates from Rifa International (RL-693): new job openings in Malaysia, safety notices and tips for applicants."
        path="/news"
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'News & Updates' }]}
        title={[['News & ', { text: 'Updates', highlight: true }]]}
        titleSize="lg"
        subtitle="Stay Informed"
        subtitleSize="md"
        text="Read the latest announcements, job openings and helpful tips from Rifa International."
        imageKey="hero.news"
        imageAlt="Workers in front of the Kuala Lumpur skyline"
      />

      <Section
        spacing="none"
        className="py-10 lg:py-12"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item) => (
            <li key={item.slug} className="min-w-0">
              <Card padding="none" interactive className="flex h-full flex-col overflow-hidden">
                <CloudinaryImage
                  publicId={image(item.imageKey)}
                  alt=""
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  className="aspect-[1.8] w-full"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <CalendarDays size={16} aria-hidden="true" />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </p>
                  <h2 className="mt-2 text-xl leading-snug font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-snug text-body">{item.excerpt}</p>
                  <Link
                    to={`/news/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 self-start rounded-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Read More<span className="sr-only">: {item.title}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
