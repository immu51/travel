/**
 * Detail page for a same day tour. Full itinerary, highlights, WhatsApp CTA.
 * Route: /same-day-tours/:slug
 */
import { useParams, Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import SEO from '../components/SEO'
import BreadcrumbSchema from '../components/BreadcrumbSchema'
import TourSchema from '../components/TourSchema'
import { SITE_URL } from '../constants'
import AnimateIn from '../components/AnimateIn'

export default function SameDayTourDetailPage() {
  const { slug } = useParams()
  const { getSameDayTourBySlug, getWhatsAppUrl } = useContent()
  const tour = getSameDayTourBySlug(slug)

  if (!tour) {
    return (
      <div className="font-body text-text antialiased bg-bg min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-heading text-2xl text-primary mb-4">Tour not found</h1>
            <Link to="/same-day-tours" className="text-accent font-medium hover:underline">
              ← All same day tours
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const { title, subtitle, description, duration, departure, destination, image, alt, highlights, itinerary, waText } = tour
  const ogImageUrl = image ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`) : undefined
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Same Day Tours from Delhi', url: `${SITE_URL}/same-day-tours` },
    { name: title, url: `${SITE_URL}/same-day-tours/${slug}` },
  ]
  return (
    <div className="font-body text-text antialiased bg-bg overflow-x-hidden">
      <SEO
        title={title}
        description={description || `Book ${title} from Delhi. ${duration}. Contact us for custom itinerary.`}
        ogImage={ogImageUrl}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <TourSchema tour={{ ...tour, slug }} isSameDay />
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <Link
            to="/same-day-tours"
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary text-sm font-medium mb-4 sm:mb-6 transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>All same day tours</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
              {/* Hero image */}
              <header className="relative h-[240px] xs:h-[280px] sm:h-[300px] md:h-[360px] rounded-xl sm:rounded-2xl overflow-hidden shadow-soft">
                <img
                  src={image}
                  alt={alt || title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h1 className="font-heading font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl drop-shadow-lg break-words">
                    {title}
                  </h1>
                  {(subtitle || destination || duration) && (
                    <p className="text-white/95 mt-1 text-sm sm:text-base">
                      {[subtitle, destination, duration].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </header>

              <section>
                <h2 className="font-heading font-semibold text-lg sm:text-xl text-primary mb-3">Overview</h2>
                <p className="text-text/90 leading-relaxed break-words">{description}</p>
              </section>

              {highlights?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl text-primary mb-3">Highlights</h2>
                  <ul className="flex flex-wrap gap-2">
                    {highlights.map((item, i) => (
                      <li
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-sm font-medium break-words"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {itinerary?.length > 0 && (
                <section>
                  <h2 className="font-heading font-semibold text-lg sm:text-xl text-primary mb-3 sm:mb-4">Itinerary</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {itinerary.map((step, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-2 sm:flex-row sm:gap-4 rounded-xl sm:rounded-2xl bg-white/80 border border-primary/10 p-4 shadow-soft"
                      >
                        <div className="flex-shrink-0 w-full sm:w-20 text-accent font-semibold text-sm">
                          {step.time}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading font-semibold text-primary mb-1 text-base sm:text-lg break-words">{step.title}</h3>
                          <p className="text-text/90 text-sm leading-relaxed break-words">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky sidebar */}
            <div className="lg:col-span-1 min-w-0">
              <div className="lg:sticky lg:top-24">
                <AnimateIn variant="fadeUpScale" className="rounded-xl sm:rounded-2xl overflow-hidden bg-white/90 backdrop-blur border border-primary/10 shadow-glass p-4 sm:p-6">
                  <h3 className="font-heading font-semibold text-lg sm:text-xl text-primary mb-3 sm:mb-4">Book this tour</h3>
                  {duration && (
                    <p className="text-text/80 text-sm mb-2">
                      <span className="font-medium text-primary">Duration:</span> {duration}
                    </p>
                  )}
                  {departure && (
                    <p className="text-text/80 text-sm mb-2">
                      <span className="font-medium text-primary">Departure:</span> {departure}
                    </p>
                  )}
                  {destination && (
                    <p className="text-text/80 text-sm mb-6">
                      <span className="font-medium text-primary">Destination:</span> {destination}
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
