import SEO from '../components/SEO'
import Hero from '../components/Hero'
import WhyChoose from '../components/WhyChoose'
import Packages from '../components/Packages'
import Stats from '../components/Stats'
import About from '../components/About'
import Partners from '../components/Partners'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <SEO
        description="TraverraX – Best Tour & Travel Agency in India. Book Golden Triangle, Rajasthan, Kerala, Goa tours & same-day Agra Taj Mahal trips. Family & honeymoon packages. Agra, Delhi. 4.9★ reviews."
      />
      <Hero />
      <WhyChoose />
      <Packages />
      <Stats />
      <About />
      <Partners />
      <Gallery />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  )
}
