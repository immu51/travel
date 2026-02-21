import { CITY_NAME } from '../constants'

const cards = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Affordable Travel Agency',
    text: 'We offer transparent planning and competitive rates so you get the best value on your India tour packages without hidden costs.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
    title: 'Customized Holiday Packages',
    text: 'Personalized itineraries tailored to your preferences, budget, and dates. From family tour packages to honeymoon getaways—we design it your way.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
    title: '24/7 Travel Support',
    text: 'Round-the-clock assistance before, during, and after your trip. Our trusted travel experts are always a call or message away.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 00-4.438 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    ),
    title: `Trusted Travel Experts in ${CITY_NAME}`,
    text: `Award-winning local knowledge and years of experience make us the go-to travel agency in ${CITY_NAME} for India tours and beyond.`,
  },
]

function Icon({ children }) {
  return (
    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {children}
    </svg>
  )
}

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-20 md:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary text-center mb-2">
          Why Choose Our Travel Agency
        </h2>
        <p className="text-center text-text/80 max-w-2xl mx-auto mb-16">
          Trusted by hundreds of travelers across India for memorable journeys.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map(({ icon, title, text }) => (
            <article key={title} className="card-glass rounded-card p-6 lg:p-8 hover-lift">
              <div className="w-14 h-14 rounded-card bg-accent/20 flex items-center justify-center mb-5">
                <Icon>{icon}</Icon>
              </div>
              <h3 className="font-heading font-semibold text-lg text-primary mb-3">{title}</h3>
              <p className="text-text/80 text-sm leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
