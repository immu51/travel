/**
 * Hero: full-width background image, logo, headline, tagline, CTAs, trust strip, location pills.
 */
import { Link } from 'react-router-dom'
import { useImageSlider } from '../hooks/useImageSlider'
import SliderDots from './SliderDots'
import { scrollToSection } from '../utils/scroll'
import Logo from './Logo'
import { useContent } from '../context/ContentContext'

const SLIDER_INTERVAL_MS = 5000

const TRUST_ITEMS = [
  { icon: 'trips', text: '500+ Trips Done' },
  { icon: 'support', text: '24/7 Support' },
  { icon: 'quote', text: 'Free Custom Quote' },
]

const HERO_LOCATIONS = [
  { name: 'Agra', slug: 'agra' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Rajasthan', slug: 'rajasthan' },
]

export default function Hero() {
  const { heroImages } = useContent()
  const [activeIndex, setActiveIndex] = useImageSlider(heroImages.length, SLIDER_INTERVAL_MS)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-bg-slider absolute inset-0">
        {heroImages.map((img, i) => (
          <div
            key={`hero-${i}-${(img.url || '').slice(0, 40)}`}
            className={`hero-bg-slide absolute inset-0 transition-opacity duration-1000 ${
              i === activeIndex ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'
            }`}
            aria-hidden={i !== activeIndex}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover object-center"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/60 to-primary/90 z-[1]" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center mb-8 md:mb-10">
          <Logo
            className="text-white mb-6 animate-fade-in animation-delay-100"
            size="lg"
            showText={true}
            layout="stacked"
          />
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-4 animate-fade-in animation-delay-200 drop-shadow-lg">
            Discover the Best of India
          </h1>
          <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto mb-5 animate-fade-in animation-delay-300">
            Luxury tour packages, customized for you. Family tours, honeymoons &amp; adventure trips.
          </p>
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in animation-delay-300">
            {HERO_LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                to="/tours"
                className="hero-pill px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 border border-white/20 hover:bg-white/25 hover:border-white/40 hover:scale-105 transition-all duration-300"
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center animate-fade-in animation-delay-400">
          <a
            href="#packages"
            onClick={(e) => scrollToSection(e, '#packages')}
            className="hero-cta-primary inline-flex items-center justify-center bg-accent text-primary font-semibold px-8 py-4 rounded-2xl shadow-soft"
          >
            View India Tour Packages
          </a>
          <Link
            to="/same-day-tours"
            className="hero-cta-secondary inline-flex items-center justify-center bg-white/15 backdrop-blur border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:bg-white/25 hover:border-white/50 hover:-translate-y-0.5"
          >
            Same Day Tours from Delhi
          </Link>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="hero-cta-secondary inline-flex items-center justify-center bg-white/10 backdrop-blur border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:bg-white/20 hover:-translate-y-0.5"
          >
            Contact Travel Expert
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 mt-10 animate-fade-in animation-delay-500 text-white/85">
          {TRUST_ITEMS.map((item) => (
            <div key={item.icon} className="flex items-center gap-2 hero-trust-item">
              {item.icon === 'trips' && (
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              )}
              {item.icon === 'support' && (
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
              {item.icon === 'quote' && (
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              )}
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <SliderDots
          count={heroImages.length}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-fade-in animation-delay-600">
        <a
          href="#why-choose"
          onClick={(e) => scrollToSection(e, '#why-choose')}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-1">Scroll</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
