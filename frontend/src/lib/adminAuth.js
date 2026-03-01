/**
 * Admin authentication: when VITE_API_URL is set, uses backend login (JWT);
 * otherwise SHA-256 + local token. Set VITE_ADMIN_PASSWORD_HASH for local-only auth.
 */

import { hasApi, loginWithApi } from './api.js'

const ADMIN_TOKEN_KEY = 'traverrax_admin_token'
const TOKEN_PREFIX = 'admin_'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Returns: { ok: true } on success, { ok: false, reason: 'invalid' } on wrong password,
 * { ok: false, reason: 'not_configured' } when no API and VITE_ADMIN_PASSWORD_HASH not set.
 */
export async function verifyAdminPassword(password) {
  if (hasApi()) {
    const result = await loginWithApi(password)
    if (!result) return { ok: false, reason: 'invalid' }
    if (result.ok && result.token) {
      setAdminToken(result.token)
      return { ok: true }
    }
    return { ok: false, reason: result.reason || 'invalid' }
  }
  const storedHash = (import.meta.env.VITE_ADMIN_PASSWORD_HASH || '').trim().toLowerCase()
  if (!storedHash) return { ok: false, reason: 'not_configured' }
  const inputHash = (await sha256(String(password).trim())).toLowerCase()
  if (inputHash !== storedHash) return { ok: false, reason: 'invalid' }
  setAdminToken()
  return { ok: true }
}

/** Pass JWT string when using API; no arg for local-only token. */
export function setAdminToken(token) {
  const value = token != null ? token : TOKEN_PREFIX + btoa(Date.now().toString(36))
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, value)
    return true
  } catch (_) {
    return false
  }
}

export function getAdminToken() {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY)
  } catch (_) {
    return null
  }
}

export function removeAdminToken() {
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
  } catch (_) {}
}

/** Returns true if the JWT is expired (or invalid). JWTs have payload.exp in seconds. */
function isJwtExpired(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    const exp = payload.exp
    if (typeof exp !== 'number') return false
    return exp < Date.now() / 1000
  } catch (_) {
    return true
  }
}

export function isAdminAuthenticated() {
  const token = getAdminToken()
  if (!token) return false
  if (hasApi()) {
    if (isJwtExpired(token)) {
      removeAdminToken()
      return false
    }
    return true
  }
  return token.startsWith(TOKEN_PREFIX)
}
