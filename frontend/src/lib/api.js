/**
 * Backend API client. Uses VITE_API_URL (no localhost hardcode).
 * When VITE_API_URL is set, use backend for content, forms, reviews; else fallback to localStorage/Formspree.
 */

const BASE = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '')

export function hasApi() {
  return !!BASE
}

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${BASE}${p}`
}

export async function fetchContent() {
  if (!hasApi()) return null
  try {
    const res = await fetch(apiUrl('/api/content'))
    if (!res.ok) return null
    const data = await res.json()
    return typeof data === 'object' && data !== null ? data : {}
  } catch (_) {
    return null
  }
}

export async function saveContent(overrides, token) {
  if (!hasApi() || !token) return false
  try {
    const res = await fetch(apiUrl('/api/content'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(overrides),
    })
    return res.ok
  } catch (_) {
    return false
  }
}

export async function loginWithApi(password) {
  if (!hasApi()) return null
  try {
    const res = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: String(password).trim() }),
    })
    const data = await res.json()
    if (data.ok && data.token) return { ok: true, token: data.token }
    return { ok: false, reason: data.reason || 'invalid' }
  } catch (_) {
    return { ok: false, reason: 'invalid' }
  }
}

export async function submitContact(payload) {
  if (!hasApi()) return { ok: false }
  try {
    const res = await fetch(apiUrl('/api/contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return { ok: res.ok }
  } catch (_) {
    return { ok: false }
  }
}

export async function submitBooking(payload) {
  if (!hasApi()) return { ok: false }
  try {
    const res = await fetch(apiUrl('/api/booking'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return { ok: res.ok }
  } catch (_) {
    return { ok: false }
  }
}

export async function submitHotel(payload) {
  if (!hasApi()) return { ok: false }
  try {
    const res = await fetch(apiUrl('/api/hotel'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return { ok: res.ok }
  } catch (_) {
    return { ok: false }
  }
}

export async function submitCarRental(payload) {
  if (!hasApi()) return { ok: false }
  try {
    const res = await fetch(apiUrl('/api/car-rental'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return { ok: res.ok }
  } catch (_) {
    return { ok: false }
  }
}

export async function fetchReviews() {
  if (!hasApi()) return null
  try {
    const res = await fetch(apiUrl('/api/reviews'))
    if (!res.ok) return null
    const list = await res.json()
    return Array.isArray(list) ? list : []
  } catch (_) {
    return null
  }
}

export async function addReviewApi(payload) {
  if (!hasApi()) return null
  try {
    const res = await fetch(apiUrl('/api/reviews'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return null
    return await res.json()
  } catch (_) {
    return null
  }
}
