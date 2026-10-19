import { Briefcase, Building2 } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import CtaBanner from '@/components/sections/CtaBanner'
import FeatureCard from '@/components/sections/FeatureCard'
import PageHero from '@/components/sections/PageHero'
import { services } from '@/data/services'

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Our Services"
        description="Complete recruitment solutions from Bangladesh to Malaysia: recruitment, screening, visa processing, BMET clearance, medical, orientation and travel support."
        path="/services"
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Our Services' }]}
        title={[['Our ', { text: 'Services', highlight: true }]]}
        titleSize="xl"
        subtitle="Complete Recruitment Solutions from Bangladesh to Malaysia"
        subtitleSize="md"
        text={
          <>
            <strong className="font-semibold text-ink">Rifa International</strong> (RL-693) supports you at
            every step, from your first application to your arrival in Malaysia.
          </>
        }
        imageKey="hero.services"
        imageAlt="Workers from different trades in front of the Kuala Lumpur skyline"
      />

      <Section
        spacing="none"
        className="pt-8 pb-8 lg:pt-10"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <SectionHeading
          eyebrow="What we offer"
          title="Everything You Need for Your Journey"
          highlight="Your Journey"
          align="center"
          size="md"
        />
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <li key={service.title} className="min-w-0">
              <FeatureCard {...service} layout="column" iconSize="md" />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="none"
        className="pb-10 lg:pb-12"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <CtaBanner
            variant="primary"
            stacked
            icon={Briefcase}
            title="Looking for a job in Malaysia?"
            text="Apply online today and let our team connect you with trusted employers."
            button={{ label: 'Apply Now', to: '/apply' }}
          />
          <CtaBanner
            variant="navy"
            stacked
            icon={Building2}
            title="Hiring workers from Bangladesh?"
            text="Partner with Rifa International for reliable, legal and well-prepared workers."
            button={{ label: 'Contact Us', to: '/contact?subject=employer_partnership' }}
          />
        </div>
      </Section>
    </>
  )
}
