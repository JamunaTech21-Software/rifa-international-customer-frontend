import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

// Checkbox with its label text as children ("I confirm that the information provided is true and correct.").
export default function Checkbox({ invalid = false, className, children, ref, ...rest }) {
  return (
    <label
      className={cn('inline-flex cursor-pointer items-start gap-3 text-[0.9375rem] text-ink', className)}
    >
      <span className="relative mt-0.5 inline-flex size-5 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'peer size-5 cursor-pointer appearance-none rounded-[5px] border-2 border-line-strong bg-white transition-colors',
            'checked:border-primary-600 checked:bg-primary-600 hover:border-primary-400',
            invalid && 'border-danger-600',
          )}
          {...rest}
        />
        <Check
          size={14}
          strokeWidth={3.5}
          className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100"
          aria-hidden="true"
        />
      </span>
      <span>{children}</span>
    </label>
  )
}
