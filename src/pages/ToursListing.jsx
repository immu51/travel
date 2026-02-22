/**
 * Tours listing page: filters (Destination, Price, Duration, Category) and professional tour cards.
 * Includes same day tours from Delhi; filter by duration "Same day" or "Golden Triangle India Tour".
 * Route: /tours
 */
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'
import { useContent } from '../context/ContentContext'
import { CATEGORIES, DURATION_OPTIONS, tourMatchesFilters } from '../data/filters'
import TourCard from '../components/TourCard'
import AnimateIn from '../components/AnimateIn'

function getDestinationsFromTours(tours) {
  const set = new Set()
  tours.forEach((t) => t.location && set.add(t.location))
  return [{ value: '', label: 'All Destinations' }, ...Array.from(set).sort().map((d) => ({ value: d, label: d }))]
}

/** Same-day tours in listing shape (location, isSameDay, category). */
function sameDayForListing(sameDayTours) {
  return sameDayTours.map((t) => ({
    ...t,
    location: t.destination,
    isSameDay: true,
    category: ['family'],
  }))
}

export default function ToursListing() {
  const { tours, sameDayTours } = useContent()
  const allToursForListing = useMemo(
    () => [...tours, ...sameDayForListing(sameDayTours)],
    [tours, sameDayTours]
  )

  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    destination: searchParams.get('destination') || '',
    category: searchParams.get('category') || '',
    duration: searchParams.get('duration') || '',
  })

  useEffect(() => {
    setFilters((prev) => ({
      destination: searchParams.get('destination') || prev.destination,
      category: searchParams.get('category') || prev.category,
      duration: searchParams.get('duration') || prev.duration,
    }))
  }, [searchParams])

  const filteredTours = useMemo(() => {
    return allToursForListing.filter((tour) => tourMatchesFilters(tour, filters))
  }, [allToursForListing, filters])

  const destinations = useMemo(() => getDestinationsFromTours(allToursForListing), [allToursForListing])

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <SEO
        title="India Tour Packages"
        description="Explore our India tour packages: Golden Triangle, Rajasthan, Kerala, Goa, Himachal, Ladakh. Family, honeymoon & adventure trips. Customized itineraries."
      />
      <main className={`${SECTION_PADDING} bg-bg min-h-screen`}>
        <div className={CONTAINER_CLASS}>
          <AnimateIn variant="fadeUp" className="text-center mb-4">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary">
              India Tour Packages
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={100} className="text-center mb-10">
            <p className="text-text/80 max-w-2xl mx-auto">
              Filter by destination, duration, or category. Contact us for custom quotes.
            </p>
          </AnimateIn>

          {/* Filters – glassmorphism */}
          <AnimateIn variant="fadeUp" delay={150} className="mb-10">
            <div className="rounded-2xl p-4 sm:p-6 bg-white/80 backdrop-blur border border-primary/10 shadow-soft">
              <h2 className="font-heading font-semibold text-lg text-primary mb-4">Filters</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="filter-destination" className="block text-sm font-medium text-primary mb-1.5">
                    Destination
                  </label>
                  <select
                    id="filter-destination"
                    value={filters.destination}
                    onChange={(e) => updateFilter('destination', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-primary/20 bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none text-primary"
                  >
                    {destinations.map((d) => (
                      <option key={d.value || 'all'} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filter-category" className="block text-sm font-medium text-primary mb-1.5">
                    Category
                  </label>
                  <select
                    id="filter-category"
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-primary/20 bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none text-primary"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value || 'all'} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filter-duration" className="block text-sm font-medium text-primary mb-1.5">
                    Duration
                  </label>
                  <select
                    id="filter-duration"
                    value={filters.duration}
                    onChange={(e) => updateFilter('duration', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-primary/20 bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none text-primary"
                  >
                    {DURATION_OPTIONS.map((o) => (
                      <option key={o.value || 'any'} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-sm text-text/70 mt-3">
                Showing {filteredTours.length} package{filteredTours.length !== 1 ? 's' : ''}
              </p>
            </div>
          </AnimateIn>

          {/* Tour cards grid */}
          {filteredTours.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-white/60 border border-primary/10">
              <p className="text-text/80 mb-4">No packages match your filters.</p>
              <button
                type="button"
                onClick={() => setFilters({ destination: '', category: '', duration: '' })}
                className="text-accent font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredTours.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} index={i} isSameDay={tour.isSameDay} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
