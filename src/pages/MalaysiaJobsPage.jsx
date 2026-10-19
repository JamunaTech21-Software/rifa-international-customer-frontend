import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { FileBadge, Search, SearchX, ShieldCheck, Users } from 'lucide-react'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import CheckList from '@/components/ui/CheckList'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Select from '@/components/form/Select'
import Seo from '@/components/ui/Seo'
import CategoryCard from '@/components/sections/CategoryCard'
import CtaBanner from '@/components/sections/CtaBanner'
import JobCard from '@/components/sections/JobCard'
import PageHero from '@/components/sections/PageHero'
import ProcessSteps from '@/components/sections/ProcessSteps'
import TrustStrip from '@/components/sections/TrustStrip'
import { categories, getCategory } from '@/data/categories'
import { image } from '@/data/images'
import { jobs, locations } from '@/data/jobs'
import { steps5 } from '@/data/process'
import { fieldBase } from '@/lib/formStyles'

const HERO_TRUST = [
  { icon: ShieldCheck, title: 'Government', text: 'Approved (RL-693)', tone: 'navy' },
  { icon: Users, title: 'Trusted', text: 'Employers' },
  { icon: FileBadge, title: 'Safe & Legal', text: 'Recruitment' },
]

const WHY_WORK = [
  'Attractive Salary',
  'Overtime Opportunities',
  'Free Accommodation (in many jobs)',
  'Career Growth',
  'Friendly Environment',
  'Multicultural Workplace',
]

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  ...categories.map((category) => ({ value: category.slug, label: category.name })),
]
const LOCATION_OPTIONS = [{ value: '', label: 'All Locations' }, ...locations]

const filterSelectClass = 'h-10 pr-8 pl-3 text-sm has-[option[value=""]:checked]:text-ink'

// Returns the jobs matching the search text (title, employer type or category name), category and location.
function filterJobs({ q, category, location }) {
  const needle = q.trim().toLowerCase()
  return jobs.filter((job) => {
    if (category && job.category !== category) return false
    if (location && job.location !== location) return false
    if (!needle) return true
    const categoryName = getCategory(job.category)?.name ?? ''
    return [job.title, job.employerType, categoryName].some((text) => text.toLowerCase().includes(needle))
  })
}

export default function MalaysiaJobsPage() {
  const [params, setParams] = useSearchParams()
  const listRef = useRef(null)

  // The URL is the single source of truth, so filters survive a refresh and the browser's back button.
  // Unknown category/location values (e.g. from an old link) are ignored.
  const q = params.get('q') ?? ''
  const category = getCategory(params.get('category') ?? '') ? params.get('category') : ''
  const location = locations.includes(params.get('location')) ? params.get('location') : ''
  const results = useMemo(() => filterJobs({ q, category, location }), [q, category, location])
  const hasFilters = Boolean(q || category || location)

  const updateFilters = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    setParams(next)
  }

  const scrollToList = () => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSearch = (event) => {
    event.preventDefault()
    updateFilters({ q: new FormData(event.currentTarget).get('q').trim() })
  }

  const clearFilters = () => {
    setParams(new URLSearchParams())
    scrollToList()
  }

  const selectCategory = (event, slug) => {
    event.preventDefault()
    updateFilters({ category: slug })
    scrollToList()
  }

  return (
    <>
      <Seo
        title="Malaysia Jobs"
        description="Browse job opportunities in Malaysia for skilled, semi-skilled and unskilled workers through Rifa International (RL-693)."
        path="/malaysia-jobs"
      />

      <PageHero
        size="lg"
        titleSize="md"
        showFlag
        eyebrow="Malaysia Jobs"
        title={[
          ['Work in ', { text: 'Malaysia', highlight: true }],
          ['Build a ', { text: 'Brighter Future', highlight: true }],
        ]}
        text={
          <>
            <strong className="font-semibold text-ink">Rifa International</strong> (RL-693) offers genuine job
            opportunities in Malaysia for skilled, semi-skilled and unskilled workers through trusted
            employers and legal process.
          </>
        }
        imageKey="hero.malaysia-jobs"
        imageAlt="Workers from construction, manufacturing, hospitality and catering in front of the Kuala Lumpur skyline"
        script={'Same\nPeople\nBigger\nOpportunities'}
      >
        <TrustStrip variant="inline" items={HERO_TRUST} />
      </PageHero>

      <Section
        spacing="none"
        className="pt-6 pb-10 lg:pb-12"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.375rem]"
      >
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.44fr)] xl:gap-7">
          {/* ---------- Main column ---------- */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionHeading title="Job Categories in Malaysia" highlight="Malaysia" size="md" />
              <Button
                variant="outline"
                shape="pill"
                iconRight
                onClick={clearFilters}
                className="h-[2.5625rem] border border-primary-200 px-5 text-[0.9375rem] hover:border-primary-400"
              >
                View All Jobs
              </Button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  shape="tall"
                  count={category.jobsCount}
                  onClick={(event) => selectCategory(event, category.slug)}
                />
              ))}
            </div>

            <div ref={listRef} id="jobs-list" className="mt-8 scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
                <SectionHeading title="Latest Job Opportunities" highlight="Job Opportunities" size="sm" />

                <form
                  role="search"
                  aria-label="Search jobs"
                  onSubmit={handleSearch}
                  className="flex w-full min-w-0 flex-wrap items-center gap-2.5 sm:min-w-[32rem] sm:flex-1 sm:flex-nowrap"
                >
                  <div className="relative min-w-0 basis-full sm:flex-[1.5_1_13rem] sm:basis-auto">
                    <Search
                      size={16}
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
                      aria-hidden="true"
                    />
                    <input
                      // Remount when the URL's q changes (e.g. "Clear filters") so the typed text resets too.
                      key={q}
                      type="search"
                      name="q"
                      defaultValue={q}
                      aria-label="Search job title or category"
                      placeholder="Search Job Title or Category…"
                      className={cn(fieldBase, 'h-10 pr-2 pl-9 text-[0.8125rem]')}
                    />
                  </div>
                  <Select
                    aria-label="Filter by category"
                    value={category}
                    onChange={(event) => updateFilters({ category: event.target.value })}
                    options={CATEGORY_OPTIONS}
                    className={filterSelectClass}
                    wrapperClassName="min-w-0 flex-[1_1_8rem] sm:flex-[1_1_8.5rem]"
                  />
                  <Select
                    aria-label="Filter by location"
                    value={location}
                    onChange={(event) => updateFilters({ location: event.target.value })}
                    options={LOCATION_OPTIONS}
                    className={filterSelectClass}
                    wrapperClassName="min-w-0 flex-[1_1_8rem] sm:flex-[1_1_8.5rem]"
                  />
                  <Button type="submit" className="h-10 shrink-0 px-6 text-sm max-sm:w-full">
                    Search
                  </Button>
                </form>
              </div>

              <p className="sr-only" role="status" aria-live="polite">
                {results.length} {results.length === 1 ? 'job' : 'jobs'} found
              </p>

              {results.length > 0 ? (
                <ul className="mt-5 grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                  {results.map((job) => (
                    <li key={job.id} className="min-w-0">
                      <JobCard job={job} className="h-full" />
                    </li>
                  ))}
                </ul>
              ) : (
                <Card
                  tint="surface"
                  shadow={false}
                  className="mt-5 flex flex-col items-center py-10 text-center"
                >
                  <SearchX size={36} className="text-primary-600" aria-hidden="true" />
                  <p className="mt-3 text-lg font-semibold text-ink">No jobs match your search.</p>
                  <p className="mt-1 text-body">Try a different keyword, category or location.</p>
                  {hasFilters && (
                    <Button variant="outline" onClick={clearFilters} className="mt-5">
                      Clear filters
                    </Button>
                  )}
                </Card>
              )}
            </div>
          </div>

          {/* ---------- Sidebar ---------- */}
          <aside className="min-w-0 space-y-5" aria-label="Working in Malaysia">
            <Card
              tint="blue"
              shadow={false}
              padding="none"
              className="relative overflow-hidden bg-linear-to-br from-primary-50 via-primary-50 to-primary-100 p-5 sm:p-6"
            >
              <CloudinaryImage
                publicId={image('malaysia.skyline')}
                alt=""
                sizes="220px"
                className="absolute inset-y-0 right-0 w-[45%] [mask-image:linear-gradient(to_right,transparent,black_55%)]"
              />
              <div className="relative z-10">
                <SectionHeading title="Why Work in Malaysia?" size="sm" className="mb-3" />
                <CheckList
                  items={WHY_WORK}
                  size="sm"
                  className="gap-y-1.5"
                  itemClassName="text-[0.9375rem]"
                />
              </div>
            </Card>

            <Card padding="sm" shadow={false} className="sm:p-5">
              <SectionHeading title="Our Recruitment Process" size="sm" className="mb-4" />
              <ProcessSteps steps={steps5} size="sm" />
            </Card>

            <CtaBanner
              variant="primary"
              stacked
              icon={Users}
              title="Ready to Start Your Journey?"
              text="Apply now and take the first step towards a better future in Malaysia."
              button={{ label: 'Apply Now', to: '/apply' }}
            />
          </aside>
        </div>
      </Section>
    </>
  )
}
