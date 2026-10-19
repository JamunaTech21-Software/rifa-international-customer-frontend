import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import Badge from '@/components/ui/Badge'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import { image } from '@/data/images'

/**
 * Photo card for a job category; the whole card links to /malaysia-jobs?category=<slug>.
 *
 * category — item from data/categories.js.
 * count    — optional pill bottom-left ("120+ Jobs"). When shown, the arrow button is hidden
 *            (Malaysia Jobs design); without it the arrow shows bottom-right (Home design).
 * shape    — "wide" (Home, landscape) or "tall" (Malaysia Jobs, portrait).
 */
export default function CategoryCard({ category, count, shape = 'wide', arrow = !count, className }) {
  const Icon = category.icon

  return (
    <Link
      to={`/malaysia-jobs?category=${category.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-card bg-navy-900 shadow-card',
        shape === 'tall' ? 'aspect-[0.92]' : 'aspect-[1.28]',
        className,
      )}
      aria-label={count ? `${category.name} – ${count} jobs` : category.name}
    >
      <CloudinaryImage
        publicId={image(category.imageKey)}
        alt=""
        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 46vw"
        className="absolute inset-0 size-full object-[center_15%] transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-900/70 via-35% to-transparent to-65%"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-4">
        <div className="min-w-0">
          <Icon size={shape === 'tall' ? 30 : 32} className="mb-1.5 text-white" aria-hidden="true" />
          <p className="text-base leading-tight font-semibold text-white sm:text-[1.0625rem]">
            {category.name}
          </p>
          {count && (
            <Badge variant="solid" size="sm" className="mt-3">
              {count} Jobs
            </Badge>
          )}
        </div>
        {arrow && (
          <span
            aria-hidden="true"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white text-white transition-colors group-hover:bg-white group-hover:text-navy-900"
          >
            <ArrowRight size={17} />
          </span>
        )}
      </div>
    </Link>
  )
}
