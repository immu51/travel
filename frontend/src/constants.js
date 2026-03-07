/**
 * App-wide config. Replace with your details before going live.
 */
/** Full site URL (no trailing slash). Used for canonical, OG, sitemap. Set VITE_SITE_URL in .env for production. */
export const SITE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) || 'https://travel-blond-eta.vercel.app'

export const WHATSAPP_NUMBER = '918279946669'
export const CITY_NAME = 'Agra'
export const PHONE = '+91 82799 46669'
export const EMAIL = 'khanjaved11974@gmail.com'
/** Email where Contact form submissions are sent (use this in Formspree when creating the form). */
export const CONTACT_FORM_RECIPIENT_EMAIL = 'khanjaved11974@gmail.com'
export const ADDRESS = 'Taj Ganj ,Agra , Uttar Pradesh'
export const ADDRESS_SHORT = 'Taj Ganj ,Agra , Uttar Pradesh'

/** Build WhatsApp chat URL; pass optional pre-filled message. */
export const whatsappUrl = (text = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** Layout: main content width + horizontal padding (use on section containers). */
export const CONTAINER_CLASS = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
/** Layout: standard section vertical padding. */
export const SECTION_PADDING = 'py-20 md:py-28'
