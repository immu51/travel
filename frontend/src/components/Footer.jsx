/**
 * Footer: quick links, contact, newsletter. Contact & social from content context when set.
 */
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CONTAINER_CLASS } from '../constants'
import { useContent } from '../context/ContentContext'
import { scrollToSection } from '../utils/scroll'

const QUICK_LINKS = [
  { href: '/tours', label: 'Tour Packages', external: true },
  { href: '/same-day-tours', label: 'Same Day Tours', external: true },
  { href: '/booking', label: 'Book a Tour', external: true },
  { href: '#packages', label: 'Popular Tours' },
  { href: '#contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy', external: true },
  { href: '/terms', label: 'Terms & Conditions', external: true },
]

export default function Footer() {
  const { businessInfo, socialLinks, getWhatsAppUrl } = useContent()
  const [newsletterMsg, setNewsletterMsg] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { cityName, phone, email, addressShort } = businessInfo || {}
  const linkHref = (item) => {
    if (item.external) return item.href
    if (isHome) return item.href
    return item.href.startsWith('#') ? `/${item.href}` : `/${item.href.replace('#', '')}`
  }
  const handleLinkClick = (e, item) => {
    if (item.external) return
    if (isHome && item.href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(e, item.href)
    }
  }

  const handleNewsletter = (e) => {
    e.preventDefault()
    const email = e.target.querySelector('input[type="email"]').value.trim()
    if (!email) {
      setNewsletterMsg({ type: 'error', text: 'Please enter your email.' })
      return
    }
    setNewsletterMsg({ type: 'success', text: 'Thanks for subscribing!' })
    e.target.querySelector('input[type="email"]').value = ''
  }

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className={CONTAINER_CLASS}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <span className="font-heading font-bold text-xl">TraverraX</span>
            <p className="mt-4 text-white/80 text-sm">
              Your trusted partner for India tour packages, honeymoon packages, and adventure trips. Affordable travel
              agency in {cityName || 'India'}.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={linkHref(item)}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <p className="text-white/80 text-sm">{addressShort || ''}</p>
            <a href={`tel:${(phone || '').replace(/\s/g, '')}`} className="text-white/80 hover:text-accent text-sm block mt-1">
              {phone || ''}
            </a>
            <a href={`mailto:${email || ''}`} className="text-white/80 hover:text-accent text-sm block mt-1">
              {email || ''}
            </a>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-white/80 text-sm mb-4">Get travel tips and offers in your inbox.</p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-card text-primary text-sm outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-primary font-semibold px-4 py-2.5 rounded-card hover:bg-[#e8914a] transition-colors text-sm w-full sm:w-auto shrink-0"
              >
                Subscribe
              </button>
            </form>
            {newsletterMsg && (
              <div className={`form-message ${newsletterMsg.type} mt-2 text-sm ${newsletterMsg.type === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                {newsletterMsg.text}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">© 2025 TraverraX. All rights reserved.</p>
          <div className="flex gap-5 items-center">
            <a href={socialLinks?.facebook?.trim() || 'https://www.facebook.com/'} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-accent transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href={socialLinks?.instagram?.trim() || 'https://www.instagram.com/'} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-accent transition-colors" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.265.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href={socialLinks?.youtube?.trim() || 'https://www.youtube.com/'} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-accent transition-colors" aria-label="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-accent transition-colors" aria-label="WhatsApp">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
