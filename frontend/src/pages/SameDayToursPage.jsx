/**
 * Same day tours from Delhi: Agra, Jaipur, Old Delhi, Jaisalmer, Mathura, Ranthambore, etc.
 * Route: /same-day-tours
 */
import SEO from '../components/SEO'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'
import { useContent } from '../context/ContentContext'
import SameDayTourCard from '../components/SameDayTourCard'
import AnimateIn from '../components/AnimateIn'

export default function SameDayToursPage() {
  const { sameDayTours } = useContent()
  return (
    <>
      <SEO
        title="Same Day Tours from Delhi"
        description="Same day Agra Taj Mahal, Jaipur, Old Delhi, Mathura Vrindavan, Ranthambore safari, and Jaisalmer from Delhi. Book one-day trips with expert guides."
      />
      <main className={`${SECTION_PADDING} bg-bg min-h-screen`}>
        <div className={CONTAINER_CLASS}>
          <AnimateIn variant="fadeUp" className="text-center mb-4">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary">
              Same Day Tours from Delhi
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={100} className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-text/80">
              One-day trips to Agra (Taj Mahal), Jaipur, Old Delhi, Mathura & Vrindavan, Ranthambore, and more. Return to Delhi the same evening or next day. Private car and guide.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sameDayTours.map((tour, i) => (
              <SameDayTourCard key={tour.slug} tour={tour} index={i} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
