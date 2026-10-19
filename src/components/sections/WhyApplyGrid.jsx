import { cn } from '@/lib/cn'
import FeatureCard from '@/components/sections/FeatureCard'
import { whyApply } from '@/data/jobSeekerInfo'

/** The six "Why Apply with Rifa International?" benefit cards (Apply and For Job Seekers pages). */
export default function WhyApplyGrid({ className }) {
  return (
    <ul className={cn('grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {whyApply.map((item) => (
        <li key={item.title} className="min-w-0">
          <FeatureCard {...item} shape="square" iconSize="sm" compact tint="surface" />
        </li>
      ))}
    </ul>
  )
}
