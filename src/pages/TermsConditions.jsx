/**
 * Terms & Conditions page. Placeholder content – replace with your legal text.
 */
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'

export default function TermsConditions() {
  return (
    <div className="font-body text-text antialiased bg-bg min-h-screen flex flex-col">
      <SEO title="Terms & Conditions" description="Terms and Conditions for Tour & Travel Agency bookings and services." />
      <Navbar />
      <main className={`flex-1 ${SECTION_PADDING}`}>
        <div className={CONTAINER_CLASS}>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
              Terms & Conditions
            </h1>
            <p className="text-text/80 mb-6">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </p>
            <div className="prose prose-primary max-w-none text-text/90 space-y-4 break-words">
              <p>
                By using our website and submitting a booking enquiry, you agree to these terms. Please read them carefully.
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">Enquiries and bookings</h2>
              <p>
                Submitting a form or contacting us via WhatsApp constitutes an enquiry only. A binding booking is made only when we confirm in writing and you accept our quote. Pricing may vary based on dates, group size, and customization.
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">Payment</h2>
              <p>
                Payment terms will be communicated at the time of booking. We do not require online payment for initial enquiries. Cancellation and refund policies will be shared with your booking confirmation.
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">Responsibility</h2>
              <p>
                We act as a travel agent and coordinate tours with local operators. Travel insurance is recommended. We are not liable for circumstances beyond our control (e.g. weather, political events).
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">Contact</h2>
              <p>
                For questions about these terms, contact us via the details on our website.
              </p>
            </div>
            <p className="mt-10">
              <Link to="/" className="text-accent font-medium hover:underline">← Back to home</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
