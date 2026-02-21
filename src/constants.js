// Replace with your details before going live
export const WHATSAPP_NUMBER = '919876543210'
export const CITY_NAME = 'Mumbai'
export const PHONE = '+91 98765 43210'
export const EMAIL = 'info@travelindia.com'
export const ADDRESS = '123 Travel Street, Andheri West, Mumbai, Maharashtra 400058'
export const ADDRESS_SHORT = '123 Travel Street, Mumbai'

export const whatsappUrl = (text = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
