/**
 * Privacy Policy page. Placeholder content – replace with your legal text.
 */
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'

export default function PrivacyPolicy() {
  return (
    <div className="font-body text-text antialiased bg-bg min-h-screen flex flex-col">
      <SEO title="Privacy Policy" description="Privacy Policy for Tour & Travel Agency. How we collect, use and protect your data." />
      <Navbar />
      <main className={`flex-1 ${SECTION_PADDING}`}>
        <div className={CONTAINER_CLASS}>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
              Privacy Policy
            </h1>
            <p className="text-text/80 mb-6">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </p>
            <div className="prose prose-primary max-w-none text-text/90 space-y-4 break-words">
              <p>
                We respect your privacy. This policy describes how we collect, use, and protect your information when you use our website or contact us for tour bookings.
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">Information we collect</h2>
              <p>
                When you fill out our contact or booking form, we collect your name, email, phone number, travel date, number of travelers, and message. We use this only to respond to your enquiry and provide a custom quote.
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">How we use it</h2>
              <p>
                We use your information to communicate with you about your tour, send quotes, and arrange bookings. We do not sell or share your data with third parties for marketing.
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">Data security</h2>
              <p>
                We take reasonable steps to keep your data secure. Form submissions may be processed by third-party services (e.g. Formspree) under their privacy policies.
              </p>
              <h2 className="font-heading font-semibold text-xl text-primary mt-8 mb-2">Contact</h2>
              <p>
                For questions about this policy or your data, contact us via the contact details on our website.
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
