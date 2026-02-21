export function scrollToSection(e, href) {
  e.preventDefault()
  if (!href || href === '#') return
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
