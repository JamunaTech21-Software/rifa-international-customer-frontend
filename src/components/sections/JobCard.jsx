import { Banknote, MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import { image } from '@/data/images'
import { formatRm } from '@/lib/format'

/**
 * Job listing row: photo, title, "employer | Malaysia", location, salary badge and an Apply button
 * that opens /apply with the job's category preselected. job — item from data/jobs.js.
 */
export default function JobCard({ job, className }) {
  return (
    <article
      className={cn(
        'flex items-stretch gap-3.5 rounded-card border border-line bg-white p-3 shadow-card sm:gap-4',
        className,
      )}
    >
      <CloudinaryImage
        publicId={image(job.imageKey)}
        alt=""
        sizes="96px"
        width={192}
        className="size-20 shrink-0 self-center rounded-lg sm:h-24 sm:w-[4.5rem]"
      />

      <div className="flex min-w-0 flex-1 flex-wrap items-end justify-between gap-x-3 gap-y-2 sm:flex-nowrap">
        <div className="min-w-0">
          <h3 className="text-base leading-snug font-bold text-ink sm:text-[1.0625rem]">{job.title}</h3>
          <p className="text-[0.9375rem] text-body">{job.employerType} | Malaysia</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-body">
            <MapPin size={15} className="shrink-0 text-primary-600" aria-hidden="true" />
            {job.location}
          </p>
          <Badge tone="success" icon={Banknote} size="sm" className="mt-2">
            {formatRm(job.salaryMin, job.salaryMax)}
          </Badge>
        </div>
        <Button
          to={`/apply?category=${job.category}`}
          size="sm"
          className="ml-auto sm:shrink-0"
          aria-label={`Apply now for ${job.title}`}
        >
          Apply Now
        </Button>
      </div>
    </article>
  )
}
