/**
 * SEO: document title, meta description, canonical, Open Graph, Twitter Cards.
 * Use on every page. Pass ogImage for share images; canonical defaults to current URL.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../constants'

const SITE_NAME = 'TraverraX'
const DEFAULT_DESC = 'Best Tour & Travel Agency in India. Customized Holiday Packages, Family Tours, Honeymoon Packages & Adventure Trips. Agra, Delhi, Mumbai. Book now.'

const TWITTER_HANDLE = '' // e.g. @TraverraX – leave empty if no account

export default function SEO({
  title,
  description = DEFAULT_DESC,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  canonical: canonicalProp,
  noindex = false,
}) {
  const location = useLocation()
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `Best Tour & Travel Agency in India | ${SITE_NAME}`
  const desc = description || DEFAULT_DESC
  const ogT = ogTitle || fullTitle
  const ogD = ogDescription || desc
  const canonical = canonicalProp || `${SITE_URL}${location.pathname}`.replace(/\?.*$/, '')

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
    if (noindex) {
      setMeta('robots', 'noindex, nofollow')
    } else {
      setMeta('robots', 'index, follow')
    }

    // Open Graph
    setMeta('og:title', ogT, true)
    setMeta('og:description', ogD, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', canonical, true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('og:locale', 'en_IN', true)
    if (ogImage) {
      setMeta('og:image', ogImage, true)
      setMeta('og:image:width', String(ogImageWidth), true)
      setMeta('og:image:height', String(ogImageHeight), true)
    }

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', ogT)
    setMeta('twitter:description', ogD)
    if (ogImage) setMeta('twitter:image', ogImage)
    if (TWITTER_HANDLE) setMeta('twitter:site', TWITTER_HANDLE)

    // Canonical
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical
  }, [fullTitle, desc, ogT, ogD, ogImage, ogImageWidth, ogImageHeight, canonical, noindex])

  return null
}
