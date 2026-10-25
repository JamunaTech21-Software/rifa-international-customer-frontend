import { CalendarDays, Check, FileText, Phone } from 'lucide-react'
import { cn } from '@/lib/cn'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { site } from '@/data/site'
import { formatDateTime } from '@/lib/format'

// Colour of the status pill (full class names so Tailwind can see them).
const TONES = {
  received: 'bg-tone-blue-50 text-tone-blue',
  under_review: 'bg-primary-50 text-primary-700',
  shortlisted: 'bg-tone-green-50 text-tone-green',
  interview: 'bg-tone-purple-50 text-tone-purple',
  medical: 'bg-tone-orange-50 text-tone-orange',
  visa_processing: 'bg-tone-teal-50 text-tone-teal',
  departed: 'bg-success-50 text-success-700',
  on_hold: 'bg-warning-50 text-tone-orange',
  rejected: 'bg-danger-50 text-danger-600',
}

// What each status means, in plain words.
const MEANINGS = {
  received: 'We have received your application. Our team will review your documents soon.',
  under_review: 'Our team is reviewing your application and documents.',
  shortlisted: 'Good news! You have been shortlisted. We will contact you about the next steps.',
  interview: 'You have reached the interview stage. Our team will contact you with the details.',
  medical: 'The next step is your medical check-up. Our team will share the details with you.',
  visa_processing: 'Your visa is being processed. We will keep you updated.',
  departed: 'You have departed for Malaysia. We wish you every success!',
  on_hold: 'Your application is on hold for now. Please contact our office for more details.',
  rejected:
    'We are sorry, your application was not successful this time. You are welcome to contact our office for more information.',
}

/** The answer of the status check: current status, what it means, and the history so far (oldest first). */
export default function StatusResult({ result }) {
  const history = result.history ?? []

  return (
    <Card padding="md" className="min-w-0">
      <p className="flex items-center gap-2 text-sm font-semibold text-primary-800">
        <FileText size={18} className="text-primary-600" aria-hidden="true" />
        Application Reference No.
      </p>
      <p className="mt-0.5 text-2xl font-bold tracking-tight break-words text-ink sm:text-[1.75rem]">
        {result.reference_no}
      </p>
      <p className="mt-1 text-sm text-body">
        {result.job_category} · Submitted {formatDateTime(result.submitted_at)} (GMT+6)
      </p>

      <div className="mt-5 rounded-card bg-primary-50 p-4">
        <p className="text-sm font-medium text-body">Current status</p>
        <Badge className={cn('mt-1.5 px-3 py-1 text-base', TONES[result.status] ?? 'bg-surface-2 text-ink')}>
          {result.status_label}
        </Badge>
        <p className="mt-3 text-[0.9375rem] leading-snug text-ink">
          {MEANINGS[result.status] ?? 'Our team will keep you updated.'}
        </p>
        <p className="mt-2 flex items-center gap-2 text-xs text-body">
          <CalendarDays size={14} aria-hidden="true" />
          Last updated {formatDateTime(result.status_updated_at)} (GMT+6)
        </p>
      </div>

      <h2 className="mt-6 text-lg font-bold text-primary-800">Progress</h2>
      <ol className="mt-3">
        {history.map((step, index) => {
          const current = index === history.length - 1
          return (
            <li key={`${step.status}-${step.changed_at}`} className="relative flex gap-3.5 pb-5 last:pb-0">
              {index < history.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-7 bottom-0 left-[0.8125rem] w-px bg-line-strong"
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  'relative flex size-7 shrink-0 items-center justify-center rounded-full text-white',
                  current ? 'bg-primary-600' : 'bg-success-600',
                )}
              >
                <Check size={16} strokeWidth={3} />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-ink">
                  {step.status_label}
                  {current && <span className="sr-only"> (current status)</span>}
                </p>
                <p className="text-sm text-body">{formatDateTime(step.changed_at)} (GMT+6)</p>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-4 text-sm text-body">
        <Phone size={16} className="text-primary-600" aria-hidden="true" />
        Questions about your application? Call
        <a href={site.phoneHref} className="font-semibold text-ink hover:text-primary-600">
          {site.phone}
        </a>
      </p>
    </Card>
  )
}
