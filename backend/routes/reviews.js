import { Router } from 'express'
import Review from '../models/Review.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function toReviewJson(r) {
  return {
    id: r._id.toString(),
    name: r.name || '',
    stars: r.stars ?? 5,
    quote: r.quote || '',
    image: r.image || null,
    pinned: !!r.pinned,
    createdAt: r.createdAt ? new Date(r.createdAt).getTime() : Date.now(),
  }
}

router.get('/', async (req, res) => {
  try {
    const list = await Review.find().sort({ pinned: -1, createdAt: -1 }).limit(50).lean()
    res.json(list.map(toReviewJson))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, stars, quote } = req.body || {}
    const doc = await Review.create({
      name: String(name || '').trim(),
      stars: Math.min(5, Math.max(1, Number(stars) || 5)),
      quote: String(quote || '').trim(),
    })
    res.status(201).json(toReviewJson(doc))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const updates = {}
    if (req.body?.name !== undefined) updates.name = String(req.body.name).trim()
    if (req.body?.quote !== undefined) updates.quote = String(req.body.quote).trim()
    if (req.body?.image !== undefined) updates.image = req.body.image == null ? '' : String(req.body.image)
    if (req.body?.stars !== undefined) updates.stars = Math.min(5, Math.max(1, Number(req.body.stars) || 5))
    const doc = await Review.findByIdAndUpdate(id, { $set: updates }, { new: true })
    if (!doc) return res.status(404).json({ error: 'Review not found' })
    res.json(toReviewJson(doc))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const doc = await Review.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ error: 'Review not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.patch('/:id/pin', requireAuth, async (req, res) => {
  try {
    const pinned = !!req.body?.pinned
    const doc = await Review.findByIdAndUpdate(req.params.id, { $set: { pinned } }, { new: true })
    if (!doc) return res.status(404).json({ error: 'Review not found' })
    res.json(toReviewJson(doc))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
