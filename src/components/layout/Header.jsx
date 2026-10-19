import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/cn'
import Container from '@/components/ui/Container'
import Logo from '@/components/ui/Logo'
import MobileNav from '@/components/layout/MobileNav'
import { nav } from '@/data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 8)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white transition-shadow duration-200',
        scrolled ? 'shadow-header' : 'shadow-none',
      )}
    >
      <Container className="flex h-16 items-center gap-6 sm:h-18 xl:h-header">
        <Link to="/" className="shrink-0 rounded-sm" aria-label="Rifa International – Home">
          <Logo className="h-11 sm:h-13 xl:h-14.5" />
        </Link>

        <nav aria-label="Main" className="hidden h-full flex-1 justify-center xl:flex">
          <ul className="flex h-full items-center gap-5 2xl:gap-6.5">
            {nav.map((item) => (
              <li key={item.to} className="h-full">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative flex h-full items-center text-[0.9375rem] font-medium whitespace-nowrap transition-colors 2xl:text-base',
                      'after:absolute after:inset-x-0 after:bottom-[7px] after:h-0.5 after:rounded-full after:bg-primary-600 after:transition-opacity',
                      isActive
                        ? 'text-primary-600 after:opacity-100'
                        : 'text-ink after:opacity-0 hover:text-primary-600',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="ml-auto inline-flex size-11 items-center justify-center rounded-btn text-ink hover:bg-primary-50 hover:text-primary-600 xl:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <Menu size={26} aria-hidden="true" />
        </button>
      </Container>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
