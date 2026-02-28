/**
 * Smooth-scroll to a section by id (e.g. #packages). Use with nav/footer links.
 */
export function scrollToSection(e, href) {
  e.preventDefault()
  if (!href || href === '#') return
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
