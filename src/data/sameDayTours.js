/**
 * Same day tours from Delhi: Agra, Jaipur, Old Delhi, and nearby destinations.
 * Used on the Same Day Tours page.
 */
export const sameDayTours = [
  {
    slug: 'same-day-agra-taj-mahal',
    title: 'Same Day Agra Taj Mahal Tour',
    subtitle: 'From Delhi',
    description: 'Visit the Taj Mahal and Agra Fort in one day. Early morning departure from Delhi by car or Gatiman Express. Skip-the-line access and expert guide.',
    duration: '1 Day',
    departure: 'Delhi',
    destination: 'Agra',
    image: '/images/tours/taj-mahal.jpg',
    alt: 'Same day Agra Taj Mahal tour from Delhi',
    priceFrom: 3999,
    highlights: ['Taj Mahal', 'Agra Fort', 'AC car / Gatiman train', 'Expert guide', 'Same day return to Delhi'],
    itinerary: [
      { time: 'Early morning', title: 'Pick-up from Delhi', description: 'Hotel or airport pick-up. Drive to Agra (approx. 3–4 hours) or board Gatiman Express.' },
      { time: 'Morning', title: 'Taj Mahal', description: 'Guided visit to the Taj Mahal. Best light for photography.' },
      { time: 'Afternoon', title: 'Agra Fort', description: 'Visit Agra Fort (Red Fort). Optional: Fatehpur Sikri en route.' },
      { time: 'Evening', title: 'Return to Delhi', description: 'Drop at your hotel or preferred location in Delhi.' },
    ],
    waText: 'Hi, I am interested in Same Day Agra Taj Mahal Tour from Delhi.',
  },
  {
    slug: 'same-day-jaipur-tour',
    title: 'Same Day Jaipur Tour',
    subtitle: 'From Delhi',
    description: 'Explore the Pink City in one day. Amber Fort, Hawa Mahal, City Palace, and Jantar Mantar. Comfortable AC car with guide. Return to Delhi same evening.',
    duration: '1 Day',
    departure: 'Delhi',
    destination: 'Jaipur',
    image: '/images/tours/jaipur.jpg',
    alt: 'Same day Jaipur tour from Delhi',
    priceFrom: 4999,
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'AC car & guide', 'Same day return'],
    itinerary: [
      { time: 'Early morning', title: 'Pick-up from Delhi', description: 'Hotel pick-up. Drive to Jaipur (approx. 4–5 hours).' },
      { time: 'Late morning', title: 'Amber Fort', description: 'Visit Amber Fort. Optional elephant or jeep ride to the fort.' },
      { time: 'Afternoon', title: 'Jaipur city', description: 'Hawa Mahal, City Palace, Jantar Mantar. Lunch break.' },
      { time: 'Evening', title: 'Return to Delhi', description: 'Drive back to Delhi. Drop at hotel.' },
    ],
    waText: 'Hi, I am interested in Same Day Jaipur Tour from Delhi.',
  },
  {
    slug: 'old-delhi-new-delhi-tour',
    title: 'Old Delhi & New Delhi Tour',
    subtitle: 'Full day in Delhi',
    description: 'Discover the best of Delhi in one day: Red Fort, Jama Masjid, Chandni Chowk, India Gate, Qutub Minar, and more. Private car and guide.',
    duration: '1 Day',
    departure: 'Delhi',
    destination: 'Delhi',
    image: '/images/hero/red-fort.jpg',
    alt: 'Old Delhi and New Delhi full day tour',
    priceFrom: 2999,
    highlights: ['Red Fort', 'Jama Masjid', 'Chandni Chowk', 'India Gate', 'Qutub Minar', 'Lotus Temple (optional)'],
    itinerary: [
      { time: 'Morning', title: 'Old Delhi', description: 'Red Fort (from outside on Fridays), Jama Masjid, walk or rickshaw in Chandni Chowk.' },
      { time: 'Midday', title: 'New Delhi', description: 'India Gate, Rashtrapati Bhavan (from outside), drive past Rajpath.' },
      { time: 'Afternoon', title: 'Qutub Minar', description: 'Qutub Minar complex. Optional: Lotus Temple, Humayun\'s Tomb.' },
      { time: 'Evening', title: 'Drop', description: 'Return to your hotel or preferred location.' },
    ],
    waText: 'Hi, I am interested in Old Delhi & New Delhi full day tour.',
  },
  {
    slug: 'same-day-mathura-vrindavan',
    title: 'Same Day Mathura & Vrindavan Tour',
    subtitle: 'From Delhi',
    description: 'Spiritual day trip to the birth place of Lord Krishna. Mathura temples, Vrindavan Banke Bihari, ISKCON, and optional Taj Mahal view from Mehtab Bagh.',
    duration: '1 Day',
    departure: 'Delhi',
    destination: 'Mathura, Vrindavan',
    image: '/images/tours/goa-heritage.jpg',
    alt: 'Same day Mathura Vrindavan tour from Delhi',
    priceFrom: 3499,
    highlights: ['Mathura temples', 'Vrindavan Banke Bihari', 'ISKCON Temple', 'AC car & guide', 'Same day return'],
    itinerary: [
      { time: 'Morning', title: 'Drive to Mathura', description: 'Pick-up from Delhi. Drive to Mathura (approx. 2.5–3 hours).' },
      { time: 'Late morning', title: 'Mathura', description: 'Krishna Janmabhoomi, Dwarkadhish Temple, and other key temples.' },
      { time: 'Afternoon', title: 'Vrindavan', description: 'Banke Bihari Temple, ISKCON Temple, optional other temples.' },
      { time: 'Evening', title: 'Return to Delhi', description: 'Drop at your hotel in Delhi.' },
    ],
    waText: 'Hi, I am interested in Same Day Mathura & Vrindavan Tour from Delhi.',
  },
  {
    slug: 'jaisalmer-tour-from-delhi',
    title: 'Jaisalmer Tour from Delhi',
    subtitle: '2–3 Days from Delhi',
    description: 'Experience the Golden City: sand dunes, camel safari, Jaisalmer Fort, havelis, and Thar Desert. Overnight in desert camp or hotel. Flight or train + road options.',
    duration: '2D/1N or 3D/2N',
    departure: 'Delhi',
    destination: 'Jaisalmer, Rajasthan',
    image: '/images/tours/rajasthan.jpg',
    alt: 'Jaisalmer tour from Delhi',
    priceFrom: 12999,
    highlights: ['Jaisalmer Fort', 'Sand dunes & camel safari', 'Desert camp stay', 'Patwon Ki Haveli', 'Sam dunes'],
    itinerary: [
      { time: 'Day 1', title: 'Delhi – Jaisalmer', description: 'Flight or overnight train to Jaisalmer. Check-in. Jaisalmer Fort, Patwon Ki Haveli. Evening at Sam dunes or desert camp.' },
      { time: 'Day 2', title: 'Jaisalmer', description: 'Camel safari, desert activities. Overnight in camp (2D/1N) or return to Jaisalmer city.' },
      { time: 'Day 3 (optional)', title: 'Return to Delhi', description: 'Morning at leisure. Flight or train back to Delhi.' },
    ],
    waText: 'Hi, I am interested in Jaisalmer Tour from Delhi.',
  },
  {
    slug: 'same-day-ranthambore',
    title: 'Same Day Ranthambore from Delhi',
    subtitle: 'By flight + safari',
    description: 'Fly Delhi–Sawai Madhopur, do a jungle safari at Ranthambore National Park, and return same day. Tiger spotting and wildlife. Ideal for a quick getaway.',
    duration: '1 Day',
    departure: 'Delhi',
    destination: 'Ranthambore',
    image: '/images/tours/mathura.jpg',
    alt: 'Same day Ranthambore safari from Delhi',
    priceFrom: 8999,
    highlights: ['Ranthambore safari', 'Tiger reserve', 'Flight included (optional)', 'Same day return'],
    itinerary: [
      { time: 'Early morning', title: 'Delhi – Sawai Madhopur', description: 'Flight to Jaipur/Sawai Madhopur or drive. Transfer to park.' },
      { time: 'Morning / afternoon', title: 'Safari', description: 'Gypsy safari in Ranthambore National Park. 3–4 hours.' },
      { time: 'Evening', title: 'Return to Delhi', description: 'Flight or drive back to Delhi.' },
    ],
    waText: 'Hi, I am interested in Same Day Ranthambore Safari from Delhi.',
  },
]

export function getSameDayTourBySlug(slug) {
  return sameDayTours.find((t) => t.slug === slug) || null
}

/**
 * Same day tours in a shape compatible with the main Tours listing (duration filter, destination filter).
 * Used on /tours so same day tours appear when filtering by duration "Same day".
 */
export function getSameDayToursForListing() {
  return sameDayTours.map((t) => ({
    ...t,
    location: t.destination,
    isSameDay: true,
    category: ['family'],
  }))
}
