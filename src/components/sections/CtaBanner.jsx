import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import IconCircle from '@/components/ui/IconCircle'

const variants = {
  navy: 'bg-linear-to-r from-navy-900 to-navy-700',
  primary: 'bg-linear-to-br from-primary-600 to-primary-800',
}

/**
 * Call-to-action banner.
 *
 * variant — "navy" (Home, Apply) or "primary" (bright blue, Malaysia Jobs).
 * icon    — lucide icon shown in a translucent circle.
 * button  — { label, to | href } → white "Apply Now →" style button on the right.
 * stacked — icon and text on top, button on its own row below, aligned right (for narrow sidebars).
 * children — optional extra slot after the text (e.g. a decorative image).
 */
export default function CtaBanner({
  variant = 'navy',
  icon,
  title,
  text,
  button,
  stacked = false,
  className,
  children,
}) {
  return (
    <section
      className={cn(
        'flex flex-col gap-5 rounded-card p-5 text-white shadow-card sm:p-6',
        !stacked && 'sm:flex-row sm:items-center sm:gap-6 lg:px-8',
        variants[variant],
        className,
      )}
    >
      <div className={cn('flex min-w-0 flex-1 gap-4', !stacked && 'sm:contents')}>
        {icon && <IconCircle icon={icon} size="lg" tone="white" className="bg-white/15 text-white" />}
        <div className="min-w-0 flex-1">
          <h2 className="text-xl leading-snug font-bold text-white sm:text-2xl">{title}</h2>
          {text && <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-relaxed text-white/85">{text}</p>}
        </div>
      </div>
      {children}
      {button && (
        <Button
          variant="white"
          iconRight
          shape="pill"
          to={button.to}
          href={button.href}
          className={stacked ? 'self-end' : 'self-start sm:self-center'}
        >
          {button.label}
        </Button>
      )}
    </section>
  )
}
