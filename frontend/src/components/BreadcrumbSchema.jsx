/**
 * Injects Schema.org BreadcrumbList JSON-LD for better search snippets.
 * Pass items: [{ name, url }, ...]
 */
import { useEffect } from 'react'

const SCRIPT_ID = 'traverrax-breadcrumb-schema'

export default function BreadcrumbSchema({ items = [] }) {
  useEffect(() => {
    if (!Array.isArray(items) || items.length === 0) {
      const existing = document.getElementById(SCRIPT_ID)
      if (existing) existing.remove()
      return
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }

    let script = document.getElementById(SCRIPT_ID)
    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)

    return () => {
      const el = document.getElementById(SCRIPT_ID)
      if (el) el.remove()
    }
  }, [items])

  return null
}
