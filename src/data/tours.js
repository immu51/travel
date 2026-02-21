/* Shared tour packages – used by Packages list and TourDetailPage */
import agraFort1 from '../assets/day1/agra-fort-1.png'
import agraFort2 from '../assets/day1/agra-fort-2.png'
import agraFort3 from '../assets/day1/agra-fort-3.png'
import tajGate from '../assets/day1/taj-gate.png'
import tajGolden from '../assets/day1/taj-golden.png'
import tajmahalMarbel from '../assets/day1/Tajmahal_marbel.jpg'
import tajMahalImg from '../assets/gallery/taj-mahal.jpg'

export const TOUR_SLUG_DAY1_TAJ_LAL = 'day1-taj-lal-quila'

export const packages = [
  {
    slug: TOUR_SLUG_DAY1_TAJ_LAL,
    image: agraFort1,
    alt: 'Day 1 - Taj Mahal and Lal Quila tour',
    title: 'Day 1 – Taj Mahal & Lal Quila',
    description: 'Airport pickup, AC car, water. Explore Taj Mahal and Lal Quila with local experiences.',
    duration: '1 day',
    waText: 'Hi, I am interested in Day 1 tour - Taj Mahal and Lal Quila.',
    detail: {
      images: [
        { src: tajGolden, alt: 'Taj Mahal at golden hour' },
        { src: tajMahalImg, alt: 'Taj Mahal' },
        { src: tajmahalMarbel, alt: 'Taj Mahal marble' },
        { src: agraFort1, alt: 'Lal Quila Agra Fort' },
        { src: agraFort2, alt: 'Agra Fort tower and gateway' },
        { src: agraFort3, alt: 'Agra Fort exterior' },
        { src: tajGate, alt: 'Taj Mahal main gate' },
      ],
      dayLabel: 'Day 1 tour – Taj Mahal aur Lal Quila explore hoga',
      history: [
        'Taj Mahal: Built by Emperor Shah Jahan in memory of Mumtaz Mahal, the Taj is an ivory-white marble mausoleum and a UNESCO World Heritage Site. It is one of the Seven Wonders and a symbol of eternal love.',
        'Lal Quila: Mughal-era red sandstone fort, UNESCO site. Shah Jahan ne isko banaaya; andar palaces, mosques, courtyards. Yeh wahi Lal Quila hai jo Taj ke paas hai.',
      ],
      benefits: [
        'Customized one-day itinerary – best of both monuments without rush.',
        'Experienced local guides and drivers who know the monuments and traffic.',
        'Flexible timing – we adjust to your flight and preferences.',
        'Transparent pricing and no hidden charges.',
      ],
      inclusions: [
        'We will pick you up from airport and drop you back as per your schedule.',
        'Full-day AC car for transfers and sightseeing – Taj Mahal aur Lal Quila.',
        'Complimentary water bottles during the tour.',
        'We take you to explore local spots and hidden gems along the way.',
        'Monument entry tickets are to be paid by the customer at the gates (we assist with queues and timing).',
      ],
    },
  },
  {
    slug: 'goa-beach-culture',
    image: 'https://images.unsplash.com/photo-1566507592333-c60657eea523?w=1920&q=85',
    alt: 'Goa family tour package - beaches and culture',
    title: 'Goa Beach & Culture',
    description: 'Sun, sand, and heritage. Perfect for families and couples seeking a relaxed coastal holiday with customized activities.',
    duration: '5–7 days',
    waText: 'Hi, I am interested in Goa Beach & Culture tour package.',
    detail: {
      images: [{ src: 'https://images.unsplash.com/photo-1566507592333-c60657eea523?w=1920&q=85', alt: 'Goa beaches and culture' }],
      dayLabel: 'Goa Beach & Culture tour',
      history: ['Goa blends Portuguese heritage with Indian culture. Beaches, churches, and spice plantations make it perfect for families and couples.'],
      benefits: ['Customized beach and culture itinerary.', 'Experienced local guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
    },
  },
  {
    slug: 'rajasthan-heritage',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&q=85',
    alt: 'Rajasthan family tour package - forts and palaces',
    title: 'Rajasthan Heritage',
    description: 'Forts, palaces, and desert safaris. An iconic India tour package for families and culture lovers.',
    duration: '7–10 days',
    waText: 'Hi, I am interested in Rajasthan Heritage tour package.',
    detail: {
      images: [{ src: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&q=85', alt: 'Rajasthan forts and palaces' }],
      dayLabel: 'Rajasthan Heritage tour',
      history: ['Rajasthan is the land of forts, palaces, and desert. Jaipur, Udaipur, Jodhpur offer royal heritage and desert safaris.'],
      benefits: ['Customized heritage itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
    },
  },
  {
    slug: 'kerala-honeymoon',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=85',
    alt: 'Kerala honeymoon tour package - backwaters and hills',
    title: 'Kerala Honeymoon',
    description: 'Backwaters, tea gardens, and beaches. Our top honeymoon tour package for romance and serenity.',
    duration: '6–8 days',
    waText: 'Hi, I am interested in Kerala Honeymoon tour package.',
    detail: {
      images: [{ src: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=85', alt: 'Kerala backwaters and hills' }],
      dayLabel: 'Kerala Honeymoon tour',
      history: ['Kerala offers backwaters, tea gardens, and serene beaches. Perfect for honeymooners and nature lovers.'],
      benefits: ['Customized romantic itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Houseboat and local experiences.', 'Entry tickets paid by customer.'],
    },
  },
  {
    slug: 'himachal-adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85',
    alt: 'Himachal Pradesh adventure trip - mountains and trekking',
    title: 'Himachal Adventure',
    description: 'Trekking, camping, and mountain drives. One of our best adventure trips in India for thrill-seekers.',
    duration: '5–9 days',
    waText: 'Hi, I am interested in Himachal Adventure tour package.',
    detail: {
      images: [{ src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85', alt: 'Himachal mountains and trekking' }],
      dayLabel: 'Himachal Adventure tour',
      history: ['Himachal Pradesh offers trekking, camping, and scenic mountain drives. Ideal for adventure and nature lovers.'],
      benefits: ['Customized adventure itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Trekking and local experiences.', 'Entry tickets paid by customer.'],
    },
  },
  {
    slug: 'golden-triangle',
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1920&q=85',
    alt: 'Agra and Taj Mahal India tour package',
    title: 'Golden Triangle',
    description: 'Delhi, Agra, Jaipur. The classic India tour package for first-time visitors and families.',
    duration: '5–6 days',
    waText: 'Hi, I am interested in Golden Triangle tour package.',
    detail: {
      images: [{ src: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1920&q=85', alt: 'Golden Triangle India tour' }],
      dayLabel: 'Golden Triangle tour',
      history: ['The Golden Triangle covers Delhi, Agra, and Jaipur – the classic introduction to India for first-time visitors and families.'],
      benefits: ['Customized Golden Triangle itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
    },
  },
  {
    slug: 'ladakh-explorer',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85',
    alt: 'Ladakh adventure trip in India - mountains',
    title: 'Ladakh Explorer',
    description: 'High-altitude lakes, monasteries, and scenic drives. Ultimate adventure trips in India for explorers.',
    duration: '7–10 days',
    waText: 'Hi, I am interested in Ladakh Explorer tour package.',
    detail: {
      images: [{ src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85', alt: 'Ladakh mountains and monasteries' }],
      dayLabel: 'Ladakh Explorer tour',
      history: ['Ladakh offers high-altitude lakes, monasteries, and stunning drives. The ultimate adventure for explorers.'],
      benefits: ['Customized Ladakh itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
    },
  },
]

export function getTourBySlug(slug) {
  const pkg = packages.find((p) => p.slug === slug)
  if (!pkg || !pkg.detail) return null
  return { ...pkg, ...pkg.detail, waText: pkg.waText }
}
