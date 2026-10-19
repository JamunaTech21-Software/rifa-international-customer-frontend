import { cn } from '@/lib/cn'
import Card from '@/components/ui/Card'
import IconCircle from '@/components/ui/IconCircle'

/**
 * Icon + title (+ text) card.
 *
 * layout="row"    — icon on the left, text on the right (Apply "Why Apply", About "Why Choose").
 * layout="column" — icon on top, text below (Home "Why Choose" grid).
 * tint  — Card tint (white, surface, blue, green …).   tone — icon colour.
 * shape — "circle" or "square" icon box.   bordered={false} drops the card chrome entirely.
 */
export default function FeatureCard({
  icon,
  title,
  text,
  layout = 'row',
  tint = 'white',
  tone = 'blue',
  shape = 'circle',
  iconSize = 'md',
  bordered = true,
  className,
}) {
  const content = (
    <div className={cn('flex gap-3.5', layout === 'column' ? 'flex-col items-start gap-3' : 'items-center')}>
      <IconCircle
        icon={icon}
        size={iconSize}
        tone={tone}
        shape={shape}
        className={bordered && tint !== 'white' && 'bg-white'}
      />
      <div className="min-w-0">
        <h3 className="text-base leading-snug font-bold text-ink">{title}</h3>
        {text && <p className="mt-1 text-[0.9375rem] leading-snug text-body">{text}</p>}
      </div>
    </div>
  )

  if (!bordered) return <div className={className}>{content}</div>

  return (
    <Card tint={tint} padding="sm" shadow={tint === 'white'} className={cn('h-full', className)}>
      {content}
    </Card>
  )
}
