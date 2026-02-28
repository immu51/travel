/**
 * Use on routes that require MongoDB. Returns 503 if DB is not connected.
 */
import mongoose from 'mongoose'

export function requireDb(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database not available' })
  }
  next()
}
