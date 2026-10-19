import { Navigate, useLocation } from 'react-router'
import {
  Briefcase,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileSearch,
  FileText,
  Home,
  Mail,
  MessageCircle,
  MessageSquareMore,
  Phone,
  Users,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import IconCircle from '@/components/ui/IconCircle'
import Seo from '@/components/ui/Seo'
import ProcessSteps from '@/components/sections/ProcessSteps'
import { image } from '@/data/images'
import { site } from '@/data/site'
import { formatDate, formatTime } from '@/lib/format'

const NEXT_STEPS = [
  {
    icon: ClipboardCheck,
    title: 'Application Received',
    text: 'We have received your information.',
    done: true,
  },
  { icon: FileSearch, title: 'Document Review', text: 'Our team will verify your documents.' },
  { icon: Users, title: 'Shortlisting', text: 'You will be contacted if you are shortlisted.' },
  { icon: MessageSquareMore, title: 'Further Process', text: 'We will guide you on the next steps.' },
]

// Small decorative bursts around the check mark.
function Sparkles() {
  const bar = 'absolute h-1 w-4 rounded-full'
  return (
    <span aria-hidden="true">
      <span className={`${bar} top-4 left-0 -rotate-[35deg] bg-primary-600`} />
      <span className={`${bar} top-9 left-7 w-3 -rotate-[35deg] bg-primary-300`} />
      <span className={`${bar} top-4 right-0 rotate-[35deg] bg-primary-600`} />
      <span className={`${bar} top-9 right-7 w-3 rotate-[35deg] bg-primary-300`} />
      <span className={`${bar} top-0 left-9 w-3 rotate-[60deg] bg-tone-green`} />
      <span className={`${bar} top-0 right-9 w-3 -rotate-[60deg] bg-tone-green`} />
    </span>
  )
}

function InfoBox({ icon, title, children }) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-line bg-white p-3.5 text-left">
      <IconCircle icon={icon} size="md" tone="blue" className="bg-primary-50" />
      <div className="min-w-0">
        <p className="text-[0.9375rem] font-semibold text-ink">{title}</p>
        {children}
      </div>
    </div>
  )
}

export default function ApplySuccessPage() {
  const { state } = useLocation()

  // Opened directly (or refreshed after leaving the form): there is nothing to show, so go back to the form.
  if (!state?.reference_no) return <Navigate to="/apply" replace />

  const { reference_no: referenceNo, submitted_at: submittedAt, confirmation_email_sent: emailSent } = state

  return (
    <>
      <Seo title="Application Submitted" noIndex />

      <div className="relative isolate overflow-hidden bg-linear-to-b from-surface-2 to-white py-6 sm:py-9">
        <CloudinaryImage
          publicId={image('hero.apply-success')}
          alt=""
          sizes="(min-width: 1024px) 25vw, 0px"
          className="absolute inset-y-0 right-0 -z-10 hidden w-1/4 [mask-image:linear-gradient(to_right,transparent,black_60%)] opacity-80 lg:block"
        />

        <div className="container-site">
          <div className="mx-auto max-w-[58.5rem] rounded-[1.25rem] bg-white px-5 py-6 text-center shadow-card-hover sm:px-10 sm:py-7">
            <div className="relative mx-auto size-28">
              <Sparkles />
              <span className="absolute inset-x-0 top-1 mx-auto flex size-[4.5rem] items-center justify-center rounded-full bg-success-600 text-white shadow-lg ring-8 ring-success-600/10">
                <Check size={44} strokeWidth={3.5} aria-hidden="true" />
              </span>
            </div>

            <h1 className="text-[1.75rem] leading-tight font-bold sm:text-[2.25rem]">
              Application Submitted <span className="text-success-600">Successfully!</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink sm:text-[1rem]">
              Thank you for applying through{' '}
              <strong className="font-bold">Rifa International (RL-693).</strong>
              <br className="hidden sm:inline" /> We have received your application and documents. Our team
              will review your information and contact you soon regarding the next steps.
            </p>

            <div className="mx-auto mt-5 flex max-w-[52rem] items-center gap-5 rounded-card bg-primary-50 px-5 py-4 text-left sm:px-8">
              <FileText size={44} className="shrink-0 text-primary-600" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[0.9375rem] font-medium text-ink">Application Reference No.</p>
                <p className="text-2xl font-bold tracking-tight break-words text-ink sm:text-[1.875rem]">
                  {referenceNo}
                </p>
                <p className="text-xs text-body">
                  Please keep this reference number for future communication.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-3 grid max-w-[52rem] gap-3 sm:grid-cols-2">
              <InfoBox icon={CalendarDays} title="Submission Date">
                <p className="text-lg leading-tight font-bold text-ink">{formatDate(submittedAt)}</p>
                <p className="text-xs text-body">{formatTime(submittedAt)} (GMT+6)</p>
              </InfoBox>
              <InfoBox icon={Mail} title="Confirmation Email">
                <p className="text-sm leading-snug text-body">
                  {emailSent ? (
                    <>
                      A confirmation email has been sent to{' '}
                      <strong className="font-bold text-ink">your registered email address.</strong>
                    </>
                  ) : (
                    'Please save your reference number. No email address was provided.'
                  )}
                </p>
              </InfoBox>
            </div>

            <div className="mx-auto mt-5 max-w-[52rem]">
              <h2 className="flex items-center gap-4 text-xl font-bold text-primary-800 before:h-px before:flex-1 before:bg-line-strong after:h-px after:flex-1 after:bg-line-strong">
                What Happens Next?
              </h2>
              <ProcessSteps steps={NEXT_STEPS} numbered size="lg" className="mt-4" />
            </div>

            <div className="mx-auto mt-5 flex max-w-[52rem] flex-col gap-3 sm:flex-row sm:justify-center">
              <Button to="/" variant="outline" iconLeft={Home} className="sm:w-[44%]">
                Back to Home
              </Button>
              <Button to="/malaysia-jobs" iconLeft={Briefcase} iconRight className="sm:w-[56%]">
                View More Job Opportunities
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-[58.5rem] flex-wrap items-center gap-x-6 gap-y-3 rounded-card bg-primary-50/80 px-5 py-4 text-sm text-ink sm:px-8">
            <span className="flex items-center gap-3">
              <IconCircle icon={Mail} size="sm" tone="blue" className="bg-white" />
              For any assistance, you can contact our recruitment team:
            </span>
            <a href={site.phoneHref} className="flex items-center gap-2 font-semibold hover:text-primary-600">
              <Phone size={18} className="text-primary-600" aria-hidden="true" />
              {site.phone}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-semibold hover:text-primary-600"
            >
              <MessageCircle size={18} className="text-primary-600" aria-hidden="true" />
              {site.whatsapp}
            </a>
            <a href={site.emailHref} className="flex items-center gap-2 font-semibold hover:text-primary-600">
              <Mail size={18} className="text-primary-600" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
