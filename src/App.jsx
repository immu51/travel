import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyChoose from './components/WhyChoose'
import Packages from './components/Packages'
import About from './components/About'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div className="font-body text-text antialiased bg-bg">
      <Navbar />
      <main>
        <Hero />
        <WhyChoose />
        <Packages />
        <About />
        <Gallery />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
