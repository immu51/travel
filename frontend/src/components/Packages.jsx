/**
 * Packages: list of tour package cards on home. Links to /tours for full listing with filters.
 */
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import AnimateIn from './AnimateIn'
import SliderDots from './SliderDots'
import { useImageSlider } from '../hooks/useImageSlider'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'

const SWIPE_THRESHOLD = 50
const CARD_SLIDER_INTERVAL_MS = 3000

function CardImage({ pkg }) {
  const images = pkg.detail?.images
  const hasSlider = images && images.length > 1
  const [index, setIndex] = useImageSlider(images?.length ?? 0, CARD_SLIDER_INTERVAL_MS)
  const startX = useRef(0)
  const didDrag = useRef(false)

  const goNext = () => setIndex((i) => (i + 1) % images.length)
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length)

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientX - startX.current) > 10) e.preventDefault()
  }
  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - startX.current
    if (delta < -SWIPE_THRESHOLD) goNext()
    else if (delta > SWIPE_THRESHOLD) goPrev()
  }

  const handleMouseDown = (e) => {
    startX.current = e.clientX
    didDrag.current = false
  }
  const handleMouseUp = (e) => {
    const delta = e.clientX - startX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      didDrag.current = true
      if (delta < 0) goNext()
      else goPrev()
    }
  }
  const handleSliderClick = (e) => {
    if (didDrag.current) {
      e.preventDefault()
      e.stopPropagation()
      didDrag.current = false
    }
  }

  const imgClass = 'absolute inset-0 w-full h-full object-cover hover-zoom transition-all duration-500'
  const wrapClass = 'aspect-[4/3] overflow-hidden relative bg-primary/5 select-none touch-pan-y'

  if (hasSlider) {
    return (
      <div
        className={wrapClass}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleSliderClick}
        style={{ touchAction: 'pan-y' }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={typeof img.src === 'string' ? img.src : (img.src?.default ?? '')}
            alt={img.alt || pkg.alt}
            loading={i === 0 ? 'lazy' : undefined}
            className={`${imgClass} transition-opacity duration-1000 ${i === index ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'}`}
            aria-hidden={i !== index}
            draggable={false}
          />
        ))}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <SliderDots
            count={images.length}
            activeIndex={index}
            onSelect={(i) => setIndex(i)}
            activeClass="bg-accent scale-125"
            inactiveClass="bg-white/70 hover:bg-white/90"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={wrapClass}>
      <img
        src={pkg.image}
        alt={pkg.alt}
        loading="lazy"
        className={`${imgClass} relative z-0`}
      />
    </div>
  )
}

export default function Packages() {
  const { tours: packages, getWhatsAppUrl, announcement } = useContent()
  return (
    <section id="packages" className={`${SECTION_PADDING} bg-white`}>
      <div className={CONTAINER_CLASS}>
        <AnimateIn variant="fadeUp" className="text-center mb-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary">
            Popular India Tour Packages
          </h2>
        </AnimateIn>
        <AnimateIn variant="fadeUp" delay={100} className="text-center mb-16">
          <p className="text-center text-text/80 max-w-3xl mx-auto">
            Explore our most popular India tour packages including family tour packages, honeymoon tour packages, and
            adventure trips in India. We design customized travel plans based on your preferences and budget.
          </p>
        </AnimateIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => {
            const showOfferBadge = announcement?.enabled && announcement?.text?.trim() && announcement?.tourSlug === pkg.slug
            return (
            <AnimateIn key={pkg.slug} variant="fadeUpScale" delay={120 + i * 70}>
              <article className="package-card package-card-premium rounded-card overflow-hidden bg-bg shadow-soft relative">
                {showOfferBadge && (
                  <div className="absolute top-3 right-3 z-10 bg-accent text-primary font-heading font-bold text-sm px-3 py-1 rounded-lg shadow-md">
                    {announcement.text.trim()}
                  </div>
                )}
                {pkg.slug ? (
                  <Link to={`/tour/${pkg.slug}`} className="block">
                    <CardImage pkg={pkg} />
                  </Link>
                ) : (
                  <CardImage pkg={pkg} />
                )}
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-primary mb-2">{pkg.title}</h3>
                  <p className="text-text/80 text-sm mb-4">{pkg.description}</p>
                  <p className="text-accent font-medium text-sm mb-4">Duration: {pkg.duration}</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.slug && (
                      <Link
                        to={`/tour/${pkg.slug}`}
                        className="text-sm font-medium text-primary border border-primary/30 hover:bg-primary/5 px-4 py-2 rounded-card transition-colors inline-block"
                      >
                        View details & gallery
                      </Link>
                    )}
                    <a
                      href={getWhatsAppUrl(pkg.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-enquire inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-card"
                    >
                      Enquire Now
                    </a>
                  </div>
                </div>
              </article>
            </AnimateIn>
          )
          })}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 font-semibold text-accent hover:text-[#e8914a] transition-colors"
          >
            View all packages & filters
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
