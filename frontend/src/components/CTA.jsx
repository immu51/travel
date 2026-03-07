import { scrollToSection } from '../utils/scroll'
import GSAPAnimateIn from './GSAPAnimateIn'

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <GSAPAnimateIn variant="fadeUpStrong" className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
          Ready to Book Your Customized India Tour Package?
        </h2>
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, '#contact')}
          className="inline-flex items-center justify-center bg-accent text-primary font-semibold px-8 py-4 rounded-card hover:bg-[#e8914a] transition-all shadow-soft hover:shadow-glass hover:-translate-y-0.5"
        >
          Contact Our Travel Experts
        </a>
      </GSAPAnimateIn>
    </section>
  )
}
