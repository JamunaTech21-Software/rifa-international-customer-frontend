import { cn } from '@/lib/cn'

/** Grey placeholder with the same footprint as JobCard, shown while the listings load. */
export default function JobCardSkeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex items-center gap-3 rounded-card border border-line bg-white p-3 shadow-card',
        className,
      )}
    >
      <div className="h-20 w-[4.25rem] shrink-0 animate-pulse rounded-lg bg-surface-2" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3.5 w-1/2 animate-pulse rounded bg-surface-2" />
        <div className="h-3.5 w-1/3 animate-pulse rounded bg-surface-2" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-24 animate-pulse rounded-full bg-surface-2" />
          <div className="h-7 w-20 animate-pulse rounded-btn bg-surface-2" />
        </div>
      </div>
    </div>
  )
}
