/**
 * Trust section: statistics (e.g. 1000+ Happy Clients, 5+ Years, etc.)
 */
import AnimateIn from './AnimateIn'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'

const stats = [
  { value: '1000+', label: 'Happy Travelers' },
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Tour Packages' },
  { value: '24/7', label: 'Support' },
]

export default function Stats() {
  return (
    <section className={`${SECTION_PADDING} bg-primary text-white`}>
      <div className={CONTAINER_CLASS}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <AnimateIn key={item.label} variant="fadeUp" delay={i * 80}>
              <div className="text-center">
                <div className="font-heading font-bold text-3xl md:text-4xl text-accent mb-2">
                  {item.value}
                </div>
                <div className="text-white/90 text-sm md:text-base">{item.label}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
