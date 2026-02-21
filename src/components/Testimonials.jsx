import { useState, useEffect } from 'react'

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80',
    alt: 'Traveler review - family tour package',
    quote:
      'We booked a customized holiday package for our family. The team was professional, and every detail was taken care of. Highly recommend this travel agency in Mumbai!',
    name: 'Priya S., Mumbai',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80',
    alt: 'Traveler review - honeymoon tour package',
    quote:
      'Our honeymoon tour package to Kerala was beyond perfect. The best tour and travel agency in India—trusted travel experts who understood exactly what we wanted.',
    name: 'Rahul & Anjali, Delhi',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80',
    alt: 'Traveler review - adventure trip India',
    quote:
      'Adventure trips in India done right! Affordable travel agency with great customized options. Ladakh trip was seamless. Will book again.',
    name: 'Meera K., Bangalore',
  },
]

const Star = () => <span className="text-accent" aria-hidden="true">★</span>

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000)
    return () => clearInterval(id)
  }, [])

  const go = (delta) => setCurrent((c) => (c + delta + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary text-center mb-4">
          What Our Travelers Say
        </h2>
        <p className="text-center text-text/80 max-w-2xl mx-auto mb-16">
          Our happy travelers trust us as the best tour and travel agency in India.
        </p>
        <div className="relative">
          <div className="overflow-hidden">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto ${i === current ? 'block' : 'hidden'}`}
              >
                <div className="flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.alt}
                    className="w-24 h-24 rounded-full object-cover border-4 border-accent/30"
                  />
                </div>
                <div>
                  <div className="flex gap-1 text-accent mb-3">
                    <Star /><Star /><Star /><Star /><Star />
                  </div>
                  <blockquote className="text-primary text-lg leading-relaxed mb-4">"{t.quote}"</blockquote>
                  <cite className="font-heading font-semibold text-primary">— {t.name}</cite>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => go(-1)}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
