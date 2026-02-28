/**
 * Hotel Reservation page: Left = service info + popular cities, Right = hotel enquiry form.
 * Bottom = Our Other Services (Car Rental, Tours, Guide).
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import AnimateIn from '../components/AnimateIn'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'
import { useContent } from '../context/ContentContext'
import { hasApi, submitHotel } from '../lib/api'

const POPULAR_CITIES = [
  { name: 'Agra', slug: 'agra' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Goa', slug: 'goa' },
  { name: 'Kerala', slug: 'kerala' },
  { name: 'Udaipur', slug: 'udaipur' },
]

const ROOM_OPTIONS = [
  { value: '', label: '-- Select preference --' },
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'luxury', label: 'Luxury / 5-star' },
  { value: 'budget', label: 'Budget / 3-star' },
]

function HotelBuildingIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

const OTHER_SERVICES = [
  { href: '/car-rental', label: 'Car Rental', icon: 'car' },
  { href: '/tours', label: 'Tour Package Booking', icon: 'package' },
  { href: '/booking', state: { service: 'guide' }, label: 'Guide Booking', icon: 'guide' },
]

const FORMSPREE_URL = (id) => `https://formspree.io/f/${id}`

export default function HotelBookingPage() {
  const { hotelsWeOffer } = useContent()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    city: '',
    roomType: '',
    message: '',
  })
  const [submitMsg, setSubmitMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const formspreeId = (import.meta.env.VITE_FORMSPREE_HOTEL_FORM_ID || import.meta.env.VITE_FORMSPREE_FORM_ID || '').trim()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitMsg(null)
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setSubmitMsg({ type: 'error', text: 'Please fill Name, Email and Phone.' })
      return
    }
    if (hasApi()) {
      setSubmitting(true)
      try {
        const { ok } = await submitHotel({
          name: form.name,
          email: form.email,
          phone: form.phone,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: form.guests,
          city: form.city,
          roomType: form.roomType,
          message: form.message,
        })
        if (ok) {
          setForm({ name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', city: '', roomType: '', message: '' })
          setSubmitMsg({ type: 'success', text: 'Thank you! We will get back to you with hotel options shortly.' })
        } else {
          setSubmitMsg({ type: 'error', text: 'Could not send. Please try again or contact us on WhatsApp.' })
        }
      } catch (_) {
        setSubmitMsg({ type: 'error', text: 'Could not send. Please try again or contact us on WhatsApp.' })
      } finally {
        setSubmitting(false)
      }
      return
    }
    if (!formspreeId) {
      setSubmitMsg({ type: 'error', text: 'Form not configured. Please contact us on WhatsApp.' })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_URL(formspreeId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Hotel Reservation: ${form.name} – ${form.city || 'Any'}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: form.guests,
          city: form.city,
          roomType: form.roomType,
          message: form.message,
        }),
      })
      if (res.ok) {
        setForm({ name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', city: '', roomType: '', message: '' })
        setSubmitMsg({ type: 'success', text: 'Thank you! We will get back to you with hotel options shortly.' })
      } else {
        setSubmitMsg({ type: 'error', text: 'Could not send. Please try again or contact us on WhatsApp.' })
      }
    } catch (_) {
      setSubmitMsg({ type: 'error', text: 'Could not send. Please try again or contact us on WhatsApp.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="font-body text-text antialiased bg-bg min-h-screen">
      <SEO
        title="Hotel Reservation"
        description="Book hotels across India with TraverraX—Agra, Jaipur, Delhi, Goa, Kerala & more. Best rates, verified stays. Send your dates and we'll get you the right option."
      />
      <Navbar />
      <main>
        <section className="hotel-hero pt-24 pb-8 md:pt-28 bg-white border-b border-primary/5">
          <div className={CONTAINER_CLASS}>
            <AnimateIn variant="fadeUp">
              <p className="hotel-badge text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-2">
                Reserve with confidence
              </p>
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary">
                Hotel Reservation
              </h1>
              <p className="text-text/80 mt-2 max-w-xl">
                Tell us your city, dates and guests—we’ll suggest the best stays and send you a quote.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className={`${SECTION_PADDING} hotel-section-bg`}>
          <div className={CONTAINER_CLASS}>
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
              <div className="lg:col-span-3 space-y-8">
                <AnimateIn variant="fadeUp">
                  <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em]">Our Service</p>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mt-1">
                    Book Hotels Across India
                  </h2>
                  <span className="inline-block w-12 h-0.5 bg-accent rounded-full mt-3" aria-hidden />
                </AnimateIn>
                <AnimateIn variant="fadeUp" delay={80}>
                  <div className="text-text/90 space-y-4 text-sm md:text-base leading-relaxed">
                    <p>
                      We book verified hotels—from budget stays to luxury—in Agra, Jaipur, Delhi, Goa, Kerala, Udaipur and more. Share your check-in and check-out dates, number of guests and city; we’ll send you options and best available rates with no booking fee.
                    </p>
                    <p>
                      Ideal for tour packages, same-day trips or standalone stays. All enquiries are confirmed over phone or WhatsApp so you have a clear confirmation before travel.
                    </p>
                  </div>
                </AnimateIn>
                <AnimateIn variant="fadeUp" delay={120}>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-4">
                    Popular Destinations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_CITIES.map((city, i) => (
                      <AnimateIn key={city.slug} variant="fadeUpScale" delay={140 + i * 40}>
                        <span className="hotel-pill inline-block px-4 py-2 rounded-xl bg-primary/5 text-primary text-sm font-medium border border-primary/10 cursor-default">
                          {city.name}
                        </span>
                      </AnimateIn>
                    ))}
                  </div>
                </AnimateIn>
                <AnimateIn variant="fadeUp" delay={160}>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-4">
                    Hotels We Offer
                  </h3>
                  <ul className="hotel-offer-card rounded-xl border border-primary/10 bg-white overflow-hidden shadow-soft">
                    {hotelsWeOffer.map((item, i) => (
                      <AnimateIn
                        key={item.label}
                        as="li"
                        variant="fadeUp"
                        delay={180 + i * 60}
                        className={`hotel-offer-item group flex items-center gap-3 px-4 py-3.5 text-primary ${
                          i < hotelsWeOffer.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="hotel-offer-thumb w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-primary/5 shrink-0 border border-primary/10">
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </AnimateIn>
                    ))}
                  </ul>
                </AnimateIn>
              </div>

              <div className="lg:col-span-2">
                <AnimateIn variant="slideLeft" delay={150}>
                  <div className="hotel-form-panel rounded-2xl border border-primary/10 shadow-soft p-6 md:p-8 sticky top-24">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-6">
                      Send Enquiry
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="hb-name" className="block text-sm font-medium text-primary mb-1">Your name</label>
                        <input
                          id="hb-name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="hb-email" className="block text-sm font-medium text-primary mb-1">Email</label>
                        <input
                          id="hb-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <label htmlFor="hb-phone" className="block text-sm font-medium text-primary mb-1">Phone</label>
                        <div className="flex rounded-xl border border-primary/15 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent transition-all duration-200">
                          <span className="flex items-center px-3 bg-primary/5 text-primary text-sm border-r border-primary/15">+91</span>
                          <input
                            id="hb-phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            className="flex-1 px-4 py-2.5 text-primary outline-none min-w-0"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="hb-checkin" className="block text-sm font-medium text-primary mb-1">Check-in date</label>
                        <input
                          id="hb-checkin"
                          name="checkIn"
                          type="date"
                          value={form.checkIn}
                          onChange={handleChange}
                          min={new Date().toISOString().slice(0, 10)}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="hb-checkout" className="block text-sm font-medium text-primary mb-1">Check-out date</label>
                        <input
                          id="hb-checkout"
                          name="checkOut"
                          type="date"
                          value={form.checkOut}
                          onChange={handleChange}
                          min={form.checkIn || new Date().toISOString().slice(0, 10)}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="hb-guests" className="block text-sm font-medium text-primary mb-1">No. of guests</label>
                        <input
                          id="hb-guests"
                          name="guests"
                          type="number"
                          min={1}
                          max={20}
                          value={form.guests}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Adults + children"
                        />
                      </div>
                      <div>
                        <label htmlFor="hb-city" className="block text-sm font-medium text-primary mb-1">City / Destination</label>
                        <input
                          id="hb-city"
                          name="city"
                          type="text"
                          value={form.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="e.g. Agra, Jaipur, Goa"
                        />
                      </div>
                      <div>
                        <label htmlFor="hb-room" className="block text-sm font-medium text-primary mb-1">Room preference</label>
                        <select
                          id="hb-room"
                          name="roomType"
                          value={form.roomType}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                        >
                          {ROOM_OPTIONS.map((o) => (
                            <option key={o.value || 'opt'} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="hb-message" className="block text-sm font-medium text-primary mb-1">Special requests</label>
                        <textarea
                          id="hb-message"
                          name="message"
                          rows={3}
                          value={form.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-y transition-all duration-200"
                          placeholder="e.g. near monument, breakfast included..."
                        />
                      </div>
                      {submitMsg && (
                        <p className={`text-sm ${submitMsg.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                          {submitMsg.text}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="car-submit-btn w-full py-3.5 rounded-xl font-heading font-semibold bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Sending...' : 'SEND ENQUIRY'}
                      </button>
                    </form>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        <section className={`${SECTION_PADDING} bg-bg`}>
          <div className={CONTAINER_CLASS}>
            <AnimateIn variant="fadeUp" className="mb-10">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary">
                Also Check Out
              </h2>
              <p className="text-text/70 mt-2 text-sm">Car hire, tour packages &amp; local guides.</p>
            </AnimateIn>
            <div className="grid md:grid-cols-3 gap-6">
              {OTHER_SERVICES.map((item, i) => (
                <AnimateIn key={item.label} variant="fadeUpScale" delay={100 + i * 80}>
                  <Link
                    to={item.href}
                    state={item.state}
                    className="car-other-card flex flex-col items-center p-8 rounded-2xl bg-white shadow-soft border border-primary/5 text-center"
                  >
                    <div className="car-other-icon w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {item.icon === 'car' && (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 01-2-2V9a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H8z" /></svg>
                      )}
                      {item.icon === 'package' && (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      )}
                      {item.icon === 'guide' && (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      )}
                    </div>
                    <span className="font-heading font-semibold text-primary">{item.label}</span>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
