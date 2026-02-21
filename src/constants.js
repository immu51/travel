/**
 * App-wide config. Replace with your details before going live.
 */
export const WHATSAPP_NUMBER = '918279946669'
export const CITY_NAME = 'Mumbai'
export const PHONE = '+91 82799 46669'
export const EMAIL = 'info@travelindia.com'
/** Email where Contact form submissions are sent (use this in Formspree when creating the form). */
export const CONTACT_FORM_RECIPIENT_EMAIL = 'khanjaved11974@gmail.com'
export const ADDRESS = '123 Travel Street, Andheri West, Mumbai, Maharashtra 400058'
export const ADDRESS_SHORT = '123 Travel Street, Mumbai'

/** Build WhatsApp chat URL; pass optional pre-filled message. */
export const whatsappUrl = (text = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** Layout: main content width + horizontal padding (use on section containers). */
export const CONTAINER_CLASS = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
/** Layout: standard section vertical padding. */
export const SECTION_PADDING = 'py-20 md:py-28'
