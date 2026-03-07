import crypto from 'crypto'
import dns from 'dns'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import Admin from '../models/Admin.js'
import AdminSettings from '../models/AdminSettings.js'

// Prefer IPv4 so Gmail SMTP works on Railway (IPv6 can be ENETUNREACH)
dns.setDefaultResultOrder('ipv4first')

const OTP_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes
const BCRYPT_ROUNDS = 10

const GMAIL_USER = (process.env.GMAIL_USER || '').trim()
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').trim()
const RESEND_API_KEY = (process.env.RESEND_API_KEY || '').trim()
const RESEND_FROM = (process.env.RESEND_FROM || 'TraverraX <onboarding@resend.dev>').trim()

function generateOtp() {
  return String(crypto.randomInt(100000, 999999))
}

/** Send OTP email via Resend (HTTP API – works on Railway when SMTP times out). */
async function sendOtpViaResend(to, otp) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [to],
      subject: 'TraverraX Admin – Password reset OTP',
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong>.</p><p>Valid for 5 minutes.</p><p>If you did not request this, ignore this email.</p>`,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || data?.msg || `Resend ${res.status}`)
  return data
}

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex')
}

/**
 * POST /api/admin/send-otp
 * Body: { email }
 * Check admin exists by email; generate OTP, save, send email. Never return OTP.
 */
export async function sendOtp(req, res) {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase()
    if (!email) {
      return res.status(400).json({ ok: false, message: 'Email is required' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(404).json({ ok: false, message: 'Admin not found with this email' })
    }

    const otp = generateOtp()
    admin.resetOtp = otp
    admin.resetOtpExpiry = new Date(Date.now() + OTP_EXPIRY_MS)
    await admin.save()

    if (RESEND_API_KEY) {
      await sendOtpViaResend(email, otp)
      return res.status(200).json({ ok: true, message: 'OTP sent to your email' })
    }

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      return res.status(503).json({ ok: false, message: 'Email service not configured. Set RESEND_API_KEY (recommended on Railway) or GMAIL_USER + GMAIL_APP_PASSWORD.' })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      connectionTimeout: 15000,
      tls: { servername: 'smtp.gmail.com', rejectUnauthorized: true },
    })
    await transporter.sendMail({
      from: `"TraverraX Admin" <${GMAIL_USER}>`,
      to: email,
      subject: 'TraverraX Admin – Password reset OTP',
      text: `Your OTP for password reset is: ${otp}. Valid for 5 minutes. If you did not request this, ignore this email.`,
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong>.</p><p>Valid for 5 minutes.</p><p>If you did not request this, ignore this email.</p>`,
    })

    return res.status(200).json({ ok: true, message: 'OTP sent to your email' })
  } catch (err) {
    console.error('sendOtp error:', err.message, err.code || '')
    const safeMsg = err.code === 'EAUTH' ? 'Invalid Gmail user or app password.' : err.message || 'Failed to send OTP. Check Railway logs.'
    return res.status(500).json({ ok: false, message: safeMsg })
  }
}

/**
 * POST /api/admin/verify-otp
 * Body: { email, otp }
 * Check admin exists, OTP matches, not expired.
 */
export async function verifyOtp(req, res) {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase()
    const otp = String(req.body?.otp || '').trim()
    if (!email || !otp) {
      return res.status(400).json({ ok: false, message: 'Email and OTP are required' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(404).json({ ok: false, message: 'Admin not found' })
    }
    if (!admin.resetOtp || !admin.resetOtpExpiry) {
      return res.status(400).json({ ok: false, message: 'No OTP requested or expired' })
    }
    if (admin.resetOtp !== otp) {
      return res.status(400).json({ ok: false, message: 'Invalid OTP' })
    }
    if (new Date() > new Date(admin.resetOtpExpiry)) {
      return res.status(400).json({ ok: false, message: 'OTP expired' })
    }

    return res.status(200).json({ ok: true, message: 'OTP verified' })
  } catch (err) {
    console.error('verifyOtp error:', err.message)
    return res.status(500).json({ ok: false, message: 'Verification failed' })
  }
}

/**
 * POST /api/admin/reset-password
 * Body: { email, newPassword }
 * Hash with bcrypt (salt 10), update Admin; clear resetOtp/resetOtpExpiry.
 * Also update AdminSettings.passwordHash (SHA-256) so existing login still works.
 */
export async function resetPassword(req, res) {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase()
    const newPassword = String(req.body?.newPassword || '').trim()
    if (!email || !newPassword) {
      return res.status(400).json({ ok: false, message: 'Email and new password are required' })
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ ok: false, message: 'Password must be at least 8 characters' })
    }
    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return res.status(400).json({ ok: false, message: 'Password must contain at least one letter and one number' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(404).json({ ok: false, message: 'Admin not found' })
    }
    if (!admin.resetOtp || !admin.resetOtpExpiry) {
      return res.status(400).json({ ok: false, message: 'Please verify OTP first' })
    }
    if (new Date() > new Date(admin.resetOtpExpiry)) {
      return res.status(400).json({ ok: false, message: 'OTP expired. Request a new one.' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)
    admin.password = hashedPassword
    admin.resetOtp = ''
    admin.resetOtpExpiry = null
    await admin.save()

    // Keep existing login (password-only, SHA-256) working
    const sha256Hash = sha256(newPassword).toLowerCase()
    await AdminSettings.findOneAndUpdate(
      { key: 'main' },
      { $set: { passwordHash: sha256Hash } },
      { upsert: true }
    )

    return res.status(200).json({ ok: true, message: 'Password reset successfully' })
  } catch (err) {
    console.error('resetPassword error:', err.message)
    return res.status(500).json({ ok: false, message: 'Failed to reset password' })
  }
}
