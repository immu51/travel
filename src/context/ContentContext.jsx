/**
 * Content context: merges default content with admin overrides from localStorage.
 * Provides heroImages, tours, sameDayTours, hotelsWeOffer, businessInfo, announcement, socialLinks, getWhatsAppUrl.
 */
import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { packages as defaultPackages } from '../data/tours'
import { sameDayTours as defaultSameDayTours } from '../data/sameDayTours'
import { defaultHeroImages, defaultHotelsWeOffer } from '../data/contentDefaults'
import { loadOverrides, saveOverrides as persistOverrides } from '../lib/contentOverrides'
import { WHATSAPP_NUMBER, PHONE, EMAIL, ADDRESS, ADDRESS_SHORT, CITY_NAME } from '../constants'

const ContentContext = createContext(null)

function mergeTour(pkg, override) {
  if (!override) return pkg
  const merged = { ...pkg, ...override }
  if (override.detail && typeof override.detail === 'object') {
    merged.detail = { ...pkg.detail, ...override.detail }
    if (Array.isArray(override.detail.images)) merged.detail.images = override.detail.images
  }
  return merged
}

export function ContentProvider({ children }) {
  const [overrides, setOverridesState] = useState(loadOverrides)

  useEffect(() => {
    setOverridesState(loadOverrides())
  }, [])

  const saveOverrides = useCallback((next) => {
    setOverridesState((prev) => {
      const merged = { ...prev, ...next }
      persistOverrides(merged)
      return merged
    })
  }, [])

  const value = useMemo(() => {
    const heroImages = overrides.heroImages ?? defaultHeroImages
    const tours = defaultPackages.map((p) => mergeTour(p, overrides.tours?.[p.slug]))
    const sameDayTours = defaultSameDayTours.map((s) => ({
      ...s,
      ...overrides.sameDayTours?.[s.slug],
    }))
    const hotelsWeOffer = overrides.hotelsWeOffer ?? defaultHotelsWeOffer

    const getTourBySlug = (slug) => {
      const pkg = tours.find((p) => p.slug === slug)
      if (!pkg || !pkg.detail) return null
      return { ...pkg, ...pkg.detail, waText: pkg.waText }
    }

    const getSameDayTourBySlug = (slug) =>
      sameDayTours.find((t) => t.slug === slug) || null

    const defaultBusiness = {
      whatsappNumber: WHATSAPP_NUMBER,
      phone: PHONE,
      email: EMAIL,
      address: ADDRESS,
      addressShort: ADDRESS_SHORT,
      cityName: CITY_NAME,
    }
    const businessInfo = { ...defaultBusiness, ...overrides.businessInfo }

    const defaultAnnouncement = {
      enabled: false,
      text: '',
      link: '',
      tourSlug: '',
      urgencyText: 'For limited time only. Contact us soon!',
    }
    const announcement = { ...defaultAnnouncement, ...overrides.announcement }

    const defaultSocial = { facebook: '', instagram: '', twitter: '', youtube: '' }
    const socialLinks = { ...defaultSocial, ...overrides.socialLinks }

    const getWhatsAppUrl = (text = '') => {
      const num = (businessInfo.whatsappNumber || '').replace(/\D/g, '')
      if (!num) return '#'
      const base = `https://wa.me/${num}`
      return text ? `${base}?text=${encodeURIComponent(text)}` : base
    }

    return {
      heroImages,
      tours,
      sameDayTours,
      hotelsWeOffer,
      businessInfo,
      announcement,
      socialLinks,
      getWhatsAppUrl,
      overrides,
      saveOverrides,
      getTourBySlug,
      getSameDayTourBySlug,
      defaults: {
        heroImages: defaultHeroImages,
        packages: defaultPackages,
        sameDayTours: defaultSameDayTours,
        hotelsWeOffer: defaultHotelsWeOffer,
      },
    }
  }, [overrides, saveOverrides])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
