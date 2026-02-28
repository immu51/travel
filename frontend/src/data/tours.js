/**
 * Tour packages data. Used by Packages, ToursListing, and TourDetailPage.
 * All images from src/assets or external URLs. Enriched with location, price, category, rating, itinerary, exclusions, FAQ.
 */
import agraFort1 from '../assets/tours/agra-fort-1.png'
import agraFort2 from '../assets/tours/agra-fort-2.png'
import agraFort3 from '../assets/tours/agra-fort-3.png'
import tajGate from '../assets/tours/taj-gate.png'
import tajGolden from '../assets/tours/taj-golden.png'
import tajmahalMarbel from '../assets/tours/Tajmahal_marbel.jpg'
import tajMahalImg from '../assets/gallery/taj-mahal.jpg'

export const TOUR_SLUG_DAY1_TAJ_LAL = 'day1-taj-lal-quila'

/** Unique destinations for filter dropdown (derived from packages). */
export function getDestinations() {
  const set = new Set()
  packages.forEach((p) => p.location && set.add(p.location))
  return [{ value: '', label: 'All Destinations' }, ...Array.from(set).sort().map((d) => ({ value: d, label: d }))]
}

export const packages = [
  {
    slug: TOUR_SLUG_DAY1_TAJ_LAL,
    image: agraFort1,
    alt: 'Day 1 - Taj Mahal and Lal Quila tour',
    title: 'Day 1 – Taj Mahal & Lal Quila',
    description: 'Airport pickup, AC car, water. Explore Taj Mahal and Lal Quila with local experiences.',
    duration: '1 day',
    location: 'Agra',
    priceFrom: 4999,
    category: ['family', 'international'],
    rating: 4.8,
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
      exclusions: [
        'Monument entry tickets (payable at gates).',
        'Personal expenses, meals not mentioned.',
        'Travel insurance.',
      ],
      itinerary: [
        { day: 1, title: 'Arrival & Taj Mahal', description: 'Pick-up from airport or hotel. Visit Taj Mahal with guide. Lunch break. Visit Agra Fort (Lal Quila). Drop at hotel or airport.' },
      ],
      faq: [
        { q: 'What is the best time to visit Taj Mahal?', a: 'Sunrise and sunset offer the best light and fewer crowds. We can schedule your visit accordingly.' },
        { q: 'Are entry tickets included?', a: 'Monument entry tickets are paid by you at the gates. We assist with queues and timing.' },
        { q: 'Can you pick up from Delhi?', a: 'Yes. We can arrange pick-up from Delhi with an additional charge. Contact us for a quote.' },
      ],
    },
  },
  {
    slug: 'goa-beach-culture',
    image: '/images/tours/goa.jpg',
    alt: 'Goa family tour package - beaches and culture',
    title: 'Goa Beach & Culture',
    description: 'Sun, sand, and heritage. Perfect for families and couples seeking a relaxed coastal holiday with customized activities.',
    duration: '5–7 days',
    location: 'Goa',
    priceFrom: 24999,
    category: ['family', 'honeymoon'],
    rating: 4.9,
    waText: 'Hi, I am interested in Goa Beach & Culture tour package.',
    detail: {
      images: [
        { src: '/images/tours/goa.jpg', alt: 'Goa beaches' },
        { src: '/images/tours/goa-heritage.jpg', alt: 'Goa heritage' },
        { src: '/images/tours/coast.jpg', alt: 'Goa coast' },
      ],
      dayLabel: 'Goa Beach & Culture tour',
      history: ['Goa blends Portuguese heritage with Indian culture. Beaches, churches, and spice plantations make it perfect for families and couples.'],
      benefits: ['Customized beach and culture itinerary.', 'Experienced local guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
      exclusions: ['Flights.', 'Monument entries.', 'Personal expenses.', 'Travel insurance.'],
      itinerary: [
        { day: 1, title: 'Arrival in Goa', description: 'Pick-up from airport. Check-in. Relax at beach or explore nearby.' },
        { day: 2, title: 'North Goa Beaches', description: 'Visit Calangute, Baga, Anjuna. Water sports optional.' },
        { day: 3, title: 'Heritage & Churches', description: 'Old Goa churches, Basilica of Bom Jesus, Se Cathedral.' },
        { day: 4, title: 'South Goa', description: 'Palolem, Colva. Peaceful beaches and sunset.' },
        { day: 5, title: 'Spice Plantation & Departure', description: 'Spice plantation tour. Drop at airport.' },
      ],
      faq: [
        { q: 'Is Goa safe for families?', a: 'Yes. Goa is very family-friendly. We tailor activities to your group.' },
        { q: 'Best time to visit?', a: 'November to February is ideal. March–May is hot but fewer crowds.' },
      ],
    },
  },
  {
    slug: 'rajasthan-heritage',
    image: '/images/tours/rajasthan.jpg',
    alt: 'Rajasthan family tour package - forts and palaces',
    title: 'Rajasthan Heritage',
    description: 'Forts, palaces, and desert safaris. An iconic India tour package for families and culture lovers.',
    duration: '7–10 days',
    location: 'Rajasthan',
    priceFrom: 54999,
    category: ['family', 'international'],
    rating: 4.9,
    waText: 'Hi, I am interested in Rajasthan Heritage tour package.',
    detail: {
      images: [
        { src: '/images/tours/rajasthan.jpg', alt: 'Rajasthan forts' },
        { src: '/images/tours/jaipur.jpg', alt: 'Jaipur' },
        { src: '/images/tours/taj-mahal.jpg', alt: 'Palace' },
      ],
      dayLabel: 'Rajasthan Heritage tour',
      history: ['Rajasthan is the land of forts, palaces, and desert. Jaipur, Udaipur, Jodhpur offer royal heritage and desert safaris.'],
      benefits: ['Customized heritage itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
      exclusions: ['Monument entries.', 'Flights.', 'Personal expenses.', 'Travel insurance.'],
      itinerary: [
        { day: 1, title: 'Delhi – Jaipur', description: 'Drive to Jaipur. En route visit Amber Fort. Check-in. Local market.' },
        { day: 2, title: 'Jaipur', description: 'City Palace, Hawa Mahal, Jantar Mantar.' },
        { day: 3, title: 'Jaipur – Jodhpur', description: 'Drive to Jodhpur. Mehrangarh Fort, blue city walk.' },
        { day: 4, title: 'Jodhpur – Jaisalmer', description: 'Drive to Jaisalmer. Desert camp.' },
        { day: 5, title: 'Jaisalmer', description: 'Sand dunes, camel safari, Thar heritage.' },
        { day: 6, title: 'Jaisalmer – Udaipur', description: 'Drive to Udaipur. Lake Palace view.' },
        { day: 7, title: 'Udaipur', description: 'City Palace, boat on Lake Pichola.' },
        { day: 8, title: 'Departure', description: 'Drop at airport or onward travel.' },
      ],
      faq: [
        { q: 'How many days for Rajasthan?', a: '7–10 days covers the main circuit. We can shorten or extend.' },
        { q: 'Desert safari included?', a: 'Yes. We include a desert camp and camel safari in Jaisalmer.' },
      ],
    },
  },
  {
    slug: 'kerala-honeymoon',
    image: '/images/tours/kerala.jpg',
    alt: 'Kerala honeymoon tour package - backwaters and hills',
    title: 'Kerala Honeymoon',
    description: 'Backwaters, tea gardens, and beaches. Our top honeymoon tour package for romance and serenity.',
    duration: '6–8 days',
    location: 'Kerala',
    priceFrom: 42999,
    category: ['honeymoon', 'family'],
    rating: 4.9,
    waText: 'Hi, I am interested in Kerala Honeymoon tour package.',
    detail: {
      images: [
        { src: '/images/tours/kerala.jpg', alt: 'Kerala backwaters' },
        { src: '/images/tours/mountains.jpg', alt: 'Tea gardens' },
        { src: '/images/tours/goa.jpg', alt: 'Beach' },
      ],
      dayLabel: 'Kerala Honeymoon tour',
      history: ['Kerala offers backwaters, tea gardens, and serene beaches. Perfect for honeymooners and nature lovers.'],
      benefits: ['Customized romantic itinerary.', 'Experienced guides.', 'Houseboat stay.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Houseboat and local experiences.', 'Entry tickets paid by customer.'],
      exclusions: ['Monument entries.', 'Flights.', 'Personal expenses.', 'Travel insurance.'],
      itinerary: [
        { day: 1, title: 'Cochin Arrival', description: 'Airport pick-up. Fort Kochi walk, Chinese nets.' },
        { day: 2, title: 'Munnar', description: 'Drive to Munnar. Tea gardens, viewpoints.' },
        { day: 3, title: 'Munnar', description: 'Eravikulam, tea factory, local trails.' },
        { day: 4, title: 'Thekkady', description: 'Periyar wildlife sanctuary, spice plantation.' },
        { day: 5, title: 'Houseboat', description: 'Backwaters houseboat stay. Alleppey/Kumarakom.' },
        { day: 6, title: 'Kovalam / Departure', description: 'Beach time or transfer to airport.' },
      ],
      faq: [
        { q: 'Is houseboat private?', a: 'Yes. We book private houseboats for couples.' },
        { q: 'Best season?', a: 'September to March. Monsoon (June–Aug) is lush but rainy.' },
      ],
    },
  },
  {
    slug: 'himachal-adventure',
    image: '/images/tours/mountains.jpg',
    alt: 'Himachal Pradesh adventure trip - mountains and trekking',
    title: 'Himachal Adventure',
    description: 'Trekking, camping, and mountain drives. One of our best adventure trips in India for thrill-seekers.',
    duration: '5–9 days',
    location: 'Himachal Pradesh',
    priceFrom: 32999,
    category: ['adventure', 'family'],
    rating: 4.8,
    waText: 'Hi, I am interested in Himachal Adventure tour package.',
    detail: {
      images: [
        { src: '/images/tours/mountains.jpg', alt: 'Himachal mountains' },
        { src: '/images/tours/coast.jpg', alt: 'Trekking' },
        { src: '/images/tours/snow.jpg', alt: 'Snow peaks' },
      ],
      dayLabel: 'Himachal Adventure tour',
      history: ['Himachal Pradesh offers trekking, camping, and scenic mountain drives. Ideal for adventure and nature lovers.'],
      benefits: ['Customized adventure itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Trekking and local experiences.', 'Entry tickets paid by customer.'],
      exclusions: ['Permits (if any).', 'Personal gear.', 'Flights.', 'Travel insurance.'],
      itinerary: [
        { day: 1, title: 'Delhi – Manali', description: 'Drive to Manali. Rest and acclimatize.' },
        { day: 2, title: 'Manali', description: 'Solang Valley, Rohtang pass (if open), local sightseeing.' },
        { day: 3, title: 'Trek / Adventure', description: 'Day trek or activities as per package.' },
        { day: 4, title: 'Manali – Kasol / Tosh', description: 'Transfer to Parvati Valley. Optional trek.' },
        { day: 5, title: 'Return / Extension', description: 'Drive back to Delhi or extend for more days.' },
      ],
      faq: [
        { q: 'Fitness required?', a: 'Moderate. We have easy and moderate treks. Tell us your preference.' },
        { q: 'Best time?', a: 'April–June and September–November. Winter for snow.' },
      ],
    },
  },
  {
    slug: 'golden-triangle',
    image: '/images/tours/jaipur.jpg',
    alt: 'Agra and Taj Mahal India tour package',
    title: 'Golden Triangle India Tour',
    description: 'Delhi, Agra, Jaipur. The classic India tour package for first-time visitors and families.',
    duration: '5–6 days',
    location: 'Delhi, Agra, Jaipur',
    priceFrom: 34999,
    category: ['family', 'international'],
    rating: 4.9,
    waText: 'Hi, I am interested in Golden Triangle India Tour package.',
    detail: {
      images: [
        { src: '/images/tours/jaipur.jpg', alt: 'Golden Triangle' },
        { src: '/images/tours/taj-mahal.jpg', alt: 'Taj Mahal' },
        { src: '/images/tours/rajasthan.jpg', alt: 'Jaipur' },
      ],
      dayLabel: 'Golden Triangle tour',
      history: ['The Golden Triangle covers Delhi, Agra, and Jaipur – the classic introduction to India for first-time visitors and families.'],
      benefits: ['Customized Golden Triangle itinerary.', 'Experienced guides.', 'Flexible timing.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
      exclusions: ['Monument entries.', 'Flights.', 'Personal expenses.', 'Travel insurance.'],
      itinerary: [
        { day: 1, title: 'Delhi', description: 'Arrival. Old & New Delhi sightseeing – Red Fort, Jama Masjid, India Gate, Qutub Minar.' },
        { day: 2, title: 'Delhi – Agra', description: 'Drive to Agra. Taj Mahal, Agra Fort.' },
        { day: 3, title: 'Agra – Jaipur', description: 'Fatehpur Sikri en route. Reach Jaipur.' },
        { day: 4, title: 'Jaipur', description: 'Amber Fort, City Palace, Hawa Mahal, Jantar Mantar.' },
        { day: 5, title: 'Jaipur – Delhi / Departure', description: 'Drive to Delhi. Airport drop or extend.' },
      ],
      faq: [
        { q: 'How many days for Golden Triangle?', a: '5–6 days is ideal. We can do 4 days compact or 7 with extensions.' },
        { q: 'Taj Mahal closed day?', a: 'Taj Mahal is closed on Fridays. We plan your Agra visit accordingly.' },
      ],
    },
  },
  {
    slug: 'ladakh-explorer',
    image: '/images/tours/coast.jpg',
    alt: 'Ladakh adventure trip in India - mountains',
    title: 'Ladakh Explorer',
    description: 'High-altitude lakes, monasteries, and scenic drives. Ultimate adventure trips in India for explorers.',
    duration: '7–10 days',
    location: 'Ladakh',
    priceFrom: 59999,
    category: ['adventure', 'international'],
    rating: 4.9,
    waText: 'Hi, I am interested in Ladakh Explorer tour package.',
    detail: {
      images: [
        { src: '/images/tours/coast.jpg', alt: 'Ladakh' },
        { src: '/images/tours/mountains.jpg', alt: 'Mountains' },
        { src: '/images/tours/snow.jpg', alt: 'Pangong' },
      ],
      dayLabel: 'Ladakh Explorer tour',
      history: ['Ladakh offers high-altitude lakes, monasteries, and stunning drives. The ultimate adventure for explorers.'],
      benefits: ['Customized Ladakh itinerary.', 'Experienced guides.', 'Acclimatization built-in.', 'Transparent pricing.'],
      inclusions: ['Airport pickup and drop.', 'AC transport.', 'Water bottles.', 'Local experiences.', 'Entry tickets paid by customer.'],
      exclusions: ['Inner Line Permit.', 'Monument entries.', 'Flights.', 'Travel insurance.'],
      itinerary: [
        { day: 1, title: 'Leh Arrival', description: 'Fly to Leh. Rest and acclimatize.' },
        { day: 2, title: 'Leh', description: 'Local monasteries – Hemis, Thiksey, Shey.' },
        { day: 3, title: 'Leh – Nubra', description: 'Khardung La, Nubra Valley, sand dunes.' },
        { day: 4, title: 'Nubra – Pangong', description: 'Drive to Pangong Lake. Overnight.' },
        { day: 5, title: 'Pangong – Leh', description: 'Return to Leh via Changla.' },
        { day: 6, title: 'Leh', description: 'Optional Tso Moriri or rest.' },
        { day: 7, title: 'Departure', description: 'Airport drop.' },
      ],
      faq: [
        { q: 'Altitude sickness?', a: 'We build in acclimatization days. Carry prescribed meds if advised.' },
        { q: 'Best season?', a: 'May–September. Roads open usually June–October.' },
      ],
    },
  },
]

export function getTourBySlug(slug) {
  const pkg = packages.find((p) => p.slug === slug)
  if (!pkg || !pkg.detail) return null
  return { ...pkg, ...pkg.detail, waText: pkg.waText }
}
