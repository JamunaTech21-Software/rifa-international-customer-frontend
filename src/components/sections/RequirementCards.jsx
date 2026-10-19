import { cn } from '@/lib/cn'
import Card from '@/components/ui/Card'
import IconCircle from '@/components/ui/IconCircle'
import { basicRequirements } from '@/data/jobSeekerInfo'

/** The four "Basic Requirements" cards (Apply and For Job Seekers pages). */
export default function RequirementCards({ className }) {
  return (
    <ul className={cn('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>
      {basicRequirements.map((item) => (
        <li key={item.title} className="min-w-0">
          <Card padding="sm" shadow={false} className="flex h-full flex-col items-center py-3 text-center">
            <IconCircle icon={item.icon} size="sm" className="bg-transparent text-primary-600" />
            <p className="mt-1.5 text-sm leading-snug font-semibold text-ink">{item.title}</p>
            {item.note && <p className="text-[0.8125rem] leading-snug text-body">{item.note}</p>}
          </Card>
        </li>
      ))}
    </ul>
  )
}
