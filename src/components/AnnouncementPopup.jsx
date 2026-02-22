/**
 * Announcement popup: shows when user lands on home. Premium look with animation.
 * Every time client comes back to home screen, popup can show again (after they close and leave home).
 */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../context/ContentContext'

const SESSION_KEY = 'traverrax_announcement_seen'

export default function AnnouncementPopup() {
  const location = useLocation()
  const { announcement, getWhatsAppUrl } = useContent()
  const [open, setOpen] = useState(false)

  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      try {
        sessionStorage.removeItem(SESSION_KEY)
      } catch (_) {}
      setOpen(false)
      return
    }
    if (!announcement?.enabled || !announcement?.text?.trim()) return
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
      const t = setTimeout(() => setOpen(true), 600)
      return () => clearTimeout(t)
    } catch (_) {}
  }, [isHome, location.pathname, announcement?.enabled, announcement?.text])

  const handleClose = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch (_) {}
  }

  if (!open || !announcement?.enabled || !announcement?.text?.trim()) return null

  const urgencyText = (announcement.urgencyText || 'For limited time only. Contact us soon!').trim()

  return (
    <div
      className="announcement-popup-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="announcement-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="announcement-popup-card relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent strip + gradient feel */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-[#e8914a] to-accent" />
        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-accent/10" />
        <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-primary/5" />

        <div className="relative p-6 pt-7">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-4 pr-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Special Offer</p>
              <h2 id="announcement-title" className="font-heading font-bold text-xl text-primary mb-2 leading-tight">
                {announcement.text.trim()}
              </h2>
              <p className="text-text/70 text-sm mb-5 leading-relaxed">{urgencyText}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={getWhatsAppUrl(announcement.text.trim())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 font-semibold bg-accent text-primary px-5 py-2.5 rounded-xl hover:bg-[#e8914a] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contact now
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center font-medium text-primary border border-primary/20 hover:bg-primary/5 px-5 py-2.5 rounded-xl transition-colors duration-200"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
