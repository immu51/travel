/**
 * App: root layout and routes. Home, Tours listing, Tour detail, Booking, Privacy, Terms. Admin (login + dashboard).
 */
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import AnnouncementPopup from './components/AnnouncementPopup'
import AdminProtected from './components/AdminProtected'
import Home from './pages/Home'
import ToursListing from './pages/ToursListing'
import TourDetailPage from './pages/TourDetailPage'
import SameDayToursPage from './pages/SameDayToursPage'
import SameDayTourDetailPage from './pages/SameDayTourDetailPage'
import CarRentalPage from './pages/CarRentalPage'
import HotelBookingPage from './pages/HotelBookingPage'
import BookingPage from './pages/BookingPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'

function SiteAnnouncementPopup() {
  const location = useLocation()
  if (location.pathname.startsWith('/admin')) return null
  return <AnnouncementPopup />
}

export default function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <div className="font-body text-text antialiased bg-bg">
          <SiteAnnouncementPopup />
          <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main>
                  <Home />
                </main>
                <Footer />
                <WhatsAppFloat />
              </>
            }
          />
          <Route
            path="/tours"
            element={
              <>
                <Navbar />
                <ToursListing />
                <Footer />
                <WhatsAppFloat />
              </>
            }
          />
          <Route path="/tour/:slug" element={<TourDetailPage />} />
          <Route
            path="/same-day-tours"
            element={
              <>
                <Navbar />
                <SameDayToursPage />
                <Footer />
                <WhatsAppFloat />
              </>
            }
          />
          <Route path="/same-day-tours/:slug" element={<SameDayTourDetailPage />} />
          <Route path="/car-rental" element={<CarRentalPage />} />
          <Route path="/hotel-booking" element={<HotelBookingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
            {/* Admin: no Navbar/Footer/WhatsApp */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtected>
                <AdminDashboard />
              </AdminProtected>
            }
          />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
        </div>
      </ContentProvider>
    </BrowserRouter>
  )
}
