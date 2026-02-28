/**
 * Content overrides: load/save from localStorage or backend API (when VITE_API_URL is set).
 */

import { hasApi, fetchContent, saveContent } from './api.js'

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

/** Load from API when configured; returns null if API not used or request failed. */
export async function loadOverridesFromApi() {
  if (!hasApi()) return null
  return fetchContent()
}

export function saveOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
    return true
  } catch (_) {
    return false
  }
}

/** Save to API when configured; returns true if saved, false otherwise. */
export async function saveOverridesToApi(overrides, token) {
  if (!hasApi() || !token) return false
  return saveContent(overrides, token)
}

export function getEmptyOverrides() {
  return {
    heroImages: null,
    tours: {},
    sameDayTours: {},
    hotelsWeOffer: null,
  }
}
