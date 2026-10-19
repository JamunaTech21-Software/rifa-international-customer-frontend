import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Radio buttons styled like the Apply form (filled blue circle with a white check when selected).
 * options: array of strings or { value, label }. Spread react-hook-form's register(name) onto it —
 * name/onChange/onBlur/ref are applied to every radio. defaultValue pre-selects an option (uncontrolled use).
 */
export default function RadioGroup({
  options = [],
  inline = true,
  invalid = false,
  defaultValue,
  id,
  className,
  'aria-describedby': describedBy,
  'aria-required': ariaRequired,
  ref,
  ...inputProps
}) {
  return (
    <div
      role="radiogroup"
      aria-describedby={describedBy}
      aria-required={ariaRequired}
      aria-invalid={invalid || undefined}
      className={cn(
        'flex min-h-12 gap-x-8 gap-y-3',
        inline ? 'flex-wrap items-center' : 'flex-col',
        className,
      )}
    >
      {options.map((option, index) => {
        const { value, label } = typeof option === 'string' ? { value: option, label: option } : option
        return (
          <label
            key={value}
            className="inline-flex cursor-pointer items-center gap-2.5 text-[0.9375rem] text-ink"
          >
            <span className="relative inline-flex size-5 shrink-0">
              <input
                ref={ref}
                type="radio"
                value={value}
                id={index === 0 ? id : undefined}
                defaultChecked={defaultValue === undefined ? undefined : defaultValue === value}
                className={cn(
                  'peer size-5 cursor-pointer appearance-none rounded-full border-2 border-line-strong bg-white transition-colors',
                  'checked:border-primary-600 checked:bg-primary-600 hover:border-primary-400',
                  invalid && 'border-danger-600',
                )}
                {...inputProps}
              />
              <Check
                size={12}
                strokeWidth={3.5}
                className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100"
                aria-hidden="true"
              />
            </span>
            {label}
          </label>
        )
      })}
    </div>
  )
}
