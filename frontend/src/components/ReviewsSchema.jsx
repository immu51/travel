/**
 * Injects Schema.org JSON-LD for reviews so Google can show star rating in search results.
 * Renders when reviews are loaded to include AggregateRating and Review list.
 */
import { useEffect } from 'react'

const SCRIPT_ID = 'traverrax-reviews-schema'

export default function ReviewsSchema({ reviews = [], businessName = 'TraverraX', businessUrl = '' }) {
  useEffect(() => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      const existing = document.getElementById(SCRIPT_ID)
      if (existing) existing.remove()
      return
    }

    const ratingSum = reviews.reduce((s, r) => s + (Number(r.stars) || 0), 0)
    const count = reviews.length
    const ratingValue = count > 0 ? Math.round((ratingSum / count) * 10) / 10 : 0

    const reviewList = reviews.slice(0, 10).map((r) => ({
      '@type': 'Review',
      itemReviewed: { '@type': 'LocalBusiness', name: businessName },
      author: { '@type': 'Person', name: r.name || 'Anonymous' },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: Number(r.stars) || 5,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: (r.quote || '').slice(0, 500),
      datePublished: r.createdAt ? new Date(r.createdAt).toISOString().slice(0, 10) : undefined,
    })).filter((r) => r.reviewBody)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessName,
      url: businessUrl || (typeof window !== 'undefined' ? window.location.origin : ''),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue,
        bestRating: 5,
        worstRating: 1,
        ratingCount: count,
        reviewCount: count,
      },
      review: reviewList.length ? reviewList : undefined,
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
  }, [reviews, businessName, businessUrl])

  return null
}
