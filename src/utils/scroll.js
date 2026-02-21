export function scrollToSection(e, href) {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
