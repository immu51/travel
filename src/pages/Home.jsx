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
      <SEO />
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
