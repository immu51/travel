/**
 * Admin dashboard: sidebar navigation (like reference). Each section separately – add/update.
 * Hero, Tour packages, Same day tours, Hotels, Business info, Announcement, Social links, Reviews info.
 */
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { removeAdminToken, getAdminToken } from '../lib/adminAuth'
import { fetchReviews, updateReviewApi, deleteReviewApi, pinReviewApi } from '../lib/api'
import { readFileAsDataUrl, readFilesAsDataUrls } from '../lib/imageUpload'

const SECTIONS = [
  { id: 'hero', label: 'Hero Slider', icon: 'image', desc: 'Add or update home page hero images' },
  { id: 'tours', label: 'Tour Packages', icon: 'package', desc: 'Edit tour package cards & detail gallery' },
  { id: 'sameDay', label: 'Same Day Tours', icon: 'clock', desc: 'Edit same day tour cards' },
  { id: 'hotels', label: 'Hotels We Offer', icon: 'building', desc: 'Add or update hotel options' },
  { id: 'business', label: 'Business / Contact', icon: 'phone', desc: 'Phone, email, address, WhatsApp' },
  { id: 'announcement', label: 'Announcement', icon: 'megaphone', desc: 'Popup offer & tour badge' },
  { id: 'social', label: 'Social Links', icon: 'share', desc: 'Facebook, Instagram, YouTube links' },
  { id: 'reviews', label: 'Reviews', icon: 'star', desc: 'Customer reviews (managed on website)' },
]

function NavIcon({ type, className = 'w-5 h-5' }) {
  const c = className
  switch (type) {
    case 'image':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 18h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>)
    case 'package':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>)
    case 'clock':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
    case 'building':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>)
    case 'phone':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>)
    case 'megaphone':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13a3 3 0 100-6m12.128 0a3 3 0 100-6M8.293 21l5.414-5.414a2 2 0 002.828 0L21 16" /></svg>)
    case 'share':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>)
    case 'star':
      return (<svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)
    case 'chart':
      return (<svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>)
    default:
      return null
  }
}

function Section({ title, description, children }) {
  return (
    <section className="bg-white rounded-xl border border-primary/10 shadow-soft p-4 sm:p-6 mb-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">{title}</h2>
      {description && <p className="text-sm text-primary/70 mb-4">{description}</p>}
      {children}
    </section>
  )
}

/** Button that opens file picker; on select reads image(s) and calls onSelect(dataUrls). */
function ImageUploadButton({ multiple, onSelect, children, className = '' }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleChange = async (e) => {
    const files = e.target.files
    if (!files?.length) return
    setLoading(true)
    try {
      const urls = multiple ? await readFilesAsDataUrls(files) : [await readFileAsDataUrl(files[0])]
      onSelect(urls)
    } catch (err) {
      console.error(err)
      alert('Upload failed. Please try a smaller image or different format.')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className={className || 'px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5'}
      >
        {loading ? 'Uploading…' : (children || 'Upload image')}
      </button>
    </>
  )
}

function HeroEditor() {
  const { heroImages, overrides, saveOverrides } = useContent()
  const [local, setLocal] = useState(heroImages)

  useEffect(() => {
    setLocal(heroImages)
  }, [heroImages])

  const save = () => saveOverrides({ heroImages: local })
  const reset = () => saveOverrides({ heroImages: null })
  const addImage = () => setLocal([...local, { url: '', alt: '' }])
  const removeImage = (i) => setLocal(local.filter((_, j) => j !== i))
  const updateImage = (i, field, value) => {
    const next = [...local]
    next[i] = { ...next[i], [field]: value }
    setLocal(next)
  }

  const handleUploadMultiple = (dataUrls) => {
    setLocal([...local, ...dataUrls.map((url) => ({ url, alt: '' }))])
  }
  const handleReplaceImage = (i, dataUrls) => {
    if (dataUrls[0]) updateImage(i, 'url', dataUrls[0])
  }

  return (
    <Section title="Hero slider images" description="Add, remove or update images shown on the home page hero. Use URL or upload from device.">
      <div className="space-y-3">
        {local.map((img, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-bg">
            <img src={img.url || '/images/hero/taj-mahal.jpg'} alt={img.alt} className="w-20 h-14 object-cover rounded" />
            <div className="flex-1 min-w-0 space-y-1">
              <input
                type="text"
                value={img.url?.startsWith('data:') ? '' : (img.url || '')}
                onChange={(e) => updateImage(i, 'url', e.target.value)}
                placeholder={img.url?.startsWith('data:') ? '✓ Uploaded (paste URL or upload again to replace)' : 'Paste URL or use Upload below'}
                className="w-full px-3 py-1.5 text-sm rounded border border-primary/20"
              />
              <div className="flex gap-2 flex-wrap">
                <ImageUploadButton multiple={false} onSelect={(urls) => handleReplaceImage(i, urls)}>
                  Upload from device
                </ImageUploadButton>
              </div>
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateImage(i, 'alt', e.target.value)}
                placeholder="Alt text"
                className="w-full px-3 py-1.5 text-sm rounded border border-primary/20"
              />
            </div>
            <button type="button" onClick={() => removeImage(i)} className="text-red-600 text-sm font-medium">
              Remove
            </button>
          </div>
        ))}
        <div className="flex gap-2 flex-wrap items-center">
          <ImageUploadButton multiple onSelect={handleUploadMultiple} className="px-4 py-2 rounded-lg bg-primary/15 text-primary text-sm font-medium hover:bg-primary/25">
            + Upload images (gallery/desktop)
          </ImageUploadButton>
          <button type="button" onClick={addImage} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
            + Add row (paste URL)
          </button>
          <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-accent text-primary text-sm font-medium">
            Save
          </button>
          {overrides.heroImages && (
            <button type="button" onClick={reset} className="px-4 py-2 rounded-lg border border-primary/20 text-primary text-sm">
              Reset to default
            </button>
          )}
        </div>
      </div>
    </Section>
  )
}

function normDetailImage(img) {
  const src = typeof img?.src === 'string' ? img.src : (img?.src?.default ?? '')
  return { src, alt: img?.alt || '' }
}

function TourCardEditor({ tour }) {
  const { overrides, saveOverrides } = useContent()
  const [open, setOpen] = useState(false)
  const o = overrides.tours?.[tour.slug] || {}
  const defaultDetailImages = Array.isArray(tour.detail?.images) ? tour.detail.images.map(normDetailImage) : []
  const [local, setLocal] = useState({
    image: o.image ?? tour.image,
    alt: o.alt ?? tour.alt,
    title: o.title ?? tour.title,
    description: o.description ?? tour.description,
  })
  const [detailImages, setDetailImages] = useState(
    Array.isArray(o.detail?.images) ? o.detail.images.map(normDetailImage) : defaultDetailImages
  )

  const save = () => {
    saveOverrides({
      tours: {
        ...overrides.tours,
        [tour.slug]: { ...local, detail: { images: detailImages } },
      },
    })
    setOpen(false)
  }

  const reset = () => {
    const next = { ...overrides.tours }
    delete next[tour.slug]
    saveOverrides({ tours: next })
    setOpen(false)
  }

  const addGalleryImages = (dataUrls) => {
    setDetailImages((prev) => [...prev, ...dataUrls.map((src) => ({ src, alt: '' }))])
  }
  const updateGalleryItem = (index, field, value) => {
    setDetailImages((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }
  const removeGalleryImage = (index) => {
    setDetailImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="border border-primary/10 rounded-lg p-3 mb-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-primary">{tour.title}</span>
        <button type="button" onClick={() => setOpen(!open)} className="text-accent text-sm font-medium">
          {open ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {open && (
        <div className="mt-3 space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-primary block">Card image (listing)</span>
            <div className="flex flex-wrap gap-2 items-center">
              <input type="text" value={local.image?.startsWith('data:') ? '' : (local.image || '')} onChange={(e) => setLocal({ ...local, image: e.target.value })} placeholder={local.image?.startsWith('data:') ? '✓ Uploaded image' : 'Image URL'} className="flex-1 min-w-0 px-3 py-1.5 text-sm rounded border" />
              <ImageUploadButton multiple={false} onSelect={(urls) => urls[0] && setLocal((l) => ({ ...l, image: urls[0] }))}>Upload from device</ImageUploadButton>
            </div>
          </div>
          <input type="text" value={local.alt} onChange={(e) => setLocal({ ...local, alt: e.target.value })} placeholder="Alt" className="w-full px-3 py-1.5 text-sm rounded border" />
          <input type="text" value={local.title} onChange={(e) => setLocal({ ...local, title: e.target.value })} placeholder="Title" className="w-full px-3 py-1.5 text-sm rounded border" />
          <textarea value={local.description} onChange={(e) => setLocal({ ...local, description: e.target.value })} placeholder="Description" rows={2} className="w-full px-3 py-1.5 text-sm rounded border" />

          {/* Detail page slider (gallery) – multiple images */}
          <div className="pt-2 border-t border-primary/10">
            <span className="text-sm font-medium text-primary block mb-2">Detail page slider (gallery) – multiple pictures</span>
            <div className="space-y-2 mb-2">
              {detailImages.map((img, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-bg">
                  <img src={img.src || ''} alt={img.alt} className="w-16 h-12 object-cover rounded shrink-0" />
                  <input type="text" value={img.src?.startsWith('data:') ? '' : (img.src || '')} onChange={(e) => updateGalleryItem(i, 'src', e.target.value)} placeholder="URL or upload" className="flex-1 min-w-0 px-2 py-1.5 text-sm rounded border" />
                  <input type="text" value={img.alt} onChange={(e) => updateGalleryItem(i, 'alt', e.target.value)} placeholder="Alt" className="w-24 px-2 py-1.5 text-sm rounded border" />
                  <ImageUploadButton multiple={false} onSelect={(urls) => urls[0] && updateGalleryItem(i, 'src', urls[0])} className="px-2 py-1.5 text-xs rounded border border-primary/30">Upload</ImageUploadButton>
                  <button type="button" onClick={() => removeGalleryImage(i)} className="text-red-600 text-sm">Remove</button>
                </div>
              ))}
            </div>
            <ImageUploadButton multiple onSelect={addGalleryImages} className="px-3 py-1.5 rounded-lg bg-primary/15 text-primary text-sm font-medium">
              + Upload multiple images (gallery/desktop)
            </ImageUploadButton>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={save} className="px-3 py-1.5 rounded bg-accent text-primary text-sm">Save</button>
            {o.title !== undefined && <button type="button" onClick={reset} className="px-3 py-1.5 rounded border text-sm">Reset</button>}
          </div>
        </div>
      )}
    </div>
  )
}

function SameDayCardEditor({ tour }) {
  const { overrides, saveOverrides } = useContent()
  const [open, setOpen] = useState(false)
  const o = overrides.sameDayTours?.[tour.slug] || {}
  const [local, setLocal] = useState({
    image: o.image ?? tour.image,
    alt: o.alt ?? tour.alt,
    title: o.title ?? tour.title,
    description: o.description ?? tour.description,
  })

  const save = () => {
    saveOverrides({
      sameDayTours: { ...overrides.sameDayTours, [tour.slug]: local },
    })
    setOpen(false)
  }

  const reset = () => {
    const next = { ...overrides.sameDayTours }
    delete next[tour.slug]
    saveOverrides({ sameDayTours: next })
    setOpen(false)
  }

  return (
    <div className="border border-primary/10 rounded-lg p-3 mb-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-primary">{tour.title}</span>
        <button type="button" onClick={() => setOpen(!open)} className="text-accent text-sm font-medium">
          {open ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {open && (
        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap gap-2 items-center">
            <input type="text" value={local.image?.startsWith('data:') ? '' : (local.image || '')} onChange={(e) => setLocal({ ...local, image: e.target.value })} placeholder={local.image?.startsWith('data:') ? '✓ Uploaded image' : 'Image URL'} className="flex-1 min-w-0 px-3 py-1.5 text-sm rounded border" />
            <ImageUploadButton multiple={false} onSelect={(urls) => urls[0] && setLocal((l) => ({ ...l, image: urls[0] }))}>Upload from device</ImageUploadButton>
          </div>
          <input type="text" value={local.alt} onChange={(e) => setLocal({ ...local, alt: e.target.value })} placeholder="Alt" className="w-full px-3 py-1.5 text-sm rounded border" />
          <input type="text" value={local.title} onChange={(e) => setLocal({ ...local, title: e.target.value })} placeholder="Title" className="w-full px-3 py-1.5 text-sm rounded border" />
          <textarea value={local.description} onChange={(e) => setLocal({ ...local, description: e.target.value })} placeholder="Description" rows={2} className="w-full px-3 py-1.5 text-sm rounded border" />
          <div className="flex gap-2">
            <button type="button" onClick={save} className="px-3 py-1.5 rounded bg-accent text-primary text-sm">Save</button>
            {o.title !== undefined && <button type="button" onClick={reset} className="px-3 py-1.5 rounded border text-sm">Reset</button>}
          </div>
        </div>
      )}
    </div>
  )
}

function HotelsEditor() {
  const { hotelsWeOffer, overrides, saveOverrides, defaults } = useContent()
  const [local, setLocal] = useState(hotelsWeOffer)

  useEffect(() => {
    setLocal(hotelsWeOffer)
  }, [hotelsWeOffer])

  const save = () => {
    saveOverrides({ hotelsWeOffer: local })
  }

  const reset = () => {
    saveOverrides({ hotelsWeOffer: null })
  }

  const addItem = () => setLocal([...local, { label: '', image: '', alt: '' }])
  const removeItem = (i) => setLocal(local.filter((_, j) => j !== i))
  const updateItem = (i, field, value) => {
    const next = [...local]
    next[i] = { ...next[i], [field]: value }
    setLocal(next)
  }

  return (
    <Section title="Hotels We Offer" description="Add or update hotel options shown on the website. Each item has label, image and alt text.">
      <div className="space-y-3">
        {local.map((item, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-bg">
            <img src={item.image || ''} alt={item.alt} className="w-12 h-12 object-cover rounded" />
            <input type="text" value={item.label} onChange={(e) => updateItem(i, 'label', e.target.value)} placeholder="Label" className="w-32 px-2 py-1.5 text-sm rounded border" />
            <input type="text" value={item.image?.startsWith('data:') ? '' : (item.image || '')} onChange={(e) => updateItem(i, 'image', e.target.value)} placeholder={item.image?.startsWith('data:') ? '✓ Uploaded' : 'Image URL'} className="flex-1 min-w-0 px-2 py-1.5 text-sm rounded border" />
            <ImageUploadButton multiple={false} onSelect={(urls) => urls[0] && updateItem(i, 'image', urls[0])}>Upload</ImageUploadButton>
            <input type="text" value={item.alt} onChange={(e) => updateItem(i, 'alt', e.target.value)} placeholder="Alt" className="w-24 px-2 py-1.5 text-sm rounded border" />
            <button type="button" onClick={() => removeItem(i)} className="text-red-600 text-sm">Remove</button>
          </div>
        ))}
        <div className="flex gap-2">
          <button type="button" onClick={addItem} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">+ Add</button>
          <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-accent text-primary text-sm">Save</button>
          {overrides.hotelsWeOffer && <button type="button" onClick={reset} className="px-4 py-2 rounded-lg border text-sm">Reset to default</button>}
        </div>
      </div>
    </Section>
  )
}

function BusinessSettingsEditor() {
  const { businessInfo, overrides, saveOverrides } = useContent()
  const [local, setLocal] = useState(() => ({ ...businessInfo }))

  useEffect(() => {
    setLocal({ ...businessInfo })
  }, [overrides.businessInfo])

  const save = () => saveOverrides({ businessInfo: local })
  const reset = () => saveOverrides({ businessInfo: null })

  return (
    <Section title="Business / Contact info" description="Shown in footer, contact section and WhatsApp button. Use country code for WhatsApp (e.g. 918279946669).">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">WhatsApp number (digits + country code)</label>
          <input type="text" value={local.whatsappNumber} onChange={(e) => setLocal({ ...local, whatsappNumber: e.target.value })} placeholder="918279946669" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Phone (display)</label>
          <input type="text" value={local.phone} onChange={(e) => setLocal({ ...local, phone: e.target.value })} placeholder="+91 82799 46669" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Email</label>
          <input type="email" value={local.email} onChange={(e) => setLocal({ ...local, email: e.target.value })} placeholder="email@example.com" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Address (full)</label>
          <input type="text" value={local.address} onChange={(e) => setLocal({ ...local, address: e.target.value })} placeholder="Taj Ganj, Agra" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Address (short, footer)</label>
          <input type="text" value={local.addressShort} onChange={(e) => setLocal({ ...local, addressShort: e.target.value })} placeholder="Taj Ganj, Agra" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">City name</label>
          <input type="text" value={local.cityName} onChange={(e) => setLocal({ ...local, cityName: e.target.value })} placeholder="Agra" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-accent text-primary text-sm font-medium">Save</button>
          {overrides.businessInfo && <button type="button" onClick={reset} className="px-4 py-2 rounded-lg border border-primary/20 text-primary text-sm">Reset to default</button>}
        </div>
      </div>
    </Section>
  )
}

function AnnouncementEditor() {
  const { announcement, overrides, saveOverrides, tours, sameDayTours } = useContent()
  const [local, setLocal] = useState({
    enabled: announcement.enabled,
    text: announcement.text,
    link: announcement.link || '',
    tourSlug: announcement.tourSlug || '',
    urgencyText: announcement.urgencyText || 'For limited time only. Contact us soon!',
  })

  const save = () => saveOverrides({ announcement: local })
  const reset = () => saveOverrides({ announcement: null })

  const tourOptions = [
    { value: '', label: '— No specific tour (general offer) —' },
    ...tours.map((t) => ({ value: t.slug, label: `Tour: ${t.title}` })),
    ...sameDayTours.map((t) => ({ value: t.slug, label: `Same day: ${t.title}` })),
  ]

  return (
    <Section title="Announcement (popup + tour badge)" description="Shows a popup once per visit and a badge on the selected tour card. Add urgency text like &quot;For limited time only. Contact soon!&quot;">
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={local.enabled} onChange={(e) => setLocal({ ...local, enabled: e.target.checked })} className="rounded border-primary/30" />
          <span className="text-sm font-medium text-primary">Show announcement popup</span>
        </label>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Offer text (e.g. 10% off)</label>
          <input type="text" value={local.text} onChange={(e) => setLocal({ ...local, text: e.target.value })} placeholder="10% off Rajasthan tours!" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Apply to tour (optional)</label>
          <select value={local.tourSlug} onChange={(e) => setLocal({ ...local, tourSlug: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-primary/20">
            {tourOptions.map((opt) => (
              <option key={opt.value || 'none'} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <p className="text-xs text-primary/60 mt-1">If selected, this offer badge will show on that tour card.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Urgency text (popup)</label>
          <input type="text" value={local.urgencyText} onChange={(e) => setLocal({ ...local, urgencyText: e.target.value })} placeholder="For limited time only. Contact us soon!" className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Link (optional)</label>
          <input type="url" value={local.link} onChange={(e) => setLocal({ ...local, link: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-primary/20" />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-accent text-primary text-sm font-medium">Save</button>
          {overrides.announcement && <button type="button" onClick={reset} className="px-4 py-2 rounded-lg border border-primary/20 text-primary text-sm">Reset</button>}
        </div>
      </div>
    </Section>
  )
}

function SocialLinksEditor() {
  const { socialLinks, overrides, saveOverrides } = useContent()
  const [local, setLocal] = useState({
    facebook: overrides.socialLinks?.facebook ?? socialLinks.facebook,
    instagram: overrides.socialLinks?.instagram ?? socialLinks.instagram,
    twitter: overrides.socialLinks?.twitter ?? socialLinks.twitter,
    youtube: overrides.socialLinks?.youtube ?? socialLinks.youtube,
  })

  const save = () => saveOverrides({ socialLinks: local })
  const reset = () => saveOverrides({ socialLinks: null })

  return (
    <Section title="Social links" description="URLs for footer social icons. Leave empty to hide an icon.">
      <div className="space-y-3">
        {['facebook', 'instagram', 'twitter', 'youtube'].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-primary mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input type="url" value={local[key]} onChange={(e) => setLocal({ ...local, [key]: e.target.value })} placeholder={`https://${key}.com/...`} className="w-full px-3 py-2 rounded-lg border border-primary/20" />
          </div>
        ))}
        <div className="flex gap-2">
          <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-accent text-primary text-sm font-medium">Save</button>
          {overrides.socialLinks && <button type="button" onClick={reset} className="px-4 py-2 rounded-lg border border-primary/20 text-primary text-sm">Reset</button>}
        </div>
      </div>
    </Section>
  )
}

function ReviewsEditor() {
  const token = getAdminToken()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', stars: 5, quote: '', image: '' })

  const load = async () => {
    setLoading(true)
    setError('')
    const list = await fetchReviews()
    setReviews(Array.isArray(list) ? list : [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return
    const ok = await deleteReviewApi(id, token)
    if (ok) setReviews((prev) => prev.filter((r) => r.id !== id))
    else setError('Failed to delete')
  }

  const handlePin = async (id, pinned) => {
    const updated = await pinReviewApi(id, pinned, token)
    if (updated) setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, pinned } : r)))
    else setError('Failed to pin/unpin')
  }

  const startEdit = (r) => {
    setEditingId(r.id)
    setEditForm({ name: r.name || '', stars: r.stars ?? 5, quote: r.quote || '', image: r.image || '' })
  }
  const cancelEdit = () => {
    setEditingId(null)
  }
  const saveEdit = async () => {
    const updated = await updateReviewApi(editingId, editForm, token)
    if (updated) {
      setReviews((prev) => prev.map((r) => (r.id === editingId ? { ...r, ...updated } : r)))
      setEditingId(null)
    } else setError('Failed to update')
  }

  return (
    <Section title="Reviews" description="Manage customer reviews: edit, delete, or pin to show at top on the website.">
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <Link to="/#testimonials" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 mb-4">
        <NavIcon type="star" className="w-4 h-4" />
        View reviews on site
      </Link>
      {loading ? (
        <p className="text-primary/70">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-primary/70">No reviews yet. Visitors can add reviews from the homepage.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className={`border rounded-lg p-3 ${r.pinned ? 'border-accent bg-accent/5' : 'border-primary/10'}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-primary">{r.name || '—'}</span>
                    {r.pinned && <span className="text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent">Pinned</span>}
                    <span className="text-primary/70">★ {r.stars ?? 5}</span>
                  </div>
                  <p className="text-sm text-primary/80 mt-1 line-clamp-2">{r.quote || '—'}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" onClick={() => handlePin(r.id, !r.pinned)} className="px-2 py-1 rounded border border-primary/20 text-primary text-xs font-medium hover:bg-primary/5" title={r.pinned ? 'Unpin' : 'Pin to top'}>
                    {r.pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button type="button" onClick={() => startEdit(r)} className="px-2 py-1 rounded border border-primary/20 text-primary text-xs font-medium hover:bg-primary/5">Edit</button>
                  <button type="button" onClick={() => handleDelete(r.id)} className="px-2 py-1 rounded border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50">Delete</button>
                </div>
              </div>
              {editingId === r.id && (
                <div className="mt-3 pt-3 border-t border-primary/10 space-y-2">
                  <input type="text" value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} placeholder="Name" className="w-full px-3 py-1.5 text-sm rounded border border-primary/20" />
                  <input type="number" min={1} max={5} value={editForm.stars} onChange={(e) => setEditForm((f) => ({ ...f, stars: Math.min(5, Math.max(1, Number(e.target.value) || 5)) }))} placeholder="Stars 1-5" className="w-full px-3 py-1.5 text-sm rounded border border-primary/20" />
                  <textarea value={editForm.quote} onChange={(e) => setEditForm((f) => ({ ...f, quote: e.target.value }))} placeholder="Quote" rows={2} className="w-full px-3 py-1.5 text-sm rounded border border-primary/20" />
                  <input type="text" value={editForm.image} onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))} placeholder="Image URL" className="w-full px-3 py-1.5 text-sm rounded border border-primary/20" />
                  <div className="flex gap-2">
                    <button type="button" onClick={saveEdit} className="px-3 py-1.5 rounded bg-accent text-primary text-sm font-medium">Save</button>
                    <button type="button" onClick={cancelEdit} className="px-3 py-1.5 rounded border border-primary/20 text-primary text-sm">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { tours, sameDayTours, saveError, clearSaveError } = useContent()

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const handleLogout = () => {
    removeAdminToken()
    navigate('/admin/login', { replace: true })
  }

  const navItem = (id, label, icon) => (
    <button
      key={id}
      type="button"
      onClick={() => { setActiveSection(id); setSidebarOpen(false) }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${
        activeSection === id ? 'bg-accent/20 text-accent border border-accent/30' : 'text-primary hover:bg-primary/5'
      }`}
    >
      <NavIcon type={icon} className="w-5 h-5 shrink-0" />
      <span>{label}</span>
    </button>
  )

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-primary/10 shadow-sm">
      <div className="p-4 border-b border-primary/10">
        <span className="font-heading font-bold text-primary">TraverraX Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {SECTIONS.map((s) => navItem(s.id, s.label, s.icon))}
      </nav>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'hero': return <HeroEditor />
      case 'tours': return <Section title="Tour packages" description="Edit image, title and description for each tour. Expand a card to edit detail page gallery.">{tours.map((tour) => <TourCardEditor key={tour.slug} tour={tour} />)}</Section>
      case 'sameDay': return <Section title="Same day tours" description="Edit image, title and description for each same day tour.">{sameDayTours.map((tour) => <SameDayCardEditor key={tour.slug} tour={tour} />)}</Section>
      case 'hotels': return <HotelsEditor />
      case 'business': return <BusinessSettingsEditor />
      case 'announcement': return <AnnouncementEditor />
      case 'social': return <SocialLinksEditor />
      case 'reviews': return <ReviewsEditor />
      default: return <HeroEditor />
    }
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:left-0 z-30">
        {sidebarContent}
      </aside>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} aria-hidden />
          <aside className="fixed inset-y-0 left-0 w-64 z-50 md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
      <div className="flex-1 md:pl-64 min-h-screen flex flex-col min-w-0">
        <header className="bg-primary text-white px-3 sm:px-4 py-3 flex items-center justify-between gap-2 shrink-0">
          <button type="button" onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-white/10 touch-manipulation" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="font-heading font-semibold truncate min-w-0">{SECTIONS.find((s) => s.id === activeSection)?.label ?? 'Admin'}</span>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link to="/" className="text-white/90 hover:text-white text-xs sm:text-sm font-medium whitespace-nowrap">View site</Link>
            <button type="button" onClick={handleLogout} className="text-white/90 hover:text-white text-xs sm:text-sm font-medium whitespace-nowrap">Logout</button>
          </div>
        </header>
        {saveError && (
          <div className="bg-red-50 border-b border-red-200 px-3 sm:px-4 py-3 flex items-center justify-between gap-4 shrink-0">
            <p className="text-red-800 text-sm font-medium min-w-0 break-words">{saveError}</p>
            <button type="button" onClick={clearSaveError} className="text-red-600 hover:text-red-800 text-sm font-medium shrink-0">Dismiss</button>
          </div>
        )}
        <main className="flex-1 p-3 sm:p-4 pb-12 max-w-3xl w-full min-w-0 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
