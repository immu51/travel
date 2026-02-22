/**
 * Reviews block: show all reviews with star rating; form to add new review.
 * On mobile: slider (one card at a time). On md+: grid.
 * Uses Firebase Firestore when configured (real-time); else localStorage.
 */
import { useState, useEffect, useRef } from 'react'
import AnimateIn from './AnimateIn'
import { CONTAINER_CLASS } from '../constants'
import { subscribeReviews, addReview, isFirebaseEnabled } from '../lib/reviews'

const STORAGE_KEY = 'travel-reviews'

const defaultReviews = [
  {
    id: '1',
    name: 'Priya S., Mumbai',
    stars: 5,
    quote: 'We booked a customized holiday package for our family. The team was professional, and every detail was taken care of. Highly recommend this travel agency in Mumbai!',
    image: '/images/testimonials/1.jpg',
  },
  {
    id: '2',
    name: 'Rahul & Anjali, Delhi',
    stars: 5,
    quote: 'Our honeymoon tour package to Kerala was beyond perfect. The best tour and travel agency in India—trusted travel experts who understood exactly what we wanted.',
    image: '/images/testimonials/2.jpg',
  },
  {
    id: '3',
    name: 'Meera K., Bangalore',
    stars: 4,
    quote: 'Adventure trips in India done right! Affordable travel agency with great customized options. Ladakh trip was seamless. Will book again.',
    image: '/images/testimonials/3.jpg',
  },
]

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? 'text-accent' : 'text-primary/25'}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  )
}

function StarInput({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={`p-1 text-2xl transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${
            i <= value ? 'text-accent' : 'text-primary/30'
          }`}
          aria-label={`${i} star${i > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ r }) {
  return (
    <article className="h-full p-6 rounded-2xl bg-white shadow-soft border border-primary/5 flex flex-col">
      <div className="flex items-center gap-4 mb-3">
        {r.image ? (
          <img
            src={r.image}
            alt=""
            className="w-12 h-12 rounded-full object-cover border-2 border-accent/30 flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-heading font-semibold text-lg">
            {r.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <StarDisplay rating={r.stars} />
          <cite className="font-heading font-semibold text-primary not-italic block mt-1">
            {r.name}
          </cite>
        </div>
      </div>
      <blockquote className="text-text/90 leading-relaxed flex-1">"{r.quote}"</blockquote>
    </article>
  )
}

function getReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch (_) {}
  return defaultReviews
}

function saveReviews(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
  } catch (_) {}
}

const SLIDER_AUTOPLAY_MS = 5000

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ name: '', stars: 5, quote: '' })
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)
  const sliderRef = useRef(null)
  const touchStartX = useRef(0)
  const useFirebase = isFirebaseEnabled()

  useEffect(() => {
    if (reviews.length <= 1) return
    const t = setInterval(() => {
      setSliderIndex((i) => (i + 1) % reviews.length)
    }, SLIDER_AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [reviews.length])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (reviews.length <= 1) return
    if (dx < -40) setSliderIndex((i) => (i + 1) % reviews.length)
    else if (dx > 40) setSliderIndex((i) => (i - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    if (useFirebase) {
      setLoading(true)
      const unsub = subscribeReviews((list) => {
        setReviews(list)
        setLoading(false)
      })
      return unsub
    }
    setReviews(getReviews())
    setLoading(false)
  }, [useFirebase])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = form.name.trim()
    const quote = form.quote.trim()
    if (!name || !quote) {
      setMessage({ type: 'error', text: 'Please enter your name and review.' })
      return
    }
    if (useFirebase) {
      setSubmitting(true)
      setMessage(null)
      try {
        await addReview({ name, stars: form.stars, quote })
        setForm({ name: '', stars: 5, quote: '' })
        setMessage({ type: 'success', text: 'Thank you! Your review is saved and visible to everyone.' })
        setTimeout(() => setMessage(null), 4000)
      } catch (err) {
        setMessage({ type: 'error', text: err?.message || 'Could not save review. Please try again.' })
      } finally {
        setSubmitting(false)
      }
      return
    }
    const newReview = {
      id: Date.now().toString(),
      name,
      stars: form.stars,
      quote,
      image: null,
    }
    const next = [newReview, ...reviews]
    setReviews(next)
    saveReviews(next)
    setForm({ name: '', stars: 5, quote: '' })
    setMessage({ type: 'success', text: 'Thank you! Your review has been added.' })
    setTimeout(() => setMessage(null), 4000)
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-bg">
      <div className={CONTAINER_CLASS}>
        <AnimateIn variant="fadeUp" className="text-center mb-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary">
            Customer Reviews
          </h2>
        </AnimateIn>
        <AnimateIn variant="fadeUp" delay={100} className="text-center mb-12 md:mb-16">
          <p className="text-text/80 max-w-2xl mx-auto">
            What our travelers say — and add your own review with a star rating.
          </p>
        </AnimateIn>

        {/* Form: add review with stars */}
        <AnimateIn variant="fadeUpScale" delay={150} className="mb-16">
          <div className="max-w-xl mx-auto p-6 md:p-8 rounded-2xl bg-white shadow-soft border border-primary/5">
            <h3 className="font-heading font-semibold text-lg text-primary mb-4">
              Write a review
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="review-name" className="block text-sm font-medium text-primary mb-1">
                  Your name
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Raj K., Mumbai"
                  className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-bg/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Your rating (stars)
                </label>
                <StarInput value={form.stars} onChange={(stars) => setForm((f) => ({ ...f, stars }))} />
              </div>
              <div>
                <label htmlFor="review-quote" className="block text-sm font-medium text-primary mb-1">
                  Your review
                </label>
                <textarea
                  id="review-quote"
                  value={form.quote}
                  onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-bg/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-y"
                />
              </div>
              {message && (
                <p
                  className={`text-sm ${
                    message.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message.text}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="btn-enquire px-6 py-2.5 rounded-xl font-heading font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving...' : 'Submit review'}
              </button>
            </form>
          </div>
        </AnimateIn>

        {/* All reviews – slider on mobile, grid on md+ */}
        {loading ? (
          <p className="text-center text-text/70 py-12">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-text/70 py-12">No reviews yet. Be the first to share your experience!</p>
        ) : (
          <>
            {/* Mobile: one card slider with dots and arrows */}
            <div className="md:hidden">
              <div
                ref={sliderRef}
                className="overflow-hidden select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'pan-y' }}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
                >
                  {reviews.map((r) => (
                    <div key={r.id} className="w-full flex-shrink-0 px-1">
                      <ReviewCard r={r} />
                    </div>
                  ))}
                </div>
              </div>
              {reviews.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setSliderIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                    className="p-2 rounded-full bg-white shadow-soft border border-primary/10 text-primary hover:bg-primary/5 transition-colors"
                    aria-label="Previous review"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex gap-2">
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSliderIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === sliderIndex ? 'bg-accent scale-110' : 'bg-primary/25 hover:bg-primary/40'
                        }`}
                        aria-label={`Go to review ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSliderIndex((i) => (i + 1) % reviews.length)}
                    className="p-2 rounded-full bg-white shadow-soft border border-primary/10 text-primary hover:bg-primary/5 transition-colors"
                    aria-label="Next review"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Desktop: grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <AnimateIn key={r.id} variant="fadeUpScale" delay={120 + i * 50}>
                  <ReviewCard r={r} />
                </AnimateIn>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
