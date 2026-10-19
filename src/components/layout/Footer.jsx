import { Link } from 'react-router'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import Logo from '@/components/ui/Logo'
import SocialIcon from '@/components/ui/SocialIcon'
import { categories } from '@/data/categories'
import { footerLinks, site } from '@/data/site'

const linkClass = 'rounded-sm text-white/70 transition-colors hover:text-white'

function FooterHeading({ children }) {
  return (
    <h2 className="mb-5 text-lg font-bold text-white after:mt-2.5 after:block after:h-0.5 after:w-9 after:rounded-full after:bg-primary-500">
      {children}
    </h2>
  )
}

function ContactItem({ icon: Icon, href, external = false, children }) {
  const content = (
    <>
      <Icon size={18} className="mt-0.5 shrink-0 text-primary-300" aria-hidden="true" />
      <span>{children}</span>
    </>
  )
  const className = 'flex items-start gap-3'
  return (
    <li>
      {href ? (
        <a
          href={href}
          className={`${className} ${linkClass}`}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          {content}
        </a>
      ) : (
        <div className={`${className} text-white/70`}>{content}</div>
      )}
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-white/70">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
        <div>
          <Link to="/" className="inline-block rounded-sm" aria-label="Rifa International – Home">
            <Logo variant="white" className="h-14 sm:h-16" />
          </Link>
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed">{site.description}</p>
          <ul className="mt-6 flex items-center gap-3">
            {site.socialLinks.map((social) => (
              <li key={social.network}>
                <a
                  href={social.href}
                  aria-label={`Rifa International on ${social.label}`}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary-600"
                >
                  <SocialIcon network={social.network} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="space-y-3 text-[0.9375rem]">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Job categories">
          <FooterHeading>Job Categories</FooterHeading>
          <ul className="space-y-3 text-[0.9375rem]">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={`/malaysia-jobs?category=${category.slug}`} className={linkClass}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className="space-y-4 text-[0.9375rem]">
            <ContactItem icon={MapPin} href={site.mapLink} external>
              {site.address}
            </ContactItem>
            <ContactItem icon={Phone} href={site.phoneHref}>
              {site.phone}
            </ContactItem>
            <ContactItem icon={MessageCircle} href={site.whatsappHref} external>
              {site.whatsapp} (WhatsApp)
            </ContactItem>
            <ContactItem icon={Mail} href={site.emailHref}>
              {site.email}
            </ContactItem>
            <ContactItem icon={Clock}>
              {site.hours}
              <br />
              <span className="text-white/50">{site.hoursNote}</span>
            </ContactItem>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.accreditations}</p>
        </Container>
      </div>
    </footer>
  )
}
