import { whatsappUrl } from '../constants'

const packages = [
  {
    image: 'https://images.unsplash.com/photo-1566507592333-c60657eea523?w=800&q=80',
    alt: 'Goa family tour package - beaches and culture',
    title: 'Goa Beach & Culture',
    description: 'Sun, sand, and heritage. Perfect for families and couples seeking a relaxed coastal holiday with customized activities.',
    duration: '5–7 days',
    waText: 'Hi, I am interested in Goa Beach & Culture tour package.',
  },
  {
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    alt: 'Rajasthan family tour package - forts and palaces',
    title: 'Rajasthan Heritage',
    description: 'Forts, palaces, and desert safaris. An iconic India tour package for families and culture lovers.',
    duration: '7–10 days',
    waText: 'Hi, I am interested in Rajasthan Heritage tour package.',
  },
  {
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
    alt: 'Kerala honeymoon tour package - backwaters and hills',
    title: 'Kerala Honeymoon',
    description: 'Backwaters, tea gardens, and beaches. Our top honeymoon tour package for romance and serenity.',
    duration: '6–8 days',
    waText: 'Hi, I am interested in Kerala Honeymoon tour package.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Himachal Pradesh adventure trip - mountains and trekking',
    title: 'Himachal Adventure',
    description: 'Trekking, camping, and mountain drives. One of our best adventure trips in India for thrill-seekers.',
    duration: '5–9 days',
    waText: 'Hi, I am interested in Himachal Adventure tour package.',
  },
  {
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80',
    alt: 'Agra and Taj Mahal India tour package',
    title: 'Golden Triangle',
    description: 'Delhi, Agra, Jaipur. The classic India tour package for first-time visitors and families.',
    duration: '5–6 days',
    waText: 'Hi, I am interested in Golden Triangle tour package.',
  },
  {
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    alt: 'Ladakh adventure trip in India - mountains',
    title: 'Ladakh Explorer',
    description: 'High-altitude lakes, monasteries, and scenic drives. Ultimate adventure trips in India for explorers.',
    duration: '7–10 days',
    waText: 'Hi, I am interested in Ladakh Explorer tour package.',
  },
]

export default function Packages() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary text-center mb-4">
          Popular India Tour Packages
        </h2>
        <p className="text-center text-text/80 max-w-3xl mx-auto mb-16">
          Explore our most popular India tour packages including family tour packages, honeymoon tour packages, and
          adventure trips in India. We design customized travel plans based on your preferences and budget.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <article
              key={pkg.title}
              className="package-card rounded-card overflow-hidden bg-bg shadow-soft hover:shadow-glass transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover-zoom transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-primary mb-2">{pkg.title}</h3>
                <p className="text-text/80 text-sm mb-4">{pkg.description}</p>
                <p className="text-accent font-medium text-sm mb-4">Duration: {pkg.duration}</p>
                <a
                  href={whatsappUrl(pkg.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-5 py-2.5 rounded-card hover:bg-[#e8914a] transition-colors"
                >
                  Enquire Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
