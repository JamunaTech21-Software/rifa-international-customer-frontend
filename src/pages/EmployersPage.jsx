import { Building2 } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import CategoryCard from '@/components/sections/CategoryCard'
import CtaBanner from '@/components/sections/CtaBanner'
import FeatureCard from '@/components/sections/FeatureCard'
import PageHero from '@/components/sections/PageHero'
import ProcessSteps from '@/components/sections/ProcessSteps'
import { categories } from '@/data/categories'
import { employerSteps, whyHire } from '@/data/employerInfo'

const CONTAINER = '2xl:max-w-[96rem] 2xl:px-[2.25rem]'

export default function EmployersPage() {
  return (
    <>
      <Seo
        title="For Employers"
        description="Hire reliable, screened Bangladeshi workers through Rifa International (RL-693): licensed, compliant and supported from demand letter to deployment."
        path="/employers"
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'For Employers' }]}
        title={[['For ', { text: 'Employers', highlight: true }]]}
        titleSize="lg"
        subtitle="Hire Reliable Bangladeshi Workers"
        subtitleSize="md"
        text={
          <>
            <strong className="font-semibold text-ink">Rifa International</strong> (RL-693) supplies screened,
            well-prepared workers for employers in Malaysia and other countries, with a legal and transparent
            process.
          </>
        }
        imageKey="hero.employers"
        imageAlt="Rifa International office reception"
      />

      <Section spacing="none" className="pt-8 pb-8 lg:pt-10" containerClassName={CONTAINER}>
        <SectionHeading
          title="Why Hire Through Rifa International?"
          highlight="Rifa International?"
          size="md"
          align="center"
        />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {whyHire.map((item) => (
            <li key={item.title} className="min-w-0">
              <FeatureCard {...item} shape="square" iconSize="md" />
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="none" className="pb-8" containerClassName={CONTAINER}>
        <SectionHeading title="Sectors We Supply" highlight="Supply" size="md" align="center" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      <Section bg="surface" spacing="md" containerClassName={CONTAINER}>
        <SectionHeading title="Employer Hiring Process" highlight="Hiring Process" size="md" align="center" />
        <ProcessSteps steps={employerSteps} numbered size="lg" className="mt-8" />
      </Section>

      <Section spacing="none" className="py-10 lg:py-12" containerClassName={CONTAINER}>
        <CtaBanner
          icon={Building2}
          title="Looking to hire?"
          text="Contact our team."
          button={{ label: 'Contact Us', to: '/contact?subject=employer_partnership' }}
          className="py-6 lg:px-12"
        />
      </Section>
    </>
  )
}
