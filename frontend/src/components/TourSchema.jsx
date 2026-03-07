/**
 * Injects Schema.org TourTrip or Product JSON-LD for tour detail pages so Google can show rich results.
 */
import { useEffect } from 'react'
import { SITE_URL } from '../constants'

const SCRIPT_ID = 'traverrax-tour-schema'

export default function TourSchema({ tour, isSameDay = false }) {
  useEffect(() => {
    if (!tour) {
      const existing = document.getElementById(SCRIPT_ID)
      if (existing) existing.remove()
      return
    }

    const slug = tour.slug || ''
    const url = isSameDay
      ? `${SITE_URL}/same-day-tours/${slug}`
      : `${SITE_URL}/tour/${slug}`
    const image = tour.images?.[0]?.src
      ? (typeof tour.images[0].src === 'string' ? tour.images[0].src : tour.images[0].src?.default)
      : tour.image

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.title,
      description: tour.description || (tour.history && tour.history[0]) || `Book ${tour.title} – ${tour.duration || ''}. ${tour.location || ''}.`,
      url,
      ...(image && { image: image }),
      ...(tour.duration && { duration: tour.duration }),
      ...(tour.location && { location: { '@type': 'Place', name: tour.location } }),
      provider: {
        '@type': 'TravelAgency',
        name: 'TraverraX',
        url: SITE_URL,
      },
      ...(tour.rating != null && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tour.rating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 1,
        },
      }),
    }

    let script = document.getElementById(SCRIPT_ID)
    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)

    return () => {
      const el = document.getElementById(SCRIPT_ID)
      if (el) el.remove()
    }
  }, [tour, isSameDay])

  return null
}
