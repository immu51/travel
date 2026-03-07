/**
 * Tour detail page: image gallery, itinerary, inclusions/exclusions, FAQ, reviews, sticky booking sidebar, WhatsApp.
 * Route: /tour/:slug
 */
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useImageSlider } from '../hooks/useImageSlider'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import SliderDots from '../components/SliderDots'
import SEO from '../components/SEO'
import BreadcrumbSchema from '../components/BreadcrumbSchema'
import TourSchema from '../components/TourSchema'
import { SITE_URL } from '../constants'
import AnimateIn from '../components/AnimateIn'
import Testimonials from '../components/Testimonials'

const HERO_SLIDER_INTERVAL_MS = 4000

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-primary/10 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between gap-2 text-left font-heading font-semibold text-primary hover:text-accent transition-colors break-words"
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1">{q}</span>
        <span className={`ml-2 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && <p className="pb-4 text-text/90 text-sm leading-relaxed">{a}</p>}
    </div>
  )
}

export default function TourDetailPage() {
  const { slug } = useParams()
  const { getTourBySlug, getWhatsAppUrl } = useContent()
  const tour = getTourBySlug(slug)
  const [faqOpen, setFaqOpen] = useState(null)
  const heroImages = tour?.images?.length ? tour.images : null
  const [heroIndex, setHeroIndex] = useImageSlider(heroImages?.length ?? 0, HERO_SLIDER_INTERVAL_MS)

  if (!tour) {
    return (
      <div className="font-body text-text antialiased bg-bg min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-heading text-2xl text-primary mb-4">Tour not found</h1>
            <Link to="/tours" className="text-accent font-medium hover:underline">
              ← View all packages
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const {
    title,
    dayLabel,
    history,
    benefits,
    inclusions,
    exclusions,
    itinerary,
    faq,
    waText,
    image,
    rating,
    duration,
    location,
  } = tour
  const heroImage = !heroImages?.length && (image || (tour.images && tour.images[0]?.src))
  const firstImageSrc = heroImages?.[0] ? (typeof heroImages[0].src === 'string' ? heroImages[0].src : heroImages[0].src?.default) : heroImage
  const ogImageUrl = firstImageSrc ? (firstImageSrc.startsWith('http') ? firstImageSrc : `${SITE_URL}${firstImageSrc.startsWith('/') ? '' : '/'}${firstImageSrc}`) : undefined
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'India Tour Packages', url: `${SITE_URL}/tours` },
    { name: title, url: `${SITE_URL}/tour/${slug}` },
  ]
  return (
    <div className="font-body text-text antialiased bg-bg overflow-x-hidden">
      <SEO
        title={title}
        description={tour.description || `Book ${title} - ${duration}. ${location || ''}. Contact us for custom itinerary.`}
        ogImage={ogImageUrl}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <TourSchema tour={{ ...tour, slug }} isSameDay={false} />
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary text-sm font-medium mb-4 sm:mb-6 transition-colors duration-300"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>All packages</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-10 min-w-0">
              {/* Hero gallery */}
              {(heroImages?.length > 0 || heroImage) && (
                <header className="relative h-[260px] xs:h-[300px] sm:h-[320px] md:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden shadow-soft">
                  {heroImages?.length > 0 ? (
                    <>
                      <div className="absolute inset-0">
                        {heroImages.map((img, i) => (
                          <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                              i === heroIndex ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'
                            }`}
                            aria-hidden={i !== heroIndex}
                          >
                            <img
                              src={typeof img.src === 'string' ? img.src : (img.src?.default ?? '')}
                              alt={img.alt || title}
                              className="w-full h-full object-cover"
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-black/30 z-[1]" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2]">
                        <SliderDots
                          count={heroImages.length}
                          activeIndex={heroIndex}
                          onSelect={setHeroIndex}
                          activeClass="bg-accent scale-125"
                          inactiveClass="bg-white/60 hover:bg-white/80"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={heroImage}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-[2]">
                    <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl text-white drop-shadow-lg break-words">
                      {title}
                    </h1>
                    {(location || duration) && (
                      <p className="text-white/90 mt-1 text-sm sm:text-base">
                        {[location, duration].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </header>
              )}

              {!heroImages?.length && !heroImage && (
                <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-primary break-words">
                  {title}
                </h1>
              )}

              {dayLabel && (
                <p className="text-accent font-semibold text-base sm:text-lg border-l-4 border-accent pl-3 sm:pl-4 break-words">
                  {dayLabel}
                </p>
              )}

              {history?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4">
                    Overview
                  </h2>
                  <div className="text-text/90 leading-relaxed space-y-3">
                    {history.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              )}

              {itinerary?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4">
                    Itinerary
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="rounded-xl sm:rounded-2xl bg-white/80 border border-primary/10 p-4 sm:p-5 shadow-soft"
                      >
                        <h3 className="font-heading font-semibold text-primary mb-2 text-base sm:text-lg break-words">
                          Day {day.day} – {day.title}
                        </h3>
                        <p className="text-text/90 text-sm leading-relaxed break-words">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {benefits?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4">
                    Why choose this tour
                  </h2>
                  <ul className="space-y-2 text-text/90">
                    {benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {inclusions?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4">
                    Inclusions
                  </h2>
                  <ul className="space-y-2 text-text/90">
                    {inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {exclusions?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4">
                    Exclusions
                  </h2>
                  <ul className="space-y-2 text-text/90">
                    {exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500/80 mt-0.5">×</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {faq?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4">
                    FAQ
                  </h2>
                  <div className="rounded-xl sm:rounded-2xl bg-white/80 border border-primary/10 overflow-hidden shadow-soft">
                    {faq.map((item, i) => (
                      <FaqItem
                        key={i}
                        q={item.q}
                        a={item.a}
                        open={faqOpen === i}
                        onToggle={() => setFaqOpen((prev) => (prev === i ? null : i))}
                      />
                    ))}
                  </div>
                </section>
              )}

              <section id="tour-reviews">
                <h2 className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4">
                  Reviews
                </h2>
                <Testimonials />
              </section>
            </div>

            {/* Sticky booking sidebar */}
            <div className="lg:col-span-1 min-w-0">
              <div className="lg:sticky lg:top-24">
                <AnimateIn variant="fadeUpScale" className="rounded-xl sm:rounded-2xl overflow-hidden bg-white/90 backdrop-blur border border-primary/10 shadow-glass p-4 sm:p-6">
                  <h3 className="font-heading font-semibold text-lg sm:text-xl text-primary mb-3 sm:mb-4">
                    Book this tour
                  </h3>
                  {rating != null && (
                    <div className="flex items-center gap-2 text-accent mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className={i <= rating ? '' : 'opacity-30'}>★</span>
                      ))}
                      <span className="text-text/80 text-sm">({rating})</span>
                    </div>
                  )}
                  {duration && (
                    <p className="text-text/80 text-sm mb-6">
                      <span className="font-medium text-primary">Duration:</span> {duration}
                    </p>
                  )}
                  <p className="text-text/70 text-sm mb-6">
                    Contact us via WhatsApp or booking form for dates and details.
                  </p>
                  <a
                    href={getWhatsAppUrl(waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base bg-accent text-primary shadow-soft hover:bg-[#e8914a] hover:shadow-glass hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Contact on WhatsApp</span>
                  </a>
                  <Link
                    to="/booking"
                    state={{ tour: title, slug }}
                    className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl font-medium text-sm sm:text-base border border-primary/30 text-primary mt-3 hover:bg-primary/5 transition-colors min-h-[44px]"
                  >
                    Booking form
                  </Link>
                </AnimateIn>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
