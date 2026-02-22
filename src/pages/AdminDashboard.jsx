/**
 * Admin dashboard: edit hero images, tour cards, same-day tours, hotels we offer.
 * Add/remove images (URL or upload from device), change descriptions. Saves to localStorage.
 */
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { removeAdminToken } from '../lib/adminAuth'
import { readFileAsDataUrl, readFilesAsDataUrls } from '../lib/imageUpload'

function Section({ title, children }) {
  return (
    <section className="bg-white rounded-xl border border-primary/10 shadow-soft p-6 mb-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-4">{title}</h2>
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
    <Section title="Hero slider images">
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
    <Section title="Hotels We Offer">
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
    <Section title="Business / Contact info">
      <p className="text-sm text-primary/70 mb-4">Shown in footer, contact section, and WhatsApp button. Use country code for WhatsApp (e.g. 918279946669).</p>
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
    <Section title="Announcement (popup + tour card badge)">
      <p className="text-sm text-primary/70 mb-4">Shows a popup once per visit and a badge on the selected tour card. Add urgency text like &quot;For limited time only. Contact soon!&quot;</p>
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
    <Section title="Social links">
      <p className="text-sm text-primary/70 mb-4">URLs for footer icons. Leave empty to hide.</p>
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

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { tours, sameDayTours } = useContent()

  const handleLogout = () => {
    removeAdminToken()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-primary text-white px-4 py-4 flex items-center justify-between">
        <span className="font-heading font-bold">Admin – TraverraX</span>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white/90 hover:text-white text-sm">View site</Link>
          <button type="button" onClick={handleLogout} className="text-white/90 hover:text-white text-sm font-medium">
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto p-4 pb-12">
        <HeroEditor />
        <Section title="Tour packages (image, title, description)">
          {tours.map((tour) => (
            <TourCardEditor key={tour.slug} tour={tour} />
          ))}
        </Section>
        <Section title="Same day tours">
          {sameDayTours.map((tour) => (
            <SameDayCardEditor key={tour.slug} tour={tour} />
          ))}
        </Section>
        <HotelsEditor />
        <BusinessSettingsEditor />
        <AnnouncementEditor />
        <SocialLinksEditor />
      </main>
    </div>
  )
}
