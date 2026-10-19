import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { ChevronRight, Mail, Phone, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import SocialIcon from '@/components/ui/SocialIcon'
import { nav, site } from '@/data/site'

/**
 * Slide-in menu for screens below xl. Built on a modal <dialog>: the browser traps focus inside,
 * makes the page behind inert and closes it on Esc. Clicking a link or the backdrop also closes it.
 */
export default function MobileNav({ open, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.documentElement.classList.add('overflow-hidden')
    } else if (!open && dialog.open) {
      dialog.close()
    }
    if (!open) document.documentElement.classList.remove('overflow-hidden')
  }, [open])

  // Close only when the click lands on the backdrop (the dialog element itself), not on the panel.
  const handleClick = (event) => {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      id="mobile-nav"
      aria-label="Menu"
      onClose={onClose}
      onClick={handleClick}
      className={cn(
        'fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none bg-white p-0 shadow-card-hover',
        'translate-x-0 transition-transform duration-300 ease-out starting:open:translate-x-full',
        'backdrop:bg-navy-950/50 backdrop:backdrop-blur-[2px]',
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <Logo className="h-10" />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-btn text-ink hover:bg-primary-50 hover:text-primary-600"
            aria-label="Close menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-btn px-3 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-ink hover:bg-surface hover:text-primary-600',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      <ChevronRight
                        size={18}
                        className={isActive ? 'text-primary-600' : 'text-muted'}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-line px-5 py-5">
          <Button to="/apply" iconRight fullWidth onClick={onClose}>
            Apply Now
          </Button>
          <div className="space-y-2 text-sm">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 rounded-sm text-ink hover:text-primary-600"
            >
              <Phone size={18} className="text-primary-600" aria-hidden="true" />
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="flex items-center gap-3 rounded-sm text-ink hover:text-primary-600"
            >
              <Mail size={18} className="text-primary-600" aria-hidden="true" />
              {site.email}
            </a>
          </div>
          <ul className="flex items-center gap-3">
            {site.socialLinks.map((social) => (
              <li key={social.network}>
                <a
                  href={social.href}
                  aria-label={`Rifa International on ${social.label}`}
                  className="inline-flex size-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white"
                >
                  <SocialIcon network={social.network} size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  )
}
