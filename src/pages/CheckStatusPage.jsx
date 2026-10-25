import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { FileText, Phone, ShieldCheck } from 'lucide-react'
import Card from '@/components/ui/Card'
import IconCircle from '@/components/ui/IconCircle'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/sections/PageHero'
import { normalizeReference } from '@/api/status'
import StatusForm from '@/features/status/StatusForm'
import StatusResult from '@/features/status/StatusResult'

const HOW_IT_WORKS = [
  {
    icon: FileText,
    title: 'Reference number',
    text: 'It is on the confirmation page and in the confirmation email after you apply.',
  },
  {
    icon: Phone,
    title: 'Mobile number',
    text: 'Use the same mobile number you gave on your application.',
  },
  {
    icon: ShieldCheck,
    title: 'Your privacy',
    text: 'We only show the progress of your application. Your personal details are never shown here.',
  },
]

export default function CheckStatusPage() {
  const [params] = useSearchParams()
  const [result, setResult] = useState(null)
  const resultRef = useRef(null)

  // ?ref=RIFA-… (the link on the "Application Submitted" page) fills in the reference number.
  const initialReference = params.get('ref') ? normalizeReference(params.get('ref')) : ''

  // Show the answer and bring it into view (on phones it appears below the form).
  const showResult = (status) => {
    setResult(status)
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      resultRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <>
      <Seo
        title="Check Application Status"
        description="Check the progress of your job application with Rifa International (RL-693) using your reference number and mobile number."
        path="/check-status"
        noIndex
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Check Application Status' }]}
        title={[['Check Your ', { text: 'Application', highlight: true }]]}
        titleSize="lg"
        subtitle="Follow Your Progress"
        subtitleSize="md"
        text="Enter your reference number and mobile number to see where your application stands."
        imageKey="hero.apply"
        imageAlt="Smiling worker in a hard hat in front of the Kuala Lumpur skyline"
      />

      <Section
        spacing="none"
        className="py-8 lg:py-10"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]">
          <Card tint="surface" shadow={false} padding="md" className="min-w-0">
            <SectionHeading title="Find Your Application" size="sm" className="mb-4" />
            <StatusForm
              initialReference={initialReference}
              onReset={() => setResult(null)}
              onResult={showResult}
            />
          </Card>

          <div
            ref={resultRef}
            tabIndex={-1}
            aria-live="polite"
            className="min-w-0 scroll-mt-28 outline-none focus:outline-none focus-visible:outline-none"
          >
            {result ? (
              <StatusResult result={result} />
            ) : (
              <Card padding="md" className="min-w-0">
                <SectionHeading title="How It Works" size="sm" className="mb-4" />
                <ul className="space-y-4">
                  {HOW_IT_WORKS.map(({ icon, title, text }) => (
                    <li key={title} className="flex gap-3.5">
                      <IconCircle icon={icon} size="sm" variant="solid" />
                      <div className="min-w-0">
                        <h3 className="text-[0.9375rem] font-bold text-primary-800">{title}</h3>
                        <p className="text-[0.9375rem] leading-snug text-body">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
