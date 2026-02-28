import { Router } from 'express'
import Review from '../models/Review.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const list = await Review.find().sort({ createdAt: -1 }).limit(50).lean()
    const reviews = list.map((r) => ({
      id: r._id.toString(),
      name: r.name || '',
      stars: r.stars ?? 5,
      quote: r.quote || '',
      image: r.image || null,
      createdAt: r.createdAt ? new Date(r.createdAt).getTime() : Date.now(),
    }))
    res.json(reviews)
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
    res.status(201).json({
      id: doc._id.toString(),
      name: doc.name,
      stars: doc.stars,
      quote: doc.quote,
      image: doc.image || null,
      createdAt: doc.createdAt ? new Date(doc.createdAt).getTime() : Date.now(),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
