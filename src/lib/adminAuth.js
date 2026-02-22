/**
 * Admin authentication: SHA-256 password hash verification, token in localStorage.
 * Set VITE_ADMIN_PASSWORD_HASH in .env (generate with: echo -n "yourPassword" | sha256sum).
 */

const ADMIN_TOKEN_KEY = 'traverrax_admin_token'
const TOKEN_PREFIX = 'admin_'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyAdminPassword(password) {
  const storedHash = (import.meta.env.VITE_ADMIN_PASSWORD_HASH || '').trim().toLowerCase()
  if (!storedHash) return false
  const inputHash = await sha256(String(password).trim())
  return inputHash === storedHash.toLowerCase()
}

export function setAdminToken() {
  const token = TOKEN_PREFIX + btoa(Date.now().toString(36))
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, token)
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

export function isAdminAuthenticated() {
  const token = getAdminToken()
  return !!token && token.startsWith(TOKEN_PREFIX)
}
