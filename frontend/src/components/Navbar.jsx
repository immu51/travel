/**
 * Navbar: Logo, Home, Our Services (dropdown), About, Gallery, Contact. Hash links on home; route links elsewhere.
 */
import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { scrollToSection } from '../utils/scroll'
import Logo from './Logo'

const servicesDropdown = [
  { href: '/car-rental', label: 'Car Rental' },
  { href: '/tours', label: 'Tour Package Reservation' },
  { href: '/hotel-booking', label: 'Hotel Reservation' },
  { href: '/booking', state: { service: 'guide' }, label: 'Tour Guide Reservation' },
]

const navLinksAfterServices = [
  { href: '#about', label: 'About', hash: true },
  { href: '#gallery', label: 'Gallery', hash: true },
  { href: '#contact', label: 'Contact', hash: true },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setServicesOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const linkHref = (link) => {
    if (!link.hash) return link.href
    return isHome ? link.href : (link.href.startsWith('#') ? `/${link.href}` : link.href)
  }
  const handleNavClick = (e, link) => {
    if (link.hash && isHome) {
      e.preventDefault()
      scrollToSection(e, link.href)
    }
  }
  const useSolid = solid || !isHome

  const goHome = (e) => {
    setMobileOpen(false)
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useSolid ? 'navbar-solid' : 'navbar-over-hero'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0 overflow-x-hidden md:overflow-visible">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-2 min-w-0 shrink"
            aria-label="TraverraX Home"
            onClick={goHome}
          >
            <Logo
              className={`transition-colors ${useSolid ? 'text-primary' : 'text-white'}`}
              size="sm"
              showText={true}
              layout="inline"
            />
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link
                to="/"
                onClick={goHome}
                className={`font-medium transition-colors ${useSolid ? 'text-primary hover:text-accent' : 'text-white hover:text-white/90'}`}
              >
                Home
              </Link>
            </li>
            {/* Our Services dropdown - opens on hover, no gap so it doesn't close when moving to menu */}
            <li
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((o) => !o)}
                className={`flex items-center gap-1 font-medium transition-colors uppercase tracking-wide ${
                  useSolid ? 'text-primary hover:text-accent' : 'text-white hover:text-white/90'
                } ${servicesOpen ? 'underline' : ''}`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Our Services
                <ChevronIcon className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full pt-1 min-w-[220px] z-[100]">
                  <ul className="rounded-xl bg-white shadow-lg border border-primary/10 py-2 overflow-hidden">
                    {servicesDropdown.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          state={item.state}
                          onClick={() => setServicesOpen(false)}
                          className="block px-5 py-3 font-medium text-primary hover:bg-primary/5 uppercase tracking-wide text-sm whitespace-nowrap"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            {navLinksAfterServices.map((link) => (
              <li key={link.href + link.label}>
                {link.hash ? (
                  <a
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`font-medium transition-colors ${useSolid ? 'text-primary hover:text-accent' : 'text-white hover:text-white/90'}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`font-medium transition-colors ${useSolid ? 'text-primary hover:text-accent' : 'text-white hover:text-white/90'}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            to="/admin/login"
            className="hidden md:inline-flex items-center gap-2 bg-accent text-primary font-semibold px-5 py-2.5 rounded-card hover:bg-[#e8914a] transition-all shadow-soft hover:shadow-glass hover:-translate-y-0.5"
          >
            Login
          </Link>
          <button
            type="button"
            className={`md:hidden p-2 transition-colors ${useSolid ? 'text-primary' : 'text-white'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="relative w-6 h-6 block">
              <span className={`absolute inset-0 flex flex-col justify-center gap-1.5 transition-all duration-300 ease-out ${mobileOpen ? 'gap-0' : ''}`} aria-hidden>
                <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-out origin-center ${mobileOpen ? 'rotate-45 translate-y-[0.2rem]' : ''}`} />
                <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-out ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-out origin-center ${mobileOpen ? '-rotate-45 -translate-y-[0.2rem]' : ''}`} />
              </span>
            </span>
          </button>
        </div>
      </nav>
      <div
        className={`nav-mobile-menu md:hidden bg-white border-t border-gray-100 shadow-lg overflow-y-auto overflow-x-hidden transition-all duration-300 ease-out ${
          mobileOpen
            ? 'max-h-[calc(100vh-4rem)] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          <Link
            to="/"
            onClick={() => {
              setMobileOpen(false)
              if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="block py-2 text-primary font-medium"
          >
            Home
          </Link>
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((o) => !o)}
              className="flex items-center gap-2 py-2 text-primary font-medium uppercase tracking-wide"
            >
              Our Services
              <ChevronIcon className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <ul className="pl-4 mt-1 space-y-1 border-l-2 border-primary/20">
                {servicesDropdown.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      state={item.state}
                      onClick={() => {
                        setMobileOpen(false)
                        setMobileServicesOpen(false)
                      }}
                      className="block py-2 text-primary/90 font-medium text-sm uppercase"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {navLinksAfterServices.map((link) =>
            link.hash ? (
              <a
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                onClick={(e) => {
                  handleNavClick(e, link)
                  setMobileOpen(false)
                }}
                className="block py-2 text-primary font-medium"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-primary font-medium"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/admin/login"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-4 py-2 rounded-card mt-2"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
