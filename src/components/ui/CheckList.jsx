import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

const sizes = {
  sm: { gap: 'gap-2', text: 'text-sm', dot: 'size-4', icon: 10 },
  md: { gap: 'gap-2.5', text: 'text-base', dot: 'size-5', icon: 12 },
  lg: { gap: 'gap-3', text: 'text-lg', dot: 'size-6', icon: 14 },
}

// List with solid blue check circles ("Why Work in Malaysia?", "Our Values", required documents).
export default function CheckList({ items, size = 'md', columns = 1, className, itemClassName }) {
  const s = sizes[size]
  return (
    <ul className={cn('grid gap-x-6 gap-y-2.5', columns === 2 && 'sm:grid-cols-2', className)}>
      {items.map((item) => (
        <li key={item} className={cn('flex items-start', s.gap, s.text, itemClassName)}>
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full bg-primary-600 text-white',
              s.dot,
            )}
          >
            <Check size={s.icon} strokeWidth={3.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
