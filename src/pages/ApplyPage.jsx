import { useSearchParams } from 'react-router'
import {
  BedDouble,
  Coins,
  FileText,
  GraduationCap,
  Handshake,
  Headset,
  IdCard,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import IconCircle from '@/components/ui/IconCircle'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import CtaBanner from '@/components/sections/CtaBanner'
import FeatureCard from '@/components/sections/FeatureCard'
import PageHero from '@/components/sections/PageHero'
import ProcessSteps from '@/components/sections/ProcessSteps'
import { getCategory } from '@/data/categories'
import { steps6 } from '@/data/process'
import ApplyForm from '@/features/apply/ApplyForm'
import useSubmitApplication from '@/features/apply/useSubmitApplication'

const WHY_APPLY = [
  { icon: ShieldCheck, title: 'Government Approved Recruiting Agency (RL-693)' },
  { icon: Users, title: 'Genuine Job Opportunities in Malaysia' },
  { icon: Handshake, title: 'Safe, Legal & Transparent Process' },
  { icon: BedDouble, title: 'Accommodation (As per Employer)' },
  { icon: Coins, title: 'Attractive Salary & Overtime' },
  { icon: Headset, title: 'Full Support from Application to Departure' },
]

const REQUIREMENTS = [
  { icon: IdCard, title: 'Valid Passport', note: '(or ready to apply)' },
  { icon: UserRound, title: 'Age', note: '18 – 45 Years (Varies by Job)' },
  { icon: GraduationCap, title: 'Minimum Physical Fitness' },
  { icon: FileText, title: 'Job-specific Skills/Experience', note: '(if required)' },
]

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
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {WHY_APPLY.map((feature) => (
                  <li key={feature.title} className="min-w-0">
                    <FeatureCard {...feature} shape="square" iconSize="sm" compact tint="surface" />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading title="Basic Requirements" size="sm" underline />
              <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {REQUIREMENTS.map((item) => (
                  <li key={item.title} className="min-w-0">
                    <Card
                      padding="sm"
                      shadow={false}
                      className="flex h-full flex-col items-center py-3 text-center"
                    >
                      <IconCircle icon={item.icon} size="sm" className="bg-transparent text-primary-600" />
                      <p className="mt-1.5 text-sm leading-snug font-semibold text-ink">{item.title}</p>
                      {item.note && <p className="text-[0.8125rem] leading-snug text-body">{item.note}</p>}
                    </Card>
                  </li>
                ))}
              </ul>
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
            <ApplyForm defaultCategory={category} onSubmit={submit} errorMessage={errorMessage} />
          </div>
        </div>
      </Section>
    </>
  )
}
