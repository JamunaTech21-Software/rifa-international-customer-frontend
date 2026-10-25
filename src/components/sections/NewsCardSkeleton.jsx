import Card from '@/components/ui/Card'

/** Grey placeholder with the same footprint as a News card, shown while the articles load. */
export default function NewsCardSkeleton() {
  return (
    <Card padding="none" className="flex h-full flex-col overflow-hidden" aria-hidden="true">
      <div className="aspect-[1.8] w-full animate-pulse bg-surface-2" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-1/3 animate-pulse rounded bg-surface-2" />
        <div className="h-6 w-4/5 animate-pulse rounded bg-surface-2" />
        <div className="h-4 w-full animate-pulse rounded bg-surface-2" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
      </div>
    </Card>
  )
}
