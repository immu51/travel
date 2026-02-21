import { useState, useEffect } from 'react'
import { scrollToSection } from '../utils/scroll'

const heroImages = [
  { url: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1920&q=85', alt: 'India tour - scenic view' },
  { url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=85', alt: 'Agra monument - Taj Mahal' },
  { url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=85', alt: 'Lal Quila - Red Fort Delhi' },
  { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85', alt: 'Ladakh monastery - North India monument' },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-bg-slider absolute inset-0">
        {heroImages.map((img, i) => (
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
              loading="eager"
              fetchPriority="high"
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
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-accent scale-125' : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
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
