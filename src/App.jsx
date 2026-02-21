import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import TourDetailPage from './pages/TourDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-body text-text antialiased bg-bg">
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
          <Route path="/tour/:slug" element={<TourDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
