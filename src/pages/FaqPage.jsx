import Accordion from '@/components/ui/Accordion'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import HelpBox from '@/components/sections/HelpBox'
import PageHero from '@/components/sections/PageHero'
import { FAQ_GROUPS, faqsInGroup } from '@/data/faq'

export default function FaqPage() {
  return (
    <>
      <Seo
        title="FAQ"
        description="Answers to common questions about applying for jobs in Malaysia with Rifa International (RL-693): applications, documents, fees, the process and employers."
        path="/faq"
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
        title={[['Frequently Asked ', { text: 'Questions', highlight: true }]]}
        titleSize="md"
        subtitle="Quick Answers to Common Questions"
        subtitleSize="md"
        text="Find answers about applying, documents, fees and the recruitment process. Can’t find what you need? Our team is happy to help."
        imageKey="hero.faq"
        imageAlt="Rifa International office reception"
      />

      <Section spacing="none" className="py-10 lg:py-12" containerClassName="max-w-5xl">
        <div className="space-y-9">
          {FAQ_GROUPS.map((group) => (
            <section key={group} aria-labelledby={`faq-${group}`}>
              <SectionHeading as="h2" title={group} size="sm" underline id={`faq-${group}`} />
              <Accordion
                items={faqsInGroup(group).map(({ question, answer }) => ({ question, answer }))}
                className="mt-4"
              />
            </section>
          ))}
        </div>

        <HelpBox
          title="Still have questions?"
          text="Our recruitment team is always ready to assist you."
          hours
          className="mt-12"
        />
      </Section>
    </>
  )
}
