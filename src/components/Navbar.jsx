/**
 * Navbar: fixed top bar, home/tour links, WhatsApp. On tour page, links go to home + section.
 */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { whatsappUrl } from '../constants'
import { scrollToSection } from '../utils/scroll'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#packages', label: 'India Tour Packages' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkHref = (hash) => (isHome ? hash : `/${hash}`)
  const handleNavClick = (e, href) => {
    if (isHome) scrollToSection(e, href)
  }
  const useSolid = solid || !isHome

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useSolid ? 'navbar-solid' : 'navbar-over-hero'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href={linkHref('#home')}
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2"
          >
            <span className={`font-heading font-bold text-xl transition-colors ${useSolid ? 'text-primary' : 'text-white'}`}>
              TravelIndia
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={linkHref(href)}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`font-medium transition-colors ${useSolid ? 'text-primary hover:text-accent' : 'text-white hover:text-white/90'}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-accent text-primary font-semibold px-5 py-2.5 rounded-card hover:bg-[#e8914a] transition-all shadow-soft hover:shadow-glass hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp
          </a>
          <button
            type="button"
            className={`md:hidden p-2 transition-colors ${useSolid ? 'text-primary' : 'text-white'}`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>
      <div className={`md:hidden bg-white border-t border-gray-100 shadow-lg ${mobileOpen ? '' : 'hidden'}`}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={linkHref(href)}
              onClick={(e) => {
                handleNavClick(e, href)
                setMobileOpen(false)
              }}
              className="block py-2 text-primary font-medium"
            >
              {label}
            </a>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-4 py-2 rounded-card mt-2"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MenuIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
