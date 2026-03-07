/**
 * App: root layout and routes. Home eager; other pages lazy-loaded for better initial load.
 */
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import AnnouncementPopup from './components/AnnouncementPopup'
import AdminProtected from './components/AdminProtected'
import Home from './pages/Home'

const ToursListing = lazy(() => import('./pages/ToursListing'))
const TourDetailPage = lazy(() => import('./pages/TourDetailPage'))
const SameDayToursPage = lazy(() => import('./pages/SameDayToursPage'))
const SameDayTourDetailPage = lazy(() => import('./pages/SameDayTourDetailPage'))
const CarRentalPage = lazy(() => import('./pages/CarRentalPage'))
const HotelBookingPage = lazy(() => import('./pages/HotelBookingPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

function PageFallback() {
  return <div className="min-h-[60vh] flex items-center justify-center bg-bg" aria-hidden><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>
}

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
          <Suspense fallback={<PageFallback />}>
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
          </Suspense>
        </div>
      </ContentProvider>
    </BrowserRouter>
  )
}
