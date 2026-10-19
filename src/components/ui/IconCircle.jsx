import { cn } from '@/lib/cn'

const tones = {
  soft: {
    blue: 'bg-primary-50 text-primary-600',
    green: 'bg-tone-green-50 text-tone-green',
    orange: 'bg-tone-orange-50 text-tone-orange',
    purple: 'bg-tone-purple-50 text-tone-purple',
    red: 'bg-tone-red-50 text-tone-red',
    teal: 'bg-tone-teal-50 text-tone-teal',
    navy: 'bg-navy-900/10 text-navy-900',
    white: 'bg-white text-primary-600',
  },
  solid: {
    blue: 'bg-primary-600 text-white',
    green: 'bg-tone-green text-white',
    orange: 'bg-tone-orange text-white',
    purple: 'bg-tone-purple text-white',
    red: 'bg-tone-red text-white',
    teal: 'bg-tone-teal text-white',
    navy: 'bg-navy-900 text-white',
    white: 'bg-white text-navy-900',
  },
}

const sizes = {
  xs: { box: 'size-8', icon: 16 },
  sm: { box: 'size-10', icon: 20 },
  md: { box: 'size-14', icon: 26 },
  lg: { box: 'size-16', icon: 30 },
  xl: { box: 'size-[4.5rem]', icon: 34 },
}

// Icon badge. variant="soft" = tinted background, "solid" = filled background with white icon.
// shape="square" gives the rounded-square box used by the Apply page feature cards.
export default function IconCircle({
  icon: Icon,
  size = 'md',
  tone = 'blue',
  variant = 'soft',
  shape = 'circle',
  label,
  className,
}) {
  const s = sizes[size]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        shape === 'square' ? 'rounded-2xl' : 'rounded-full',
        s.box,
        tones[variant][tone],
        className,
      )}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <Icon size={s.icon} strokeWidth={2} aria-hidden="true" />
    </span>
  )
}
