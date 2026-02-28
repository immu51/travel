/**
 * Professional booking form: Name, Email, Phone, Travel date, Number of travelers, Message.
 * Submits to backend when VITE_API_URL is set, else Formspree when VITE_FORMSPREE_FORM_ID is set.
 */
import { useState } from 'react'
import { hasApi, submitBooking } from '../lib/api'

const FORMSPREE_URL = (id) => `https://formspree.io/f/${id}`

const initialValues = {
  name: '',
  email: '',
  phone: '',
  travelDate: '',
  travelers: '',
  message: '',
}

function validate(values) {
  const err = {}
  if (!values.name.trim()) err.name = 'Name is required'
  if (!values.email.trim()) err.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) err.email = 'Enter a valid email'
  if (values.phone.trim() && !/^[\d\s+-]{10,}$/.test(values.phone.replace(/\s/g, '')))
    err.phone = 'Enter a valid phone number'
  if (!values.travelDate.trim()) err.travelDate = 'Travel date is required'
  const n = parseInt(values.travelers, 10)
  if (!values.travelers.trim()) err.travelers = 'Number of travelers is required'
  else if (isNaN(n) || n < 1 || n > 50) err.travelers = 'Enter 1–50'
  if (!values.message.trim()) err.message = 'Message is required'
  return err
}

export default function BookingForm({ defaultTour = '', onSuccess }) {
  const [form, setForm] = useState({ ...initialValues, message: defaultTour ? `I'm interested in: ${defaultTour}\n\n` : '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const formspreeId = (import.meta.env.VITE_FORMSPREE_FORM_ID || '').trim()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate(form)
    if (Object.keys(err).length) {
      setErrors(err)
      return
    }
    setErrors({})

    if (hasApi()) {
      setSubmitting(true)
      try {
        const { ok } = await submitBooking({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || '',
          travelDate: form.travelDate.trim(),
          travelers: form.travelers.trim(),
          message: form.message.trim(),
        })
        if (ok) {
          setForm({ ...initialValues })
          setSuccess(true)
          onSuccess?.()
        } else {
          setErrors({ form: 'Could not send. Please try again or contact us on WhatsApp.' })
        }
      } catch (_) {
        setErrors({ form: 'Could not send. Please try again or contact us on WhatsApp.' })
      } finally {
        setSubmitting(false)
      }
      return
    }

    if (!formspreeId) {
      setErrors({ form: 'Booking form not configured. Please contact us on WhatsApp.' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_URL(formspreeId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Booking enquiry: ${form.name} – ${form.travelDate}`,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || '(not provided)',
          travelDate: form.travelDate.trim(),
          travelers: form.travelers.trim(),
          message: form.message.trim(),
        }),
      })
      if (res.ok) {
        setForm({ ...initialValues })
        setSuccess(true)
        onSuccess?.()
      } else {
        setErrors({ form: res.status === 422 ? 'Invalid form or limit reached. Try again later or contact us on WhatsApp.' : 'Could not send. Please try again or contact us on WhatsApp.' })
      }
    } catch (_) {
      setErrors({ form: 'Could not send. Please try again or contact us on WhatsApp.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-white border border-primary/10 shadow-soft p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading font-bold text-2xl text-primary mb-2">Request received</h2>
          <p className="text-text/90 mb-6">
            Thank you! We will get back to you shortly with a custom quote and availability.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="text-accent font-semibold hover:underline"
          >
            Send another enquiry
          </button>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="booking-name" className="block text-sm font-medium text-primary mb-1.5">
          Name *
        </label>
        <input
          id="booking-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20 focus:ring-accent/20 focus:border-accent'
          }`}
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="booking-email" className="block text-sm font-medium text-primary mb-1.5">
          Email *
        </label>
        <input
          id="booking-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20 focus:ring-accent/20 focus:border-accent'
          }`}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="booking-phone" className="block text-sm font-medium text-primary mb-1.5">
          Phone *
        </label>
        <input
          id="booking-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20 focus:ring-accent/20 focus:border-accent'
          }`}
        />
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="booking-date" className="block text-sm font-medium text-primary mb-1.5">
          Travel date *
        </label>
        <input
          id="booking-date"
          name="travelDate"
          type="date"
          value={form.travelDate}
          onChange={handleChange}
          min={new Date().toISOString().slice(0, 10)}
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            errors.travelDate ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20 focus:ring-accent/20 focus:border-accent'
          }`}
        />
        {errors.travelDate && <p className="text-red-600 text-sm mt-1">{errors.travelDate}</p>}
      </div>
      <div>
        <label htmlFor="booking-travelers" className="block text-sm font-medium text-primary mb-1.5">
          Number of travelers *
        </label>
        <input
          id="booking-travelers"
          name="travelers"
          type="number"
          min={1}
          max={50}
          value={form.travelers}
          onChange={handleChange}
          placeholder="e.g. 2"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
            errors.travelers ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20 focus:ring-accent/20 focus:border-accent'
          }`}
        />
        {errors.travelers && <p className="text-red-600 text-sm mt-1">{errors.travelers}</p>}
      </div>
      <div>
        <label htmlFor="booking-message" className="block text-sm font-medium text-primary mb-1.5">
          Message *
        </label>
        <textarea
          id="booking-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your trip: preferred tour, dates, special requests..."
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
            errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20 focus:ring-accent/20 focus:border-accent'
          }`}
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </div>
      {errors.form && (
        <p className="text-red-600 text-sm bg-red-50 rounded-xl p-3">{errors.form}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 px-6 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-soft hover:shadow-glass"
      >
        {submitting ? 'Sending...' : 'Send enquiry'}
      </button>
    </form>
  )
}
