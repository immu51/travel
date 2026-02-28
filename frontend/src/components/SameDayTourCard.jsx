/**
 * Card for a same day tour: image, title, destination, duration, price, description, CTA.
 */
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import AnimateIn from './AnimateIn'

export default function SameDayTourCard({ tour, index = 0 }) {
  const { getWhatsAppUrl, announcement } = useContent()
  const { slug, title, subtitle, description, duration, destination, image, alt, waText } = tour
  const showOfferBadge = announcement?.enabled && announcement?.text?.trim() && announcement?.tourSlug === slug

  return (
    <AnimateIn variant="fadeUpScale" delay={index * 60}>
      <article className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-glass border border-primary/5 transition-all duration-300 hover:-translate-y-2 relative">
        {showOfferBadge && (
          <div className="absolute top-3 right-3 z-10 bg-accent text-primary font-heading font-bold text-sm px-3 py-1 rounded-lg shadow-md">
            {announcement.text.trim()}
          </div>
        )}
        <Link to={`/same-day-tours/${slug}`} className="block overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden bg-primary/5">
            <img
              src={image}
              alt={alt || title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-sm text-text/70 mb-2">
            {destination && <span>{destination}</span>}
            {duration && (
              <>
                {destination && <span aria-hidden>·</span>}
                <span>{duration}</span>
              </>
            )}
          </div>
          <h2 className="font-heading font-semibold text-xl text-primary mb-1 line-clamp-2">
            <Link to={`/same-day-tours/${slug}`} className="hover:text-accent transition-colors">
              {title}
            </Link>
          </h2>
          {subtitle && <p className="text-sm text-accent font-medium mb-2">{subtitle}</p>}
          <p className="text-text/80 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="mb-4" />
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/same-day-tours/${slug}`}
              className="inline-flex items-center justify-center font-medium text-primary border border-primary/30 hover:bg-primary/5 px-4 py-2.5 rounded-xl transition-colors"
            >
              View Details
            </Link>
            <a
              href={getWhatsAppUrl(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold bg-accent text-primary px-4 py-2.5 rounded-xl hover:bg-[#e8914a] transition-colors"
            >
              Enquire
            </a>
          </div>
        </div>
      </article>
    </AnimateIn>
  )
}
