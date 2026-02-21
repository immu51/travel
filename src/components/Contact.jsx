import { useState } from 'react'
import { CITY_NAME, PHONE, EMAIL, ADDRESS } from '../constants'
import AnimateIn from './AnimateIn'

const FORMSPREE_URL = (id) => `https://formspree.io/f/${id}`

export default function Contact() {
  const [contactMsg, setContactMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const phone = (form.phone?.value || '').trim()
    const message = form.message.value.trim()
    if (!name || !email || !message) {
      setContactMsg({ type: 'error', text: 'Please fill in all required fields.' })
      return
    }

    if (formspreeId) {
      setSubmitting(true)
      setContactMsg(null)
      try {
        const res = await fetch(FORMSPREE_URL(formspreeId), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message }),
        })
        if (res.ok) {
          setContactMsg({
            type: 'success',
            text: 'Thank you! Your message has been sent. We will get back to you soon.',
          })
          form.reset()
        } else {
          setContactMsg({ type: 'error', text: 'Could not send message. Please try again or contact us on WhatsApp.' })
        }
      } catch (_) {
        setContactMsg({ type: 'error', text: 'Could not send message. Please try again or contact us on WhatsApp.' })
      } finally {
        setSubmitting(false)
      }
      return
    }

    setContactMsg({
      type: 'success',
      text: 'Thank you! We will get back to you soon. You can also reach us on WhatsApp for faster response.',
    })
    form.reset()
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fadeUp" className="text-center mb-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary">
            Contact Our Travel Agency in {CITY_NAME}
          </h2>
        </AnimateIn>
        <AnimateIn variant="fadeUp" delay={100} className="text-center mb-16">
          <p className="text-text/80 max-w-2xl mx-auto">
            Looking for affordable India tour packages? Contact our trusted travel experts today to plan your perfect
            vacation.
          </p>
        </AnimateIn>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <AnimateIn variant="slideRight">
          <div className="card-glass card-premium rounded-card p-8">
            <h3 className="font-heading font-semibold text-xl text-primary mb-6">Send us a message</h3>
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-card border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-card border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-card border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-card border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your travel plans..."
                />
              </div>
              {contactMsg && (
                <div className={`form-message ${contactMsg.type}`}>{contactMsg.text}</div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-primary font-semibold py-3.5 rounded-card hover:bg-[#e8914a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          </AnimateIn>
          <AnimateIn variant="slideLeft" delay={150}>
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-card bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary mb-1">Address</h3>
                  <p className="text-text/80">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-card bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary mb-1">Phone</h3>
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-text/80 hover:text-accent transition-colors">
                    {PHONE}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-card bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary mb-1">Email</h3>
                  <a href={`mailto:${EMAIL}`} className="text-text/80 hover:text-accent transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-card overflow-hidden shadow-soft aspect-video bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.676816762!2d72.8397!3d19.1334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA4JzAwLjIiTiA3MsKwNTAnMjIuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Travel Agency Location - ${CITY_NAME}`}
              />
            </div>
          </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
