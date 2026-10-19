import { cn } from '@/lib/cn'

const tones = {
  soft: {
    blue: 'bg-primary-50 text-primary-700',
    success: 'bg-success-50 text-success-700',
    warning: 'bg-warning-50 text-tone-orange',
    danger: 'bg-danger-50 text-danger-600',
    neutral: 'bg-surface-2 text-ink',
  },
  solid: {
    blue: 'bg-primary-600 text-white',
    success: 'bg-success-600 text-white',
    warning: 'bg-warning-500 text-white',
    danger: 'bg-danger-600 text-white',
    neutral: 'bg-navy-900 text-white',
  },
}

const sizes = {
  sm: 'gap-1 px-2.5 py-0.5 text-xs',
  md: 'gap-1.5 px-3 py-1 text-sm',
}

// Small pill label — job counts ("120+ Jobs"), salary ("RM 1,800 - 2,200"), statuses.
export default function Badge({
  tone = 'blue',
  variant = 'soft',
  size = 'md',
  icon: Icon,
  className,
  children,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold whitespace-nowrap',
        tones[variant][tone],
        sizes[size],
        className,
      )}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 14} aria-hidden="true" />}
      {children}
    </span>
  )
}
