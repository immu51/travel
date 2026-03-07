/**
 * Car Rental page: Left = Our Service + Car Rental Service description + Our Travel Fleets (2x2).
 * Right = Hire a Taxi form (teal panel). Bottom = Our Other Services (Hotel, Tour Package, Guide).
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import GSAPAnimateIn from '../components/GSAPAnimateIn'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'
import { hasApi, submitCarRental } from '../lib/api'

const FLEETS = [
  { id: 'sedan', title: 'Sedan 1-2 Person', image: '/images/cars/sedan.jpg', alt: 'Sedan' },
  { id: 'suv', title: 'SUV 3-4 Person', image: '/images/cars/suv.jpg', alt: 'SUV' },
  { id: 'minibus', title: 'Mini Autocar 6-12 Person', image: '/images/cars/minibus.jpg', alt: 'Mini Autocar' },
  { id: 'luxury', title: 'For Luxury Travel', image: '/images/cars/luxury.jpg', alt: 'Luxury' },
]

const VEHICLE_OPTIONS = [
  { value: '', label: '-- Please choose an option --' },
  ...FLEETS.map((f) => ({ value: f.id, label: f.title })),
]

const OTHER_SERVICES = [
  { href: '/hotel-booking', label: 'Hotel Reservation', icon: 'hotel' },
  { href: '/tours', label: 'Tour Package Booking', icon: 'package' },
  { href: '/booking', state: { service: 'guide' }, label: 'Guide Booking', icon: 'guide' },
]

const FORMSPREE_URL = (id) => `https://formspree.io/f/${id}`

export default function CarRentalPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    persons: '',
    vehicleType: '',
    pickup: '',
    drop: '',
    summary: '',
  })
  const [submitMsg, setSubmitMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const formspreeId = (import.meta.env.VITE_FORMSPREE_FORM_ID || '').trim()

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
        const message = [form.pickup, form.drop, form.summary].filter(Boolean).join('\n')
        const { ok } = await submitCarRental({
          name: form.name,
          email: form.email,
          phone: form.phone,
          pickupDate: form.arrivalDate,
          vehicle: form.vehicleType,
          message,
        })
        if (ok) {
          if (formspreeId) {
            fetch(FORMSPREE_URL(formspreeId), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                _subject: `[Car Rental] ${form.name}`,
                name: form.name,
                email: form.email,
                phone: form.phone,
                arrivalDate: form.arrivalDate,
                persons: form.persons,
                vehicleType: form.vehicleType,
                pickup: form.pickup,
                drop: form.drop,
                summary: form.summary,
              }),
            }).catch(() => {})
          }
          setForm({ name: '', email: '', phone: '', arrivalDate: '', persons: '', vehicleType: '', pickup: '', drop: '', summary: '' })
          setSubmitMsg({ type: 'success', text: 'Thank you! We will get back to you shortly.' })
          setSubmitting(false)
          return
        }
        // API failed (e.g. backend/DB down on localhost) – try Formspree if configured
        if (formspreeId) {
          const res = await fetch(FORMSPREE_URL(formspreeId), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              _subject: `Car Rental / Hire a Taxi: ${form.name}`,
              name: form.name,
              email: form.email,
              phone: form.phone,
              arrivalDate: form.arrivalDate,
              persons: form.persons,
              vehicleType: form.vehicleType,
              pickup: form.pickup,
              drop: form.drop,
              summary: form.summary,
            }),
          })
          if (res.ok) {
            setForm({ name: '', email: '', phone: '', arrivalDate: '', persons: '', vehicleType: '', pickup: '', drop: '', summary: '' })
            setSubmitMsg({ type: 'success', text: 'Thank you! We will get back to you shortly.' })
            setSubmitting(false)
            return
          }
        }
        setSubmitMsg({ type: 'error', text: 'Could not send. Please try again or contact us on WhatsApp.' })
      } catch (_) {
        if (formspreeId) {
          try {
            const res = await fetch(FORMSPREE_URL(formspreeId), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                _subject: `Car Rental / Hire a Taxi: ${form.name}`,
                name: form.name,
                email: form.email,
                phone: form.phone,
                arrivalDate: form.arrivalDate,
                persons: form.persons,
                vehicleType: form.vehicleType,
                pickup: form.pickup,
                drop: form.drop,
                summary: form.summary,
              }),
            })
            if (res.ok) {
              setForm({ name: '', email: '', phone: '', arrivalDate: '', persons: '', vehicleType: '', pickup: '', drop: '', summary: '' })
              setSubmitMsg({ type: 'success', text: 'Thank you! We will get back to you shortly.' })
              setSubmitting(false)
              return
            }
          } catch (_) {}
        }
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
          _subject: `Car Rental / Hire a Taxi: ${form.name}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          arrivalDate: form.arrivalDate,
          persons: form.persons,
          vehicleType: form.vehicleType,
          pickup: form.pickup,
          drop: form.drop,
          summary: form.summary,
        }),
      })
      if (res.ok) {
        setForm({ name: '', email: '', phone: '', arrivalDate: '', persons: '', vehicleType: '', pickup: '', drop: '', summary: '' })
        setSubmitMsg({ type: 'success', text: 'Thank you! We will get back to you shortly.' })
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
        title="Car Rental"
        description="TraverraX car rental: Sedan, SUV, Mini Autocar, Luxury cars. Hire a taxi with pickup, drop, and vehicle choice. Book now."
      />
      <Navbar />
      <main>
        {/* Hero strip */}
        <section className="pt-24 pb-8 md:pt-28 bg-white border-b border-primary/5">
          <div className={CONTAINER_CLASS}>
            <GSAPAnimateIn variant="fadeUpStrong" className="space-y-2">
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary">
                Rent a Car or Hire a Cab
              </h1>
              <p className="text-text/80 max-w-xl">
                From city drops to outstation runs—pick your ride, share pickup & drop, we handle the rest.
              </p>
            </GSAPAnimateIn>
          </div>
        </section>

        {/* Two columns: Left = Service + Fleets, Right = Hire a Taxi form */}
        <section className={`${SECTION_PADDING} bg-white`}>
          <div className={CONTAINER_CLASS}>
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
              {/* Left: Our Service + Our Travel Fleets */}
              <div className="lg:col-span-3 space-y-8">
                <GSAPAnimateIn variant="fadeUpStrong">
                  <p className="text-accent font-semibold text-sm uppercase tracking-wide">What we do</p>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mt-1">
                    Cabs &amp; Cars When You Need Them
                  </h2>
                </GSAPAnimateIn>
                <GSAPAnimateIn variant="fadeUp" delay={0.08}>
                  <div className="text-text/90 space-y-4 text-sm md:text-base leading-relaxed">
                    <p>
                      Whether you need a sedan for a meeting, an SUV for a family trip, or a traveller for a group—we line up the right vehicle and a verified driver. All cars are AC, insured, and maintained so your ride is safe and comfortable.
                    </p>
                    <p>
                      We also arrange airport pickups, station drops, and outstation one-way or round trips. Tell us your route and date; we’ll confirm availability and send you a clear quote—no hidden charges.
                    </p>
                  </div>
                </GSAPAnimateIn>
                <GSAPAnimateIn variant="fadeUpScale" delay={0.12} stagger={0.1} staggerChildren=".car-fleet-card-wrap">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-6">
                    Choose Your Ride
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {FLEETS.map((fleet) => (
                      <div key={fleet.id} className="car-fleet-card-wrap">
                        <div className="car-fleet-card group rounded-2xl overflow-hidden bg-bg shadow-soft border border-primary/5 hover:shadow-glass transition-shadow duration-300">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={fleet.image}
                              alt={fleet.alt}
                              loading="lazy"
                              decoding="async"
                              className="car-fleet-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <p className="font-heading font-semibold text-primary text-sm md:text-base mt-2 px-1">
                            {fleet.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GSAPAnimateIn>
              </div>

              {/* Right: Hire a Taxi form - light teal panel */}
              <div className="lg:col-span-2">
                <GSAPAnimateIn variant="fadeUpScale" delay={0.15}>
                  <div className="car-form-panel rounded-2xl bg-[#e8f4f8] border border-primary/10 shadow-soft p-6 md:p-8 sticky top-24">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-6">
                      Get a Quote
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="cr-name" className="block text-sm font-medium text-primary mb-1">Your name</label>
                        <input
                          id="cr-name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="cr-email" className="block text-sm font-medium text-primary mb-1">Your email</label>
                        <input
                          id="cr-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <label htmlFor="cr-phone" className="block text-sm font-medium text-primary mb-1">Your Phone</label>
                        <div className="flex rounded-xl border border-primary/15 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent transition-all duration-200">
                          <span className="flex items-center px-3 bg-primary/5 text-primary text-sm border-r border-primary/15">+91</span>
                          <input
                            id="cr-phone"
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
                        <label htmlFor="cr-date" className="block text-sm font-medium text-primary mb-1">Arrival date</label>
                        <input
                          id="cr-date"
                          name="arrivalDate"
                          type="date"
                          value={form.arrivalDate}
                          onChange={handleChange}
                          min={new Date().toISOString().slice(0, 10)}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="cr-persons" className="block text-sm font-medium text-primary mb-1">No. of person</label>
                        <input
                          id="cr-persons"
                          name="persons"
                          type="number"
                          min={1}
                          max={50}
                          value={form.persons}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Number of persons"
                        />
                      </div>
                      <div>
                        <label htmlFor="cr-vehicle" className="block text-sm font-medium text-primary mb-1">Type of vehicle</label>
                        <select
                          id="cr-vehicle"
                          name="vehicleType"
                          value={form.vehicleType}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                        >
                          {VEHICLE_OPTIONS.map((o) => (
                            <option key={o.value || 'opt'} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="cr-pickup" className="block text-sm font-medium text-primary mb-1">Pick up point</label>
                        <input
                          id="cr-pickup"
                          name="pickup"
                          type="text"
                          value={form.pickup}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Pick up location"
                        />
                      </div>
                      <div>
                        <label htmlFor="cr-drop" className="block text-sm font-medium text-primary mb-1">Drop point</label>
                        <input
                          id="cr-drop"
                          name="drop"
                          type="text"
                          value={form.drop}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          placeholder="Drop location"
                        />
                      </div>
                      <div>
                        <label htmlFor="cr-summary" className="block text-sm font-medium text-primary mb-1">Brief Summary / Special Requirements</label>
                        <textarea
                          id="cr-summary"
                          name="summary"
                          rows={4}
                          value={form.summary}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-primary/15 bg-white text-primary outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-y transition-all duration-200"
                          placeholder="e.g. child seat, luggage, early start..."
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
                        {submitting ? 'Sending...' : 'SUBMIT'}
                      </button>
                    </form>
                  </div>
                </GSAPAnimateIn>
              </div>
            </div>
          </div>
        </section>

        {/* Our Other Services */}
        <section className={`${SECTION_PADDING} bg-bg`}>
          <div className={CONTAINER_CLASS}>
            <GSAPAnimateIn variant="fadeUpStrong" className="mb-10">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary">
                Also Check Out
              </h2>
              <p className="text-text/70 mt-2 text-sm">Hotels, tours &amp; local guides—all in one place.</p>
            </GSAPAnimateIn>
            <GSAPAnimateIn variant="fadeUpScale" stagger={0.12} staggerChildren=".car-other-card-wrap" className="grid md:grid-cols-3 gap-6">
              {OTHER_SERVICES.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  state={item.state}
                  className="car-other-card-wrap car-other-card flex flex-col items-center p-8 rounded-2xl bg-white shadow-soft border border-primary/5 text-center hover:shadow-glass hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="car-other-icon w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {item.icon === 'hotel' && (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
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
              ))}
            </GSAPAnimateIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
