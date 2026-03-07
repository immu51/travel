/**
 * Simple in-memory rate limit to prevent brute-force on login and OTP.
 * Resets on server restart. For production at scale, use Redis or similar.
 */
const store = new Map()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 10

function getKey(ip, prefix) {
  return `${prefix}:${ip}`
}

export function rateLimitLogin(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const key = getKey(ip, 'login')
  const now = Date.now()
  let entry = store.get(key)
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    entry = { count: 0, windowStart: now }
    store.set(key, entry)
  }
  entry.count += 1
  if (entry.count > MAX_ATTEMPTS) {
    return res.status(429).json({ ok: false, reason: 'too_many_attempts', message: 'Too many attempts. Try again later.' })
  }
  next()
}

export function rateLimitSendOtp(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const key = getKey(ip, 'sendOtp')
  const now = Date.now()
  let entry = store.get(key)
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    entry = { count: 0, windowStart: now }
    store.set(key, entry)
  }
  entry.count += 1
  if (entry.count > 5) {
    return res.status(429).json({ ok: false, message: 'Too many OTP requests. Try again later.' })
  }
  next()
}
