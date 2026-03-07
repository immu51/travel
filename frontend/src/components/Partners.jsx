/**
 * Trust section: partner logos / recognition. Placeholder logos or text.
 */
import GSAPAnimateIn from './GSAPAnimateIn'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'

const partners = [
  { name: 'Travel Partner', label: 'Trusted by travelers' },
  { name: 'Award', label: 'Best service' },
  { name: 'Safety', label: 'Safe travels' },
  { name: 'Support', label: '24/7 support' },
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
                <span className="font-heading font-bold text-accent text-xl">{item.name.charAt(0)}</span>
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
