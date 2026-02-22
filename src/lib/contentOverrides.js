/**
 * Content overrides: load/save from localStorage. Admin edits merge over defaults.
 */

const STORAGE_KEY = 'traverrax_content_overrides'

export function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch (_) {
    return {}
  }
}

export function saveOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
    return true
  } catch (_) {
    return false
  }
}

export function getEmptyOverrides() {
  return {
    heroImages: null,
    tours: {},
    sameDayTours: {},
    hotelsWeOffer: null,
  }
}
