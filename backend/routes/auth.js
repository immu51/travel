import { Router } from 'express'
import crypto from 'crypto'
import { signToken } from '../middleware/auth.js'

const router = Router()
const ADMIN_HASH = (process.env.ADMIN_PASSWORD_HASH || '').trim().toLowerCase()

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex')
}

router.post('/login', async (req, res) => {
  const password = (req.body.password || '').trim()
  if (!password) {
    return res.status(400).json({ ok: false, reason: 'invalid' })
  }
  if (!ADMIN_HASH) {
    return res.json({ ok: false, reason: 'not_configured' })
  }
  const inputHash = sha256(password)
  if (inputHash.toLowerCase() !== ADMIN_HASH) {
    return res.json({ ok: false, reason: 'invalid' })
  }
  const token = signToken({ sub: 'admin' })
  res.json({ ok: true, token })
})

export default router
