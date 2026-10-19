import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import IconCircle from '@/components/ui/IconCircle'

const sizes = {
  md: { circle: 'md', arrowBox: 'h-14', title: 'text-sm', text: 'text-xs' },
  lg: { circle: 'lg', arrowBox: 'h-16', title: 'text-[0.9375rem]', text: 'text-[0.8125rem]' },
}

/**
 * Horizontal row of circle icons joined by arrows (Apply and Malaysia Jobs pages).
 * On mobile the steps wrap into 2–3 per row and the arrows are hidden.
 *
 * steps    — [{ icon, title, text? }] from data/process.js.
 * numbered — prefix titles with "1.", "2.", …
 * size     — md | lg (icon circle size).
 */
export default function ProcessSteps({ steps, variant = 'icons', numbered = false, size = 'md', className }) {
  const s = sizes[size]

  return (
    <ol
      data-variant={variant}
      className={cn(
        'grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-x-2',
        className,
      )}
    >
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          <li className="flex min-w-0 flex-col items-center text-center lg:flex-1">
            <IconCircle
              icon={step.icon}
              size={s.circle}
              className="border-2 border-primary-100 bg-primary-50"
            />
            <p className={cn('mt-2.5 leading-tight font-semibold text-ink', s.title)}>
              {numbered && `${index + 1}. `}
              {step.title}
            </p>
            {step.text && <p className={cn('mt-1 leading-snug text-body', s.text)}>{step.text}</p>}
          </li>
          {index < steps.length - 1 && (
            <li aria-hidden="true" className={cn('hidden shrink-0 items-center lg:flex', s.arrowBox)}>
              <ArrowRight size={18} className="text-primary-600" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}
