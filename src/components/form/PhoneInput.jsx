import { cn } from '@/lib/cn'

// Bangladesh mobile number with a fixed 🇧🇩 +880 prefix. The input holds only the local part.
export default function PhoneInput({
  invalid = false,
  placeholder = 'Enter mobile number',
  className,
  ref,
  ...rest
}) {
  return (
    <div
      className={cn(
        'flex h-12 w-full overflow-hidden rounded-lg border border-line-strong bg-white transition-colors',
        'focus-within:border-primary-500 focus-within:ring-3 focus-within:ring-primary-100 hover:border-primary-300',
        invalid &&
          'border-danger-600 focus-within:border-danger-600 focus-within:ring-danger-50 hover:border-danger-600',
        className,
      )}
    >
      <span className="flex shrink-0 items-center gap-2 border-r border-line px-3 text-[0.9375rem] font-medium text-ink">
        <svg viewBox="0 0 20 12" className="h-3.5 w-5.5 rounded-[2px]" aria-hidden="true">
          <rect width="20" height="12" className="fill-flag-bd-green" />
          <circle cx="9" cy="6" r="3.6" className="fill-flag-bd-red" />
        </svg>
        +880
      </span>
      <input
        ref={ref}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder={placeholder}
        className="h-full w-full min-w-0 bg-transparent px-4 text-[0.9375rem] text-ink placeholder:text-muted/80 focus-visible:ring-0 focus-visible:ring-offset-0"
        {...rest}
      />
    </div>
  )
}
