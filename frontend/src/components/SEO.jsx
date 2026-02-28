/**
 * SEO: sets document title and meta description per page. Use in each page/layout.
 * For Open Graph, set ogTitle/ogDescription/ogImage when needed.
 */
import { useEffect } from 'react'

const SITE_NAME = 'TraverraX'
const DEFAULT_DESC = 'Best Tour & Travel Agency in India. Customized Holiday Packages, Family Tours, Honeymoon Packages & Adventure Trips. Contact us for your dream India tour.'

export default function SEO({
  title,
  description = DEFAULT_DESC,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `Best Tour & Travel Agency in India | ${SITE_NAME}`
  const desc = description || DEFAULT_DESC
  const ogT = ogTitle || fullTitle
  const ogD = ogDescription || desc

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', desc)
    setMeta('og:title', ogT, true)
    setMeta('og:description', ogD, true)
    setMeta('og:type', 'website', true)
    if (ogImage) setMeta('og:image', ogImage, true)
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
    }
  }, [fullTitle, desc, ogT, ogD, ogImage, canonical])

  return null
}
