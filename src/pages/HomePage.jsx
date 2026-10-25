import {
  BadgeCheck,
  BriefcaseBusiness,
  FileBadge,
  Handshake,
  Headset,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import CategoryCard from '@/components/sections/CategoryCard'
import CtaBanner from '@/components/sections/CtaBanner'
import FeatureCard from '@/components/sections/FeatureCard'
import HomeHero from '@/components/sections/HomeHero'
import JobCard from '@/components/sections/JobCard'
import JobCardSkeleton from '@/components/sections/JobCardSkeleton'
import ProcessSteps from '@/components/sections/ProcessSteps'
import TrustStrip from '@/components/sections/TrustStrip'
import { categories } from '@/data/categories'
import { steps7 } from '@/data/process'
import useJobs from '@/lib/useJobs'

const TRUST_ITEMS = [
  { icon: FileBadge, title: 'RL-693', text: 'Government Approved Recruiting Agency' },
  { icon: Users, title: 'Trusted Partner', text: 'Connecting Skilled Workers to Global Opportunities' },
  { icon: ShieldCheck, title: 'Safe & Legal Process', text: 'Full Compliance with BMET & BAIRA' },
  { icon: Headset, title: 'End-to-End Support', text: 'From Application to Departure' },
  { icon: BriefcaseBusiness, title: 'Better Future', text: 'Trusted by Thousands of Workers' },
]

const WHY_CHOOSE = [
  { icon: BadgeCheck, title: 'Government approved (RL-693)' },
  { icon: Handshake, title: 'Direct employer collaboration' },
  { icon: Scale, title: 'Transparent and ethical process' },
  { icon: Users, title: 'Experienced and professional team' },
  { icon: Headset, title: 'End-to-end support' },
  { icon: HeartHandshake, title: 'Dedicated support for workers' },
]

// Titles only — the full descriptions live on the Recruitment Process page.
const PROCESS_STEPS = steps7.map(({ icon, title }) => ({ icon, title }))

// The design's "View All Jobs" pill is smaller and has a light border compared with the default outline button.
const VIEW_ALL_CLASS =
  'h-[2.5625rem] border border-primary-200 px-5 text-[0.9375rem] hover:border-primary-400'

export default function HomePage() {
  const { jobs, loading } = useJobs()

  return (
    <>
      <Seo
        title="Home"
        description="Rifa International (RL-693) – government approved recruiting agency for jobs in Malaysia."
        path="/"
      />

      <HomeHero />
      <TrustStrip items={TRUST_ITEMS} />

      {/* Tight top padding on purpose: in the design this section starts right under the navy strip. */}
      <Section spacing="none" className="pt-6 pb-12 lg:pb-14">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            className="[&>p]:mb-1"
            eyebrow="Job opportunities in Malaysia"
            title="Explore Job Opportunities"
            highlight="Job Opportunities"
          />
          <Button to="/malaysia-jobs" variant="outline" shape="pill" iconRight className={VIEW_ALL_CLASS}>
            View All Jobs
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      <Section bg="surface">
        <SectionHeading title="Why Choose Rifa International?" align="center" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button to="/about" iconRight>
            Learn More About Us
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Our Recruitment Process" highlight="Recruitment Process" align="center" />
        <ProcessSteps steps={PROCESS_STEPS} size="lg" className="mt-10" />
        <div className="mt-9 text-center">
          <Button to="/recruitment-process" variant="outline" iconRight>
            See Full Process
          </Button>
        </div>
      </Section>

      <Section bg="surface">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title="Latest Job Opportunities" highlight="Job Opportunities" />
          <Button to="/malaysia-jobs" variant="outline" shape="pill" iconRight className={VIEW_ALL_CLASS}>
            View All Jobs
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }, (_, index) => <JobCardSkeleton key={index} />)
            : jobs.slice(0, 3).map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </Section>

      <Section>
        <CtaBanner
          icon={Users}
          title="Ready to Start Your Career in Malaysia?"
          text="Apply now and let Rifa International (RL-693) connect you with trusted employers."
          button={{ label: 'Apply Now', to: '/apply' }}
          className="py-8 lg:px-12"
        />
      </Section>
    </>
  )
}
