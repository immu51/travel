/**
 * Hero: full-screen top banner with image slider, headline, and CTA buttons.
 */
import { scrollToSection } from '../utils/scroll'
import { useImageSlider } from '../hooks/useImageSlider'
import SliderDots from './SliderDots'
import hawaMahalImg from '../assets/gallery/hawa-mahal.png'

const HERO_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=85', alt: 'Taj Mahal - Agra' },
  { url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=85', alt: 'Lal Quila - Red Fort Delhi' },
  { url: hawaMahalImg, alt: 'Hawa Mahal - Jaipur' },
]

const SLIDER_INTERVAL_MS = 3000

export default function Hero() {
  const [activeIndex, setActiveIndex] = useImageSlider(HERO_IMAGES.length, SLIDER_INTERVAL_MS)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-bg-slider absolute inset-0">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img.alt}
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90 z-[1]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6 animate-fade-in">
          Best Tour & Travel Agency in India for Customized Holiday Packages
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 animate-fade-in animation-delay-200">
          We provide affordable India tour packages, family tours, honeymoon trips, and adventure travel experiences designed just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          <a
            href="#packages"
            onClick={(e) => scrollToSection(e, '#packages')}
            className="inline-flex items-center justify-center bg-accent text-primary font-semibold px-8 py-4 rounded-card hover:bg-[#e8914a] transition-all shadow-soft hover:shadow-glass hover:-translate-y-0.5"
          >
            View India Tour Packages
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="inline-flex items-center justify-center bg-white/10 backdrop-blur border border-white/30 text-white font-semibold px-8 py-4 rounded-card hover:bg-white/20 transition-all"
          >
            Contact Travel Expert
          </a>
        </div>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <SliderDots
          count={HERO_IMAGES.length}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#why-choose"
          onClick={(e) => scrollToSection(e, '#why-choose')}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
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
