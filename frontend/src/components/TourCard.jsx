/**
 * TourCard: professional tour card with image, title, location, duration, price, description, rating, View Details.
 */
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import AnimateIn from './AnimateIn'

function StarRating({ rating = 5 }) {
  const r = Math.min(5, Math.max(0, Number(rating)))
  return (
    <div className="flex items-center gap-1" aria-label={`${r} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= r ? 'text-accent' : 'text-primary/20'}
          aria-hidden
        >
          ★
        </span>
      ))}
      <span className="text-sm text-text/70 ml-1">({r})</span>
    </div>
  )
}

export default function TourCard({ tour, index = 0, isSameDay = false }) {
  const { getWhatsAppUrl, announcement } = useContent()
  const { slug, image, alt, title, description, duration, location, rating, waText } = tour
  const detailUrl = isSameDay ? `/same-day-tours/${slug}` : `/tour/${slug}`
  const showOfferBadge = announcement?.enabled && announcement?.text?.trim() && announcement?.tourSlug === slug

  return (
    <AnimateIn variant="fadeUpScale" delay={index * 60}>
      <article className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-glass border border-primary/5 transition-all duration-300 hover:-translate-y-2 relative">
        {showOfferBadge && (
          <div className="absolute top-3 right-3 z-10 bg-accent text-primary font-heading font-bold text-sm px-3 py-1 rounded-lg shadow-md">
            {announcement.text.trim()}
          </div>
        )}
        <Link to={detailUrl} className="block overflow-hidden">
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
            {location && <span>{location}</span>}
            {duration && (
              <>
                {location && <span aria-hidden>·</span>}
                <span>{duration}</span>
              </>
            )}
          </div>
          <h3 className="font-heading font-semibold text-xl text-primary mb-2 line-clamp-2">
            <Link to={detailUrl} className="hover:text-accent transition-colors">
              {title}
            </Link>
          </h3>
          <p className="text-text/80 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={rating} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={detailUrl}
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
