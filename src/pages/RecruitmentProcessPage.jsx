import { Fragment } from 'react'
import { ArrowRight, Clock, FileText, Globe, ShieldCheck, Users } from 'lucide-react'
import { cn } from '@/lib/cn'
import Card from '@/components/ui/Card'
import CheckList from '@/components/ui/CheckList'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import IconCircle from '@/components/ui/IconCircle'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import HelpBox from '@/components/sections/HelpBox'
import PageHero from '@/components/sections/PageHero'
import { image } from '@/data/images'
import { requiredDocuments } from '@/data/jobSeekerInfo'
import { steps7 } from '@/data/process'

const BADGES = [
  { icon: ShieldCheck, title: 'Government', text: 'Approved (RL-693)', tone: 'navy' },
  { icon: Users, title: 'Legal & Transparent', text: 'Process' },
  { icon: Globe, title: 'Safe & Reliable', text: 'Recruitment' },
]

const TIMELINE = [
  { when: '1–3 Days', what: 'Application' },
  { when: '3–7 Days', what: 'Screening & Interview' },
  { when: '1–2 Weeks', what: 'Medical & Documentation' },
  { when: '2–4 Weeks', what: 'Visa & Departure' },
]

// Card tint + number circle colour for each step tone.
const STEP_TONES = {
  blue: { card: 'bg-tone-blue-50', dot: 'bg-primary-600' },
  green: { card: 'bg-tone-green-50', dot: 'bg-tone-green' },
  purple: { card: 'bg-tone-purple-50', dot: 'bg-tone-purple' },
  orange: { card: 'bg-tone-orange-50', dot: 'bg-tone-orange' },
  red: { card: 'bg-tone-red-50', dot: 'bg-tone-red' },
}

function StepCard({ step, number }) {
  const tone = STEP_TONES[step.tone] ?? STEP_TONES.blue
  return (
    <li className={cn('flex h-full flex-col rounded-card p-3.5 xl:p-2.5', tone.card)}>
      <div className="flex items-start gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white',
            tone.dot,
          )}
        >
          {number}
        </span>
        <h3 className="pt-0.5 text-[0.9375rem] leading-tight font-bold text-ink">
          <span className="sr-only">Step {number}: </span>
          {step.title}
        </h3>
      </div>
      <CloudinaryImage
        publicId={image(step.imageKey)}
        alt=""
        sizes="(min-width: 1280px) 11vw, (min-width: 640px) 45vw, 90vw"
        className="mt-3 aspect-[1.65] w-full rounded-lg"
      />
      <p className="mt-3 text-[0.9375rem] leading-snug text-body xl:mt-2.5 xl:text-[0.8125rem]">
        {step.text}
      </p>
    </li>
  )
}

export default function RecruitmentProcessPage() {
  return (
    <>
      <Seo
        title="Recruitment Process"
        description="Our transparent, legal and step-by-step recruitment process takes Bangladeshi workers from application to departure for jobs in Malaysia."
        path="/recruitment-process"
      />

      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Recruitment Process' }]}
        title={[['Recruitment ', { text: 'Process', highlight: true }]]}
        titleSize="lg"
        size="sm"
        subtitle="From Application to a Better Future"
        text="We follow a transparent, legal and streamlined recruitment process to ensure a safe and smooth journey for Bangladeshi workers to Malaysia and other countries."
        imageKey="hero.recruitment-process"
        imageAlt="Smiling worker in a hard hat with colleagues in front of the Kuala Lumpur skyline and the Malaysian flag"
        script={'Same\nPeople\nBigger\nOpportunities'}
      />

      <Section
        spacing="none"
        className="pt-5 pb-6 lg:pb-5"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <SectionHeading
            title="Our Recruitment Process"
            highlight="Recruitment Process"
            subtitle="A simple, transparent and step-by-step process to help you start your journey to Malaysia."
            size="md"
            className="[&>h2]:text-[1.875rem]"
          />
          <ul className="flex flex-wrap gap-x-7 gap-y-3 rounded-card bg-surface px-5 py-3">
            {BADGES.map((badge) => (
              <li key={badge.title} className="flex items-center gap-2.5">
                <IconCircle
                  icon={badge.icon}
                  size="xs"
                  tone={badge.tone ?? 'blue'}
                  variant={badge.tone === 'navy' ? 'solid' : 'soft'}
                />
                <span className="text-sm leading-snug font-semibold text-ink">
                  {badge.title}
                  <span className="block">{badge.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:items-stretch xl:gap-0">
          {steps7.map((step, index) => (
            <Fragment key={step.title}>
              <StepCard step={step} number={index + 1} />
              {index < steps7.length - 1 && (
                <li aria-hidden="true" className="hidden shrink-0 items-center px-1.5 xl:flex">
                  <ArrowRight size={18} className="text-primary-600" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </Section>

      <Section
        spacing="none"
        className="pb-10 lg:pb-12"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <div className="grid gap-5 lg:grid-cols-[1.12fr_1.1fr_0.95fr]">
          <section
            aria-labelledby="timeline-title"
            className="rounded-card bg-linear-to-br from-navy-900 to-navy-700 p-5 text-white sm:p-6"
          >
            <div className="flex items-start gap-4">
              <IconCircle icon={Clock} size="lg" tone="white" className="bg-white/15 text-white" />
              <div>
                <h2 id="timeline-title" className="text-xl font-bold text-white">
                  Estimated Timeline
                </h2>
                <p className="mt-1 text-[0.9375rem] leading-snug text-white/90">
                  The total process usually takes 4–8 weeks depending on the employer and visa approval.
                </p>
              </div>
            </div>

            <ol className="relative mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
              <span
                aria-hidden="true"
                className="absolute top-[0.3125rem] right-[12.5%] left-[12.5%] hidden h-0.5 bg-primary-300/60 sm:block"
              />
              {TIMELINE.map((point) => (
                <li key={point.when} className="relative flex flex-col items-center text-center">
                  <span aria-hidden="true" className="relative z-10 size-3.5 rounded-full bg-primary-300" />
                  <p className="mt-3 text-base font-bold">{point.when}</p>
                  <p className="text-[0.8125rem] leading-snug text-white/85">{point.what}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="documents-title"
            className="relative overflow-hidden rounded-card bg-tone-blue-50 p-5 sm:p-6"
          >
            <div className="relative z-10 sm:max-w-[68%] lg:max-w-[72%]">
              <h2 id="documents-title" className="flex items-center gap-3 text-xl font-bold text-ink">
                <IconCircle icon={FileText} size="xs" variant="solid" />
                Required Documents
              </h2>
              <CheckList
                items={requiredDocuments}
                size="sm"
                className="mt-4 gap-y-2.5"
                itemClassName="text-[0.9375rem]"
              />
            </div>
            <CloudinaryImage
              publicId={image('documents.passport')}
              alt=""
              sizes="220px"
              className="mt-4 h-40 w-full rounded-lg object-contain sm:absolute sm:top-0 sm:right-0 sm:mt-0 sm:h-full sm:w-[34%] sm:rounded-none sm:[mask-image:linear-gradient(to_right,transparent,black_35%)] sm:object-cover"
            />
          </section>

          <HelpBox imageKey="help.agent" />
        </div>
      </Section>
    </>
  )
}
