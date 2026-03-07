/**
 * Send form submission notification email to site owner (admin).
 * Uses Resend if RESEND_API_KEY is set, else Gmail SMTP.
 * Recipient: FORM_SUBMISSION_EMAIL / CONTACT_FORM_EMAIL / ADMIN_EMAIL env, or first Admin's email from DB.
 */
import nodemailer from 'nodemailer'

const RESEND_API_KEY = (process.env.RESEND_API_KEY || '').trim()
const RESEND_FROM = (process.env.RESEND_FROM || 'TraverraX <onboarding@resend.dev>').trim()
const GMAIL_USER = (process.env.GMAIL_USER || '').trim()
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').trim()
const FORM_SUBMISSION_EMAIL = (process.env.FORM_SUBMISSION_EMAIL || process.env.CONTACT_FORM_EMAIL || process.env.ADMIN_EMAIL || '').trim()

/** Get recipient: env first, else first admin's email from DB. */
async function getFormRecipient(to) {
  const fromEnv = (to || FORM_SUBMISSION_EMAIL || '').trim()
  if (fromEnv) return fromEnv
  try {
    const Admin = (await import('../models/Admin.js')).default
    const admin = await Admin.findOne().select('email').lean()
    return (admin?.email || '').trim()
  } catch (_) {
    return ''
  }
}

/**
 * Send email. Prefer Resend, fallback to Gmail. No-op if no transport or no to address.
 * @param {string} to - Recipient email (optional; uses env or admin email from DB)
 * @param {string} subject - Subject line
 * @param {string} html - HTML body
 * @returns {Promise<boolean>} true if sent, false if skipped/failed (logs error)
 */
export async function sendFormEmail(to, subject, html) {
  const recipient = await getFormRecipient(to)
  if (!recipient) {
    console.warn('Form email skipped: set FORM_SUBMISSION_EMAIL (or ADMIN_EMAIL) in .env or add an Admin with email in DB')
    return false
  }

  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: [recipient],
          subject,
          html,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        console.error('Resend form email error:', res.status, data?.message || data?.msg)
        return false
      }
      return true
    } catch (err) {
      console.error('Resend form email error:', err.message)
      return false
    }
  }

  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    try {
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
        from: `"TraverraX" <${GMAIL_USER}>`,
        to: recipient,
        subject,
        html,
        text: html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      })
      return true
    } catch (err) {
      console.error('Gmail form email error:', err.message)
      return false
    }
  }

  console.warn('Form email skipped: set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD and FORM_SUBMISSION_EMAIL')
  return false
}

/** Build simple HTML for a form submission (name-value list). */
export function formBodyHtml(fields) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600;">${escapeHtml(k)}</td><td style="padding:6px 0;">${escapeHtml(String(v).trim())}</td></tr>`)
    .join('')
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;font-size:14px;line-height:1.5;color:#333;">
  <p>New form submission from TraverraX website:</p>
  <table style="border-collapse:collapse;">${rows}</table>
  <p style="margin-top:16px;color:#666;font-size:12px;">— TraverraX</p>
</body>
</html>`
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Formspree form ID for fallback when Resend/Gmail is not configured. Set FORMSPREE_FORM_ID (and optionally FORMSPREE_HOTEL_FORM_ID) in Railway. */
const FORMSPREE_FORM_ID = (process.env.FORMSPREE_FORM_ID || '').trim()
const FORMSPREE_HOTEL_FORM_ID = (process.env.FORMSPREE_HOTEL_FORM_ID || '').trim()

/**
 * When sendFormEmail fails, forward submission to Formspree so admin still gets email.
 * @param {string} formId - Formspree form ID (e.g. mdalwlnz)
 * @param {object} payload - Flat object of field names and values (e.g. { name, email, _subject, ... })
 * @returns {Promise<boolean>}
 */
export async function forwardToFormspree(formId, payload) {
  if (!formId || !payload || typeof payload !== 'object') {
    if (!formId) console.warn('[Formspree] Forward skipped: set FORMSPREE_FORM_ID on Railway (e.g. mdalwlnz)')
    return false
  }
  try {
    const url = `https://formspree.io/f/${formId}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text()
      console.warn('[Formspree] Forward failed:', res.status, formId, text?.slice(0, 100))
      return false
    }
    console.log('[Formspree] Forward OK:', formId, payload._subject || '')
    return true
  } catch (err) {
    console.warn('[Formspree] Forward error:', err?.message)
    return false
  }
}

export function getFormspreeFormIds() {
  return { carAndContact: FORMSPREE_FORM_ID || null, hotel: (FORMSPREE_HOTEL_FORM_ID || FORMSPREE_FORM_ID || '').trim() || null }
}
