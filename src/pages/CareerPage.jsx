import { Briefcase, Clock, MapPin } from 'lucide-react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/sections/PageHero'
import { positions } from '@/data/careers'
import { site } from '@/data/site'

export default function CareerPage() {
  return (
    <>
      <Seo
        title="Career"
        description="Work with Rifa International (RL-693): open positions and how to send us your CV."
        path="/career"
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Career' }]}
        title={[['Work With ', { text: 'Us', highlight: true }]]}
        titleSize="lg"
        subtitle="Join the Rifa International Team"
        subtitleSize="md"
        text="We help people build a better future, and we look for caring, honest and hard-working people to join us."
        imageKey="hero.career"
        imageAlt="Rifa International office reception"
      />

      <Section spacing="none" className="py-10 lg:py-12" containerClassName="max-w-5xl">
        <SectionHeading title="Our Culture" highlight="Culture" size="md" />
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-body sm:text-lg">
          At Rifa International we put people first. We work with integrity and transparency, and we take
          pride in guiding workers safely and legally from application to departure. Every member of our team
          plays a part in making that journey smooth.
        </p>

        <div className="mt-10">
          <SectionHeading title="Open Positions" highlight="Positions" size="md" />

          {positions.length > 0 ? (
            <ul className="mt-5 space-y-4">
              {positions.map((position) => (
                <li key={position.id}>
                  <Card
                    padding="md"
                    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-ink">{position.title}</h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase size={15} className="text-primary-600" aria-hidden="true" />
                          {position.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={15} className="text-primary-600" aria-hidden="true" />
                          {position.location}
                        </span>
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-snug text-body">{position.summary}</p>
                    </div>
                    <Button
                      href={`${site.emailHref}?subject=${encodeURIComponent(`Application: ${position.title}`)}`}
                      iconRight
                      className="shrink-0"
                    >
                      Apply by Email
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <Alert variant="info" className="mt-5">
              No open positions right now. Send your CV to{' '}
              <a href={site.emailHref} className="font-semibold text-primary-700 underline">
                {site.email}
              </a>
              .
            </Alert>
          )}

          <p className="mt-5 flex items-center gap-2 text-sm text-body">
            <Clock size={16} className="text-primary-600" aria-hidden="true" />
            Don’t see a role that fits? You can always send your CV to{' '}
            <a href={site.emailHref} className="font-semibold text-primary-700 hover:underline">
              {site.email}.
            </a>
          </p>
        </div>
      </Section>
    </>
  )
}
