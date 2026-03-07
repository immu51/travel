import { Router } from 'express'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { signToken } from '../middleware/auth.js'
import { rateLimitLogin } from '../middleware/rateLimit.js'
import AdminSettings from '../models/AdminSettings.js'

const router = Router()
const ADMIN_HASH_ENV = (process.env.ADMIN_PASSWORD_HASH || '').trim().toLowerCase()
const RECOVERY_EMAIL = (process.env.ADMIN_RECOVERY_EMAIL || '').trim()
const GMAIL_USER = (process.env.GMAIL_USER || '').trim()
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').trim()

// In-memory OTP store: email -> { otp, expiresAt }
const otpStore = new Map()
const OTP_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex')
}

function generateOtp() {
  return String(crypto.randomInt(100000, 999999))
}

function maskEmail(email) {
  if (!email || !email.includes('@')) return ''
  const [local, domain] = email.split('@')
  if (local.length <= 2) return local[0] + '***@' + domain
  return local.slice(0, 2) + '***@' + domain
}

/** GET /api/auth/recovery-email – returns masked recovery email for display */
router.get('/recovery-email', (req, res) => {
  if (!RECOVERY_EMAIL) {
    return res.json({ ok: false, reason: 'not_configured' })
  }
  res.json({ ok: true, email: maskEmail(RECOVERY_EMAIL) })
})

/** POST /api/auth/forgot-password – send OTP to recovery email */
router.post('/forgot-password', async (req, res) => {
  if (!RECOVERY_EMAIL || !GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.json({ ok: false, reason: 'not_configured' })
  }
  const otp = generateOtp()
  otpStore.set(RECOVERY_EMAIL.toLowerCase(), { otp, expiresAt: Date.now() + OTP_EXPIRY_MS })

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
    await transporter.sendMail({
      from: `"TraverraX Admin" <${GMAIL_USER}>`,
      to: RECOVERY_EMAIL,
      subject: 'TraverraX Admin – Password reset OTP',
      text: `Your one-time password (OTP) for admin password reset is: ${otp}\n\nIt is valid for 10 minutes. If you did not request this, ignore this email.`,
      html: `<p>Your one-time password (OTP) for admin password reset is: <strong>${otp}</strong></p><p>It is valid for 10 minutes.</p><p>If you did not request this, ignore this email.</p>`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Forgot password email error:', err.message)
    otpStore.delete(RECOVERY_EMAIL.toLowerCase())
    res.json({ ok: false, reason: 'email_failed' })
  }
})

/** POST /api/auth/verify-otp-reset – verify OTP and set new password */
// Client sends only otp + newPassword (plain). All hashing & storage done here on server.
router.post('/verify-otp-reset', async (req, res) => {
  const { otp, newPassword } = req.body || {}
  const otpStr = String(otp || '').trim()
  const newPass = String(newPassword || '').trim()
  if (!otpStr || !newPass) {
    return res.status(400).json({ ok: false, reason: 'invalid' })
  }
  if (!RECOVERY_EMAIL) {
    return res.json({ ok: false, reason: 'not_configured' })
  }

  const key = RECOVERY_EMAIL.toLowerCase()
  const stored = otpStore.get(key)
  if (!stored) {
    return res.json({ ok: false, reason: 'otp_expired' })
  }
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(key)
    return res.json({ ok: false, reason: 'otp_expired' })
  }
  if (stored.otp !== otpStr) {
    return res.json({ ok: false, reason: 'invalid_otp' })
  }

  otpStore.delete(key)
  const newHash = sha256(newPass).toLowerCase()

  try {
    await AdminSettings.findOneAndUpdate(
      { key: 'main' },
      { $set: { passwordHash: newHash } },
      { upsert: true, new: true }
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('Verify OTP reset error:', err.message)
    res.json({ ok: false, reason: 'update_failed' })
  }
})

/** POST /api/auth/login – password check: DB hash first, then env */
router.post('/login', rateLimitLogin, async (req, res) => {
  const password = (req.body.password || '').trim()
  if (!password) {
    return res.status(400).json({ ok: false, reason: 'invalid' })
  }
  const inputHash = sha256(password).toLowerCase()

  try {
    const settings = await AdminSettings.findOne({ key: 'main' }).lean()
    const hashToUse = settings?.passwordHash
      ? settings.passwordHash.toLowerCase()
      : ADMIN_HASH_ENV
    if (!hashToUse) {
      return res.json({ ok: false, reason: 'not_configured' })
    }
    if (inputHash !== hashToUse) {
      return res.json({ ok: false, reason: 'invalid' })
    }
    const token = signToken({ sub: 'admin' })
    res.json({ ok: true, token })
  } catch (err) {
    if (err.name === 'MongoServerError' || err.message?.includes('MongoDB')) {
      const hashToUse = ADMIN_HASH_ENV
      if (!hashToUse) return res.json({ ok: false, reason: 'not_configured' })
      if (inputHash !== hashToUse) return res.json({ ok: false, reason: 'invalid' })
      const token = signToken({ sub: 'admin' })
      return res.json({ ok: true, token })
    }
    throw err
  }
})

export default router
