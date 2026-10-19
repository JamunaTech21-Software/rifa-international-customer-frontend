import { cn } from '@/lib/cn'

// Jalur Gemilang proportions: 14 stripes, blue canton 14 × 8 units on a 28 × 14 field.
const STRIPES = Array.from({ length: 14 }, (_, i) => i)

// 14-point star centred at (cx, cy).
function starPoints(cx, cy, outer, inner) {
  return Array.from({ length: 28 }, (_, i) => {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (Math.PI * i) / 14 - Math.PI / 2
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`
  }).join(' ')
}

/**
 * Malaysian flag. By default a decorative waving flag for hero corners (flat={true} gives the plain flag). Fades out to the right and bottom so it
 * blends into the page. Purely decorative (aria-hidden).
 */
export default function MalaysiaFlag({ className, flat = false }) {
  return (
    <svg
      viewBox="0 0 28 14"
      aria-hidden="true"
      className={cn(
        'pointer-events-none',
        !flat &&
          'origin-top-left -rotate-6 skew-y-3 [mask-image:linear-gradient(135deg,black_25%,transparent_85%)]',
        className,
      )}
    >
      {STRIPES.map((i) => (
        <rect
          key={i}
          y={i}
          width="28"
          height="1"
          className={i % 2 === 0 ? 'fill-flag-my-red' : 'fill-white'}
        />
      ))}
      <rect width="14" height="8" className="fill-flag-my-blue" />
      <circle cx="5.6" cy="4" r="2.6" className="fill-flag-my-yellow" />
      <circle cx="6.5" cy="4" r="2.1" className="fill-flag-my-blue" />
      <polygon points={starPoints(8.4, 4, 2.3, 1)} className="fill-flag-my-yellow" />
    </svg>
  )
}
