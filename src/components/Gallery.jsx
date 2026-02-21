const gallery = [
  { src: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80', alt: 'Honeymoon tour in Goa - beach resort' },
  { src: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80', alt: 'Rajasthan family tour - palace and heritage' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Adventure trip in Himachal - mountains' },
  { src: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80', alt: 'Kerala backwaters - honeymoon tour' },
  { src: 'https://images.unsplash.com/photo-1566507592333-c60657eea523?w=600&q=80', alt: 'Goa beach - India tour package' },
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80', alt: 'Ladakh adventure trip in India' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary text-center mb-4">
          Travel Gallery
        </h2>
        <p className="text-center text-text/80 max-w-2xl mx-auto mb-16">
          Glimpses of memorable journeys across India.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gallery-masonry">
          {gallery.map(({ src, alt }) => (
            <div key={alt} className="gallery-item rounded-card overflow-hidden aspect-[4/3]">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover hover-zoom transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
