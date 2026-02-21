import AnimateIn from './AnimateIn'
import tajMahalImg from '../assets/gallery/taj-mahal.jpg'
import lalQuilaImg from '../assets/gallery/lal-quila.jpg'
import fatehpurSikriImg from '../assets/gallery/fatehpur-sikri.jpg'
import sikandraTombImg from '../assets/gallery/sikandra-tomb.jpg'

const gallery = [
  { src: tajMahalImg, alt: 'Taj Mahal - Agra' },
  { src: lalQuilaImg, alt: 'Lal Quila - Red Fort Delhi' },
  { src: fatehpurSikriImg, alt: 'Fatehpur Sikri - Agra' },
  { src: sikandraTombImg, alt: 'Sikandra Tomb - Akbar mausoleum Agra' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn variant="fadeUp" className="text-center mb-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary">
            Travel Gallery
          </h2>
        </AnimateIn>
        <AnimateIn variant="fadeUp" delay={100} className="text-center mb-16">
          <p className="text-text/80 max-w-2xl mx-auto">
            Glimpses of memorable journeys across India.
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gallery-masonry">
          {gallery.map(({ src, alt }, i) => (
            <AnimateIn key={alt} variant="fadeUpScale" delay={80 + i * 60}>
              <div className="gallery-item gallery-item-premium rounded-card overflow-hidden aspect-[4/3]">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover-zoom transition-transform duration-500"
                />
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
