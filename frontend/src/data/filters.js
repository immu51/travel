/**
 * Filter options and helpers for tours listing.
 * Categories and destinations derived from tour data for consistency.
 */
export const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'family', label: 'Family' },
  { value: 'international', label: 'International' },
]

export const DURATION_OPTIONS = [
  { value: '', label: 'Any Duration' },
  { value: 'same-day', label: 'Same day' },
  { value: 'golden-triangle', label: 'Golden Triangle India Tour' },
  { value: '4-6', label: '4–6 days' },
  { value: '7-10', label: '7–10 days' },
  { value: '11+', label: '11+ days' },
]

export const BUDGET_OPTIONS = [
  { value: '', label: 'Any Budget' },
  { value: '0-25000', label: 'Under ₹25,000' },
  { value: '25000-50000', label: '₹25,000 – ₹50,000' },
  { value: '50000-100000', label: '₹50,000 – ₹1,00,000' },
  { value: '100000+', label: 'Above ₹1,00,000' },
]

/**
 * Parse duration string like "5–7 days", "1 day", or "2D/1N" to min/max days.
 */
export function parseDurationToDays(durationStr) {
  if (!durationStr) return { min: 0, max: 999 }
  const s = String(durationStr)
  const rangeMatch = s.match(/(\d+)\s*[-–]\s*(\d+)\s*day/i)
  if (rangeMatch) return { min: parseInt(rangeMatch[1], 10), max: parseInt(rangeMatch[2], 10) }
  const singleDay = s.match(/(\d+)\s*day/i)
  if (singleDay) {
    const d = parseInt(singleDay[1], 10)
    return { min: d, max: d }
  }
  const dayMatch = s.match(/(\d+)D/i)
  if (dayMatch) {
    const d = parseInt(dayMatch[1], 10)
    return { min: d, max: d }
  }
  return { min: 0, max: 999 }
}

/**
 * Check if tour matches current filters (destination, category, duration range, price range).
 */
export function tourMatchesFilters(tour, filters) {
  const { destination = '', category = '', duration = '' } = filters

  if (destination) {
    const loc = (tour.location || '').toLowerCase()
    const dest = destination.toLowerCase()
    if (!loc.includes(dest)) return false
  }

  if (category) {
    const cats = Array.isArray(tour.category) ? tour.category : (tour.category ? [tour.category] : [])
    if (!cats.map((c) => (c || '').toLowerCase()).includes(category)) return false
  }

  if (duration) {
    if (duration === 'golden-triangle') {
      if (tour.slug !== 'golden-triangle') return false
      return true
    }
    const { min: dMin, max: dMax } = parseDurationToDays(tour.duration)
    if (duration === 'same-day' && (dMin !== 1 || dMax !== 1)) return false
    if (duration === '4-6' && (dMax < 4 || dMin > 6)) return false
    if (duration === '7-10' && (dMax < 7 || dMin > 10)) return false
    if (duration === '11+' && dMax < 11) return false
  }

  return true
}
