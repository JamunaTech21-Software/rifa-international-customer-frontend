import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import {
  ArrowRight,
  Clock,
  Ellipsis,
  FileCheck,
  Handshake,
  Headset,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import IconCircle from '@/components/ui/IconCircle'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import SocialIcon from '@/components/ui/SocialIcon'
import PageHero from '@/components/sections/PageHero'
import { image } from '@/data/images'
import { fallbackLookups } from '@/data/lookups'
import { site } from '@/data/site'
import ContactForm from '@/features/contact/ContactForm'

const SOCIAL_COLORS = {
  facebook: 'bg-brand-facebook',
  linkedin: 'bg-brand-linkedin',
  youtube: 'bg-brand-youtube',
}

const INQUIRIES = [
  {
    icon: MessageCircle,
    title: 'General Inquiry',
    text: 'Have questions? We’re here to help.',
    subject: 'general_inquiry',
  },
  { icon: FileCheck, title: 'Job Application', text: 'Submit your application or inquiry.', to: '/apply' },
  {
    icon: Handshake,
    title: 'Employer Partnership',
    text: 'Looking to hire? Contact our team.',
    subject: 'employer_partnership',
  },
  { icon: Headset, title: 'Support', text: 'Get assistance from our recruitment team.', subject: 'support' },
]

const KNOWN_SUBJECTS = fallbackLookups.contactSubjects.map((subject) => subject.value)

function InfoRow({ icon, title, className, children }) {
  return (
    <li
      className={cn('flex gap-3.5 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0', className)}
    >
      <IconCircle icon={icon} size="sm" variant="solid" />
      <div className="min-w-0 text-sm leading-snug text-ink">
        <h3 className="mb-0.5 text-sm font-bold text-primary-800">{title}</h3>
        {children}
      </div>
    </li>
  )
}

export default function ContactPage() {
  const [params] = useSearchParams()
  const [presetSubject, setPresetSubject] = useState(null)
  const clicks = useRef(0)

  // ?subject=employer_partnership preselects the subject; unknown values are ignored.
  const subjectParam = params.get('subject') ?? ''
  const defaultSubject = KNOWN_SUBJECTS.includes(subjectParam) ? subjectParam : ''

  // The inquiry cards set the subject, then scroll to the form and focus the subject field.
  const chooseSubject = (value) => {
    clicks.current += 1
    setPresetSubject({ value, nonce: clicks.current })
    const form = document.getElementById('contact-form')
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => form?.querySelector('select')?.focus({ preventScroll: true }), 450)
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Rifa International (RL-693) in Banani, Dhaka. Call, WhatsApp, email or send us a message about jobs in Malaysia."
        path="/contact"
      />

      <PageHero
        size="sm"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
        title={[['Contact ', { text: 'Us', highlight: true }]]}
        titleSize="lg"
        subtitle="We’re Here to Help"
        subtitleSize="md"
        text="If you have any questions, need more information, or want to apply for job opportunities in Malaysia, feel free to contact us. Our team is always ready to assist you."
        imageKey="hero.contact"
        imageAlt="Smiling worker in a hard hat with colleagues in front of the Kuala Lumpur skyline"
        script={'Your\nGlobal Career\nStarts Here'}
      />

      <Section
        spacing="none"
        className="pt-4 pb-8 lg:pb-10"
        containerClassName="2xl:max-w-[96rem] 2xl:px-[2.25rem]"
      >
        <div className="grid items-start gap-5 lg:grid-cols-2 xl:grid-cols-[0.78fr_1.1fr_1.08fr]">
          {/* ---------- Contact information ---------- */}
          <Card
            tint="surface"
            shadow={false}
            padding="md"
            className="min-w-0 p-5 lg:col-span-2 xl:col-span-1"
          >
            <SectionHeading title="Our Contact Information" size="sm" className="mb-4" />
            <ul>
              <InfoRow icon={MapPin} title="Office Address">
                <address className="not-italic">{site.address}</address>
              </InfoRow>
              <InfoRow icon={Phone} title="Phone (Call / WhatsApp)">
                <a href={site.phoneHref} className="block hover:text-primary-600">
                  {site.phone}
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-primary-600"
                >
                  {site.whatsapp}
                </a>
              </InfoRow>
              <InfoRow icon={Mail} title="Email">
                <a href={site.emailHref} className="hover:text-primary-600">
                  {site.email}
                </a>
              </InfoRow>
              <InfoRow icon={Clock} title="Office Hours">
                <p>{site.hoursDays}</p>
                <p>{site.hoursTime}</p>
                <p>({site.hoursNote})</p>
              </InfoRow>
              <InfoRow icon={Ellipsis} title="Follow Us">
                <ul className="mt-2 flex items-center gap-3">
                  {site.socialLinks.map((social) => (
                    <li key={social.network}>
                      <a
                        href={social.href}
                        aria-label={`Rifa International on ${social.label}`}
                        className={cn(
                          'inline-flex h-8 items-center justify-center rounded-md text-white transition-opacity hover:opacity-85',
                          social.network === 'youtube' ? 'w-10' : 'w-8',
                          SOCIAL_COLORS[social.network],
                        )}
                      >
                        <SocialIcon network={social.network} size={20} />
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoRow>
            </ul>
          </Card>

          {/* ---------- Message form ---------- */}
          <Card padding="md" shadow={false} className="min-w-0 p-5">
            <SectionHeading
              title="Send Us a Message"
              size="sm"
              subtitle="Fill out the form below and our team will get back to you as soon as possible."
              className="mb-4 [&>p]:mt-1 [&>p]:text-sm [&>p]:sm:text-[0.9375rem]"
            />
            <ContactForm defaultSubject={defaultSubject} presetSubject={presetSubject} />
          </Card>

          {/* ---------- Location ---------- */}
          <Card padding="md" shadow={false} className="min-w-0 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <SectionHeading title="Our Location" size="sm" />
              <Button
                href={site.mapLink}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="sm"
                iconRight
                className="h-[2.25rem] border border-primary-300 px-4"
              >
                View on Google Maps
              </Button>
            </div>
            <iframe
              title="Rifa International office location"
              src={site.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="aspect-[2.3] w-full rounded-lg border border-line bg-surface-2"
            />

            <h3 className="mt-4 mb-2.5 text-base font-bold text-primary-800">Office Building View</h3>
            <div className="grid grid-cols-[1.35fr_1fr] grid-rows-2 gap-3">
              <CloudinaryImage
                publicId={image('contact.building')}
                alt="Office building entrance, 62 Road 15"
                sizes="(min-width: 1280px) 20vw, 50vw"
                className="row-span-2 size-full min-h-40 rounded-lg"
              />
              <CloudinaryImage
                publicId={image('contact.reception')}
                alt="Rifa International reception"
                sizes="(min-width: 1280px) 15vw, 40vw"
                className="size-full min-h-20 rounded-lg"
              />
              <CloudinaryImage
                publicId={image('contact.meeting-room')}
                alt="Meeting room"
                sizes="(min-width: 1280px) 15vw, 40vw"
                className="size-full min-h-20 rounded-lg"
              />
            </div>
          </Card>
        </div>

        {/* ---------- Inquiry cards ---------- */}
        <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {INQUIRIES.map((item) => {
            const content = (
              <>
                <IconCircle icon={item.icon} size="sm" tone="blue" className="size-12 bg-primary-100" />
                <span className="min-w-0 text-left">
                  <span className="block text-base font-bold text-ink">{item.title}</span>
                  <span className="block text-sm leading-snug text-body">{item.text}</span>
                </span>
                <ArrowRight
                  size={18}
                  className="ml-auto shrink-0 text-primary-600 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </>
            )
            const className =
              'group flex w-full items-center gap-3.5 rounded-card bg-surface p-3.5 transition-colors hover:bg-primary-50'
            return (
              <li key={item.title}>
                {item.to ? (
                  <Link to={item.to} className={className}>
                    {content}
                  </Link>
                ) : (
                  <button type="button" onClick={() => chooseSubject(item.subject)} className={className}>
                    {content}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </Section>
    </>
  )
}
