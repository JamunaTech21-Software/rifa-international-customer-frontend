import {
  BadgeCheck,
  FileBadge,
  Eye,
  Handshake,
  Headset,
  Scale,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import Card from '@/components/ui/Card'
import CheckList from '@/components/ui/CheckList'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import IconCircle from '@/components/ui/IconCircle'
import MalaysiaFlag from '@/components/ui/MalaysiaFlag'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import BrandBanner from '@/components/sections/BrandBanner'
import PageHero from '@/components/sections/PageHero'
import { image } from '@/data/images'

const VALUES = ['Integrity', 'Transparency', 'People First', 'Professionalism', 'Social Responsibility']

// Left half of the "Why Choose" grid, then the right half.
const WHY_CHOOSE = [
  [
    { icon: BadgeCheck, title: 'Government approved (RL-693)' },
    { icon: Handshake, title: 'Direct employer collaboration' },
    { icon: Scale, title: 'Transparent and ethical process' },
  ],
  [
    { icon: Users, title: 'Experienced and professional team' },
    { icon: Headset, title: 'End-to-end support' },
    { icon: ShieldCheck, title: 'Dedicated support for workers' },
  ],
]

const REGISTRATIONS = [
  { key: 'bmet', logo: 'about.bmet-logo', title: 'BMET', lines: ['Approved', 'Recruiting Agency'] },
  { key: 'licence', icon: FileBadge, title: 'RL-693', lines: ['Recruiting Licence', 'No. RL-693'] },
  { key: 'baira', logo: 'about.baira-logo', title: 'BAIRA', lines: ['Member'] },
  { key: 'malaysia', flag: true, title: 'Malaysia', lines: ['Authorized', 'Recruitment Partner'] },
]

// Title with a short blue bar under it, used inside the three tinted cards.
function CardTitle({ children }) {
  return (
    <>
      <h3 className="text-lg font-bold text-ink sm:text-xl">{children}</h3>
      <span aria-hidden="true" className="mt-2 mb-2.5 block h-0.5 w-9 rounded-full bg-primary-600" />
    </>
  )
}

function RegistrationLogo({ item }) {
  if (item.icon) {
    const Icon = item.icon
    return <Icon size={40} strokeWidth={1.75} className="shrink-0 text-primary-600" aria-hidden="true" />
  }
  if (item.flag) {
    return (
      <MalaysiaFlag
        flat
        className="h-7 w-12 shrink-0 rounded-[3px] shadow-sm sm:h-8 sm:w-14 lg:h-6 lg:w-10"
      />
    )
  }
  return (
    <CloudinaryImage
      publicId={image(item.logo)}
      alt=""
      sizes="64px"
      width={128}
      className="size-12 shrink-0 rounded-full object-contain"
    />
  )
}

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Rifa International (RL-693) is a government approved recruiting agency in Dhaka connecting Bangladeshi workers with genuine job opportunities in Malaysia."
        path="/about"
      />

      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        title={[['About ', { text: 'Us', highlight: true }]]}
        titleSize="xl"
        subtitle="Connecting People to Global Opportunities"
        text={
          <>
            <strong className="font-semibold text-ink">Rifa International</strong> (RL-693) is a government
            approved recruiting agency dedicated to creating better opportunities for Bangladeshi workers in
            Malaysia and other countries through ethical, transparent and reliable recruitment services.
          </>
        }
        imageKey="hero.about"
        imageAlt="Rifa International office reception"
      />

      <Section spacing="none" className="pt-5 pb-5 lg:pb-3">
        <div className="grid gap-8 lg:grid-cols-[0.93fr_1fr] lg:gap-12">
          <div>
            <SectionHeading title="Company Overview" size="sm" underline />
            <div className="mt-5 space-y-3.5 text-base leading-[1.4] text-body">
              <p>
                <strong className="font-semibold text-ink">Rifa International</strong> (RL-693) is a licensed
                and reputable recruiting agency based in Dhaka, Bangladesh, working to connect skilled,
                semi-skilled and unskilled workers with genuine employment opportunities abroad, with a strong
                focus on Malaysia.
              </p>
              <p>
                We work in close collaboration with employers, government authorities and our overseas
                partners to ensure a safe, legal and smooth recruitment process. Our goal is to build a better
                future for Bangladeshi workers and contribute to the socio-economic development of the
                country.
              </p>
            </div>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-3">
            <Card tint="blue" shadow={false} className="p-4 sm:p-4.5">
              <Target size={32} strokeWidth={2.2} className="mb-2 text-primary-600" aria-hidden="true" />
              <CardTitle>Our Mission</CardTitle>
              <p className="text-[0.9375rem] leading-snug text-body">
                To create safe, legal and sustainable employment opportunities for Bangladeshi workers around
                the world.
              </p>
            </Card>
            <Card tint="green" shadow={false} className="p-4 sm:p-4.5">
              <Eye size={32} strokeWidth={2.2} className="mb-2 text-tone-green" aria-hidden="true" />
              <CardTitle>Our Vision</CardTitle>
              <p className="text-[0.9375rem] leading-snug text-body">
                To be a trusted global recruitment partner known for integrity, professionalism and care for
                our people.
              </p>
            </Card>
            <Card tint="orange" shadow={false} className="p-4 sm:p-4.5">
              <Users size={32} strokeWidth={2.2} className="mb-2 text-tone-orange" aria-hidden="true" />
              <CardTitle>Our Values</CardTitle>
              <CheckList items={VALUES} size="sm" className="gap-y-1.5" />
            </Card>
          </div>
        </div>
      </Section>

      <Section spacing="none" className="pb-7 lg:pb-8">
        <div className="grid gap-8 lg:grid-cols-[1.32fr_1fr] lg:gap-0">
          <div className="lg:pr-6">
            <SectionHeading title="Government Registration & Membership" size="sm" underline />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.78fr_1.12fr]">
              {REGISTRATIONS.map((item) => (
                <li key={item.key}>
                  <Card
                    padding="none"
                    shadow={false}
                    className="flex h-full items-center gap-2.5 p-2.5 sm:p-3"
                  >
                    <RegistrationLogo item={item} />
                    <div className="min-w-0 text-[0.8125rem] leading-snug text-body sm:text-sm lg:text-[0.8125rem]">
                      <p className="font-bold text-ink">{item.title}</p>
                      {item.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-line lg:pl-6">
            <SectionHeading title="Why Choose Rifa International?" size="sm" />
            <div className="mt-5 grid gap-y-3.5 sm:grid-cols-[auto_1fr]">
              {WHY_CHOOSE.map((column, index) => (
                <ul
                  key={index}
                  className={cn(
                    'space-y-2.5',
                    index === 0 ? 'sm:pr-5' : 'sm:border-l sm:border-line sm:pl-5',
                  )}
                >
                  {column.map((item) => (
                    <li key={item.title} className="flex items-center gap-3 text-sm text-ink">
                      <IconCircle
                        icon={item.icon}
                        size="sm"
                        className="size-9 border-2 border-primary-200 bg-white"
                      />
                      {item.title}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <BrandBanner
        imageKey="about.banner"
        imageAlt="Workers in front of the Kuala Lumpur skyline"
        script={'A Brighter\nFuture in\nMalaysia'}
        sideLines={['Your', 'Global Career', 'Partner']}
      />
    </>
  )
}
