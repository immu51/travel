/**
 * Gallery: scalable grid – add any number of images to gallery array.
 * Same card + hover overlay + staggered animation for all.
 */
import AnimateIn from './AnimateIn'
import { CONTAINER_CLASS, SECTION_PADDING } from '../constants'
import tajMahalImg from '../assets/gallery/taj-mahal.jpg'
import lalQuilaImg from '../assets/gallery/lal-quila.jpg'
import hawaMahalImg from '../assets/gallery/hawa-mahal.png'
import fatehpurSikriImg from '../assets/gallery/fatehpur-sikri.jpg'
import sikandraTombImg from '../assets/gallery/sikandra-tomb.jpg'

const gallery = [
  { src: tajMahalImg, alt: 'Taj Mahal - Agra', title: 'Taj Mahal' },
  { src: lalQuilaImg, alt: 'India Gate - Delhi', title: 'India Gate' },
  { src: hawaMahalImg, alt: 'Hawa Mahal - Jaipur', title: 'Hawa Mahal' },
  { src: fatehpurSikriImg, alt: 'Fatehpur Sikri - Agra', title: 'Fatehpur Sikri' },
  { src: sikandraTombImg, alt: 'Sikandra Tomb - Akbar mausoleum Agra', title: 'Sikandra Tomb' },
]

export default function Gallery() {
  return (
    <section id="gallery" className={`${SECTION_PADDING} bg-white`}>
      <div className={CONTAINER_CLASS}>
        <AnimateIn variant="fadeUp" className="text-center mb-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary">
            Travel Gallery
          </h2>
        </AnimateIn>
        <AnimateIn variant="fadeUp" delay={100} className="text-center mb-12 md:mb-16">
          <p className="text-text/80 max-w-2xl mx-auto">
            Glimpses of memorable journeys across India.
          </p>
        </AnimateIn>

        {/* Single grid – works for 5 or 50+ images; same card for all */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
          {gallery.map(({ src, alt, title }, i) => (
            <AnimateIn
              key={`${alt}-${i}`}
              variant="fadeUpScale"
              delay={80 + (i % 10) * 50}
            >
              <div className="gallery-card aspect-[4/3] group">
                <img
                  src={src}
                  alt={alt}
                  loading={i < 6 ? (i === 0 ? 'eager' : 'lazy') : 'lazy'}
                  className="w-full h-full object-cover"
                />
                <div className="gallery-card-overlay p-3 md:p-4">
                  <span className="text-white font-heading font-semibold text-sm md:text-base line-clamp-2">
                    {title}
                  </span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
