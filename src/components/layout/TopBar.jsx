import { Link } from 'react-router'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import SocialIcon from '@/components/ui/SocialIcon'
import { site } from '@/data/site'

const linkClass = 'inline-flex items-center gap-2.5 rounded-sm text-white hover:text-primary-200'

export default function TopBar() {
  return (
    <div className="bg-linear-to-r from-topbar-from to-topbar-to text-sm text-white">
      <Container className="flex h-11 items-center justify-end gap-6 md:justify-between">
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <a href={site.phoneHref} className={linkClass}>
              <Phone size={16} aria-hidden="true" />
              {site.phone}
            </a>
          </li>
          <li>
            <a href={site.emailHref} className={linkClass}>
              <Mail size={16} aria-hidden="true" />
              {site.email}
            </a>
          </li>
          <li className="hidden lg:block">
            <a href={site.mapLink} target="_blank" rel="noreferrer" className={linkClass}>
              <MapPin size={16} aria-hidden="true" />
              {site.addressShort}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-5 md:flex">
            <span>Follow Us:</span>
            <ul className="flex items-center gap-5">
              {site.socialLinks.map((social) => (
                <li key={social.network}>
                  <a
                    href={social.href}
                    aria-label={`Rifa International on ${social.label}`}
                    className="inline-flex rounded-sm text-white hover:text-primary-200"
                  >
                    <SocialIcon network={social.network} size={social.network === 'youtube' ? 20 : 18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/apply"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary-600 px-4.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-primary-500"
          >
            Apply Now
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </div>
  )
}
