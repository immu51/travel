/**
 * Booking page: professional booking form with validation and success message.
 * Route: /booking
 */
import { useLocation, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useContent } from '../context/ContentContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import BookingForm from '../components/BookingForm'
import AnimateIn from '../components/AnimateIn'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'

export default function BookingPage() {
  const location = useLocation()
  const tourName = location.state?.tour || ''

  return (
    <div className="font-body text-text antialiased bg-bg min-h-screen flex flex-col">
      <SEO
        title="Book a Tour"
        description="Send your tour enquiry: name, email, phone, travel date, number of travelers. We'll get back with a custom quote. No payment required."
      />
      <Navbar />
      <main className={`flex-1 ${SECTION_PADDING}`}>
        <div className={CONTAINER_CLASS}>
          <AnimateIn variant="fadeUp" className="text-center mb-4">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary">
              Book your tour
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={100} className="text-center mb-10">
            <p className="text-text/80 max-w-xl mx-auto">
              Share your details and travel plans. We'll contact you with a custom quote—no online payment required.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUpScale" delay={150}>
            <div className="max-w-xl mx-auto rounded-2xl bg-white/90 backdrop-blur border border-primary/10 shadow-glass p-6 md:p-8">
              <BookingForm defaultTour={tourName} />
            </div>
          </AnimateIn>
          <p className="text-center text-text/70 text-sm mt-8">
            Prefer to chat?{' '}
            <Link to="/" className="text-accent font-medium hover:underline">
              Back to home
            </Link>
            {' · '}
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
              Contact on WhatsApp
            </a>
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
