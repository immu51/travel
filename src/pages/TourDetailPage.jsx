/**
 * Tour detail page: hero slider, history, benefits, inclusions, tour highlights gallery.
 * Route: /tour/:slug
 */
import { useParams, Link } from 'react-router-dom'
import { whatsappUrl } from '../constants'
import { getTourBySlug } from '../data/tours'
import { useImageSlider } from '../hooks/useImageSlider'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import SliderDots from '../components/SliderDots'

const HERO_SLIDER_INTERVAL_MS = 3000

export default function TourDetailPage() {
  const { slug } = useParams()
  const tour = getTourBySlug(slug)
  const heroImages = tour?.detail?.images?.length > 1 ? tour.detail.images : null
  const [heroIndex, setHeroIndex] = useImageSlider(heroImages?.length ?? 0, HERO_SLIDER_INTERVAL_MS)

  if (!tour) {
    return (
      <div className="font-body text-text antialiased bg-bg min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-heading text-2xl text-primary mb-4">Tour not found</h1>
            <Link to="/#packages" className="text-accent font-medium hover:underline">
              ← Back to packages
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const { title, dayLabel, history, benefits, inclusions, waText, image, images } = tour
  const heroImage = !heroImages && (image || (images && images[0]?.src))

  return (
    <div className="font-body text-text antialiased bg-bg">
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Link
            to="/#packages"
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary text-sm font-medium mb-6 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to packages
          </Link>

          {/* Hero – auto-slider when multiple images, else single banner */}
          {heroImages && heroImages.length > 0 && (
            <header className="relative h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-soft mb-12 animate-fade-in">
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
                      src={img.src}
                      alt={img.alt || title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              <div className="absolute inset-0 flex items-center justify-center z-[2]">
                <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center px-4 drop-shadow-lg">
                  {title}
                </h1>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2]">
                <SliderDots
                  count={heroImages.length}
                  activeIndex={heroIndex}
                  onSelect={setHeroIndex}
                  activeClass="bg-accent scale-125"
                  inactiveClass="bg-white/60 hover:bg-white/80"
                />
              </div>
            </header>
          )}

          {heroImage && !heroImages && (
            <header className="relative h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-soft mb-12 animate-fade-in">
              <img
                src={heroImage}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center px-4 drop-shadow-lg">
                  {title}
                </h1>
              </div>
            </header>
          )}

          {!heroImage && !heroImages?.length && (
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-12">
              {title}
            </h1>
          )}

          {dayLabel && (
            <p className="text-accent font-semibold text-lg md:text-xl border-l-4 border-accent pl-4 mb-12">
              {dayLabel}
            </p>
          )}

          {history && history.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-4">Brief history</h2>
              <div className="text-text/90 leading-relaxed space-y-3 text-base">
                {history.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {benefits && benefits.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-4">Why choose us</h2>
              <ul className="space-y-3 text-text/90 text-base">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {inclusions && inclusions.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-4">What we provide</h2>
              <ul className="space-y-3 text-text/90 text-base">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tour Highlights – featured image + horizontal scroll strip */}
          {images && images.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-6">Tour Highlights</h2>
              {/* Featured: first image full width */}
              <div className="rounded-2xl overflow-hidden shadow-soft mb-6 ring-1 ring-primary/5">
                <div className="aspect-[21/9] min-h-[200px] overflow-hidden">
                  <img
                    src={images[0].src}
                    alt={images[0].alt || `${title} highlight`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Rest: horizontal scroll strip with snap */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin]">
                  {images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="group flex-shrink-0 w-[85vw] sm:w-80 snap-center"
                    >
                      <div className="rounded-2xl overflow-hidden shadow-soft hover:shadow-xl ring-1 ring-primary/5 transition-all duration-300">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={img.src}
                            alt={img.alt || `${title} highlight ${i + 2}`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          <div className="pt-6">
            <a
              href={whatsappUrl(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-4 bg-accent text-primary shadow-lg hover:scale-105 transition-transform duration-300 btn-enquire"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
