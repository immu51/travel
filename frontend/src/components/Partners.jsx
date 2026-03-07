/**
 * Trust section: partner logos / recognition. Icons for Safety, Award, Support, Travel Partner.
 */
import GSAPAnimateIn from './GSAPAnimateIn'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'

const iconClass = 'w-7 h-7 text-accent'

const partners = [
  {
    name: 'Travel Partner',
    label: 'Trusted by travelers',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Award',
    label: 'Best service',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    name: 'Safety',
    label: 'Safe travels',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: 'Support',
    label: '24/7 support',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
]

export default function Partners() {
  return (
    <section className={`${SECTION_PADDING} bg-bg`}>
      <div className={CONTAINER_CLASS}>
        <GSAPAnimateIn variant="fadeUpStrong" className="text-center mb-10">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary">
            Why travelers choose us
          </h2>
          <p className="text-text/80 mt-2 max-w-xl mx-auto text-sm">
            Recognized for quality, transparency, and dedicated support.
          </p>
        </GSAPAnimateIn>
        <GSAPAnimateIn variant="fadeUpScale" stagger={0.1} staggerChildren=".partner-item" className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((item) => (
            <div key={item.name} className="partner-item rounded-2xl bg-white border border-primary/10 shadow-soft p-6 text-center hover:shadow-glass transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <div className="font-heading font-semibold text-primary text-sm">{item.name}</div>
              <div className="text-text/70 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </GSAPAnimateIn>
      </div>
    </section>
  )
}
