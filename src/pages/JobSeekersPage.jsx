import { FileText, Users } from 'lucide-react'
import Alert from '@/components/ui/Alert'
import Card from '@/components/ui/Card'
import CheckList from '@/components/ui/CheckList'
import Accordion from '@/components/ui/Accordion'
import IconCircle from '@/components/ui/IconCircle'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import CtaBanner from '@/components/sections/CtaBanner'
import PageHero from '@/components/sections/PageHero'
import ProcessSteps from '@/components/sections/ProcessSteps'
import RequirementCards from '@/components/sections/RequirementCards'
import WhyApplyGrid from '@/components/sections/WhyApplyGrid'
import { faqsFor } from '@/data/faq'
import { noFeeWarning, requiredDocuments } from '@/data/jobSeekerInfo'
import { steps6 } from '@/data/process'

const CONTAINER = '2xl:max-w-[96rem] 2xl:px-[2.25rem]'

export default function JobSeekersPage() {
  const questions = faqsFor('job-seekers').map(({ question, answer }) => ({ question, answer }))

  return (
    <>
      <Seo
        title="For Job Seekers"
        description="Everything you need to apply for a job in Malaysia with Rifa International (RL-693): benefits, requirements, documents, the process and answers to common questions."
        path="/job-seekers"
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'For Job Seekers' }]}
        title={[['For ', { text: 'Job Seekers', highlight: true }]]}
        titleSize="lg"
        subtitle="Your Journey to Malaysia Starts Here"
        subtitleSize="md"
        text="Learn how to apply, what you need to prepare and what to expect, from your first application to your departure."
        imageKey="hero.job-seekers"
        imageAlt="Smiling worker in a hard hat in front of the Malaysian flag"
      />

      <Section spacing="none" className="pt-8 pb-8 lg:pt-10" containerClassName={CONTAINER}>
        <SectionHeading title="Why Apply with Rifa International?" size="md" align="center" />
        <WhyApplyGrid className="mt-6" />
      </Section>

      <Section spacing="none" className="pb-8" containerClassName={CONTAINER}>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="min-w-0">
            <SectionHeading title="Basic Requirements" size="md" underline />
            <RequirementCards className="mt-4 lg:grid-cols-2" />
          </div>

          <Card tint="blue" shadow={false} padding="md" className="min-w-0">
            <h2 className="flex items-center gap-3 text-xl font-bold text-ink">
              <IconCircle icon={FileText} size="xs" variant="solid" />
              Required Documents
            </h2>
            <CheckList
              items={requiredDocuments}
              size="sm"
              className="mt-4 gap-y-2.5"
              itemClassName="text-[0.9375rem]"
            />
          </Card>
        </div>
      </Section>

      <Section bg="surface" spacing="md" containerClassName={CONTAINER}>
        <SectionHeading title="Application Process" size="md" align="center" />
        <ProcessSteps steps={steps6} numbered size="lg" className="mt-8" />
      </Section>

      <Section spacing="none" className="pt-8 pb-8" containerClassName={CONTAINER}>
        <Alert variant="warning" title="Important Information">
          {noFeeWarning}
        </Alert>
      </Section>

      <Section spacing="none" className="pb-8" containerClassName="max-w-5xl">
        <SectionHeading title="Frequently Asked Questions" size="md" align="center" />
        <Accordion items={questions} className="mt-6" />
      </Section>

      <Section spacing="none" className="pb-10 lg:pb-12" containerClassName={CONTAINER}>
        <CtaBanner
          icon={Users}
          title="Ready to Start Your Career in Malaysia?"
          text="Apply now and let Rifa International (RL-693) connect you with trusted employers."
          button={{ label: 'Apply Now', to: '/apply' }}
          className="py-6 lg:px-12"
        />
      </Section>
    </>
  )
}
