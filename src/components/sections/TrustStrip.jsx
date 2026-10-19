import { cn } from '@/lib/cn'
import IconCircle from '@/components/ui/IconCircle'

/**
 * Row of icon + short text highlights.
 *
 * variant="navy"   — full-width navy band with rounded top corners, white text and vertical dividers
 *                    (Home page, overlaps the bottom of the hero photo).
 * variant="inline" — compact icon + two-line label, no background (Malaysia Jobs hero).
 * items — [{ icon, title, text?, tone? }]  (tone applies to the inline variant's icon circle).
 */
export default function TrustStrip({ items, variant = 'navy', className }) {
  if (variant === 'inline') {
    return (
      <ul className={cn('flex flex-wrap items-center gap-x-8 gap-y-4', className)}>
        {items.map((item, index) => (
          <li
            key={item.title}
            className={cn(
              'flex items-center gap-3',
              index > 0 && 'sm:border-l sm:border-line-strong sm:pl-8',
            )}
          >
            <IconCircle
              icon={item.icon}
              size="sm"
              tone={item.tone ?? 'blue'}
              variant={item.tone === 'navy' ? 'solid' : 'soft'}
            />
            <span className="text-[0.9375rem] leading-snug font-semibold text-ink">
              {item.title}
              {item.text && <span className="block font-semibold">{item.text}</span>}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className={cn('relative z-10 -mt-7 rounded-t-[1.75rem] bg-navy-900 text-white', className)}>
      {/* Wider than the page container so five columns fit with room for two-line text (as in the design). */}
      <div className="mx-auto max-w-384 px-4 sm:px-6 2xl:pr-[3.75rem] 2xl:pl-[4.5rem]">
        <ul className="grid gap-x-6 gap-y-6 py-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:py-8">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                'flex items-center gap-3.5 lg:gap-3 lg:px-2.5',
                index > 0 && 'lg:border-l lg:border-white/20',
              )}
            >
              <IconCircle
                icon={item.icon}
                size="lg"
                tone="blue"
                variant="solid"
                className="size-14 bg-primary-600/90 lg:size-[3.75rem]"
              />
              <div className="min-w-0">
                <p className="text-base leading-tight font-bold 2xl:text-[1.0625rem]">{item.title}</p>
                <p className="mt-1 text-[0.9375rem] leading-snug text-white/80">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
