import { Clock, Headset, Mail, MessageCircle, Phone } from 'lucide-react'
import { cn } from '@/lib/cn'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import IconCircle from '@/components/ui/IconCircle'
import { image } from '@/data/images'
import { site } from '@/data/site'

/**
 * "Need Help?" contact card. Phone, WhatsApp and email come from data/site.js.
 *
 * tint     — "blue" (Recruitment Process, circle icons) or "green" (Apply page, plain icons).
 * hours    — show the office hours line.
 * imageKey — optional person photo on the right, bottom-aligned.
 */
export default function HelpBox({
  title = 'Need Help?',
  text = 'Our recruitment team is always ready to assist you throughout the process.',
  tint = 'blue',
  hours = false,
  imageKey,
  className,
}) {
  const green = tint === 'green'

  const rows = [
    { icon: Phone, href: site.phoneHref, label: site.phone, tone: 'blue' },
    { icon: MessageCircle, href: site.whatsappHref, label: site.whatsapp, tone: 'green', external: true },
    { icon: Mail, href: site.emailHref, label: site.email, tone: 'blue' },
  ]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-card p-5 sm:p-6',
        green ? 'bg-tone-green-50' : 'bg-tone-blue-50',
        className,
      )}
    >
      <div className={cn('relative z-10', imageKey && 'sm:max-w-[68%]')}>
        <h2 className="flex items-center gap-2.5 text-xl font-bold text-ink">
          <Headset size={30} className={green ? 'text-tone-green' : 'text-primary-600'} aria-hidden="true" />
          {title}
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-snug text-body">{text}</p>

        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li key={row.label}>
              <a
                href={row.href}
                className="inline-flex items-center gap-3 rounded-sm text-[1.0625rem] font-medium text-ink hover:text-primary-600"
                {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {green ? (
                  <row.icon size={22} className="text-tone-green" aria-hidden="true" />
                ) : (
                  <IconCircle icon={row.icon} size="xs" tone={row.tone} variant="solid" />
                )}
                {row.label}
              </a>
            </li>
          ))}
          {hours && (
            <li className="flex items-center gap-3 text-[0.9375rem] text-body">
              <Clock size={22} className="text-tone-green" aria-hidden="true" />
              {site.hoursDays}: {site.hoursTime}
            </li>
          )}
        </ul>
      </div>

      {imageKey && (
        <CloudinaryImage
          publicId={image(imageKey)}
          alt=""
          sizes="160px"
          className="hidden object-top sm:absolute sm:right-0 sm:bottom-0 sm:block sm:h-[85%] sm:w-[34%] sm:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
        />
      )}
    </section>
  )
}
