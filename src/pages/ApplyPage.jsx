import { lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router'
import { Users } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import CtaBanner from '@/components/sections/CtaBanner'
import PageHero from '@/components/sections/PageHero'
import ProcessSteps from '@/components/sections/ProcessSteps'
import RequirementCards from '@/components/sections/RequirementCards'
import WhyApplyGrid from '@/components/sections/WhyApplyGrid'
import { getCategory } from '@/data/categories'
import { steps6 } from '@/data/process'
import useSubmitApplication from '@/features/apply/useSubmitApplication'

// The form (with its validation library) loads after the first paint so the page appears sooner.
const ApplyForm = lazy(() => import('@/features/apply/ApplyForm'))

export default function ApplyPage() {
  const [params] = useSearchParams()
  // ?category=<slug> (from a job card or category link) preselects the job category; unknown slugs are ignored.
  const category = getCategory(params.get('category') ?? '')?.slug ?? ''

  const { submit, errorMessage } = useSubmitApplication()

  return (
    <>
      <Seo
        title="Apply Now"
        description="Apply online for jobs in Malaysia with Rifa International (RL-693). Fill out the application form and our recruitment team will contact you soon."
        path="/apply"
      />

      <PageHero
        size="xs"
        titleSize="2xl"
        subtitleSize="md"
        title={[['Apply ', { text: 'Now', highlight: true }]]}
        subtitle="Take the first step towards a better career in Malaysia."
        text="Fill out the application form below and our recruitment team will contact you soon."
        imageKey="hero.apply"
        imageAlt="Smiling worker in a hard hat in front of the Malaysian flag and the Petronas Towers"
      />

      <Section
        spacing="none"
        className="pt-5 pb-10 lg:pb-12"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-7">
          {/* On phones the form comes first; the information follows below it. */}
          <div className="order-last min-w-0 space-y-5 lg:order-first">
            <div>
              <SectionHeading title="Why Apply with Rifa International?" size="sm" />
              <WhyApplyGrid className="mt-3" />
            </div>

            <div>
              <SectionHeading title="Basic Requirements" size="sm" underline />
              <RequirementCards className="mt-3" />
            </div>

            <div>
              <SectionHeading title="Application Process" size="sm" underline />
              <ProcessSteps steps={steps6} numbered size="sm" className="mt-4" />
            </div>

            <CtaBanner
              icon={Users}
              title="Ready to Start Your Career in Malaysia?"
              text="Apply now and let Rifa International (RL-693) connect you with trusted employers."
              className="py-5"
            />
          </div>

          <div className="min-w-0 lg:sticky lg:top-24">
            <Suspense
              fallback={
                <div
                  role="status"
                  aria-label="Loading the application form"
                  className="min-h-[52rem] rounded-card border border-line bg-surface"
                />
              }
            >
              <ApplyForm defaultCategory={category} onSubmit={submit} errorMessage={errorMessage} />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  )
}
