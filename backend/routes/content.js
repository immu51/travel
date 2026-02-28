import { Router } from 'express'
import Content from '../models/Content.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const KEY = 'overrides'

router.get('/', async (req, res) => {
  try {
    const doc = await Content.findOne({ key: KEY }).lean()
    const data = doc?.data ?? {}
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', requireAuth, async (req, res) => {
  try {
    const raw = req.body
    const data = raw != null && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
    await Content.findOneAndUpdate(
      { key: KEY },
      { key: KEY, data },
      { upsert: true, new: true }
    )
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
