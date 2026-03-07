import { CITY_NAME } from '../constants'
import GSAPAnimateIn from './GSAPAnimateIn'

const points = [
  { badge: '5+', label: 'Years Experience' },
  { badge: '500+', label: 'Happy Travelers' },
  {
    badge: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    label: 'Customized Tour Packages',
  },
  {
    badge: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Local Travel Experts',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <GSAPAnimateIn variant="fadeUpStrong" className="flex flex-col">
            <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
              About Our Travel Agency
            </h2>
            <p className="text-text/80 leading-relaxed mb-8">
              We are a trusted and affordable travel agency in {CITY_NAME}, specializing in customized holiday
              packages across India. With years of experience and hundreds of satisfied travelers, we focus on
              comfort, safety, and personalized travel planning.
            </p>
            <ul className="space-y-4">
              {points.map(({ badge, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-heading font-bold">
                    {badge}
                  </span>
                  <span className="font-medium text-primary">{label}</span>
                </li>
              ))}
            </ul>
            </div>
          </GSAPAnimateIn>
          <GSAPAnimateIn variant="fadeUpScale" delay={0.15}>
          <div className="relative">
            <div className="aspect-[4/3] rounded-card overflow-hidden shadow-glass">
              <img
                src="/images/about/team.jpg"
                alt="Travel agency team - trusted travel experts in India"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </GSAPAnimateIn>
        </div>
      </div>
    </section>
  )
}
