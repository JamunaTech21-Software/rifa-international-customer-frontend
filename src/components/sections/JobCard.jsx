import { Banknote, MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import { image } from '@/data/images'
import { hasImage } from '@/lib/cloudinary'
import { formatRm } from '@/lib/format'

// Photo order: the one uploaded in the admin panel, the local photo of the original jobs, then the category photo.
function jobImage(job) {
  const candidates = [job.imagePublicId, image(job.imageKey), image(`category.${job.category}`)]
  return candidates.find((candidate) => hasImage(candidate)) ?? ''
}

/**
 * Job listing row: photo, title, "employer | Malaysia", location, salary badge and an Apply button on the
 * same row. The Apply button opens /apply with the job's category preselected. job — a listing from useJobs() (same shape as data/jobs.js).
 *
 * The card sizes itself from its own width (container queries): narrow cards, such as three across on the
 * Malaysia Jobs page, use smaller text and a compact button; wider cards use the roomier sizes.
 */
export default function JobCard({ job, className }) {
  return (
    <article
      className={cn(
        '@container flex items-center gap-3 rounded-card border border-line bg-white p-3 shadow-card',
        className,
      )}
    >
      <CloudinaryImage
        publicId={jobImage(job)}
        alt=""
        sizes="96px"
        width={192}
        className="h-[5rem] w-[4.25rem] shrink-0 rounded-lg @md:h-24 @md:w-[4.75rem]"
      />

      <div className="min-w-0 flex-1">
        <h3 className="text-[0.9375rem] leading-snug font-bold text-ink @md:text-[1.0625rem]">{job.title}</h3>
        <p className="text-[0.8125rem] leading-snug text-body @md:text-[0.9375rem]">
          {job.employerType}&nbsp;| Malaysia
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs leading-snug text-body @md:mt-1 @md:text-sm">
          <MapPin size={14} className="shrink-0 text-primary-600" aria-hidden="true" />
          {job.location}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 @md:mt-2">
          <Badge
            tone="success"
            icon={Banknote}
            size="sm"
            className="px-2 text-[0.6875rem] @md:px-2.5 @md:text-xs"
          >
            {formatRm(job.salaryMin, job.salaryMax)}
          </Badge>
          <Button
            to={`/apply?category=${job.category}`}
            size="sm"
            className="h-7 px-2.5 text-xs @md:h-9 @md:px-4 @md:text-sm"
            aria-label={`Apply now for ${job.title}`}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </article>
  )
}
