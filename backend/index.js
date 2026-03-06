/**
 * Travel backend: Express + MongoDB.
 * API: auth, content overrides, contact/booking/hotel/car forms, reviews.
 */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import contentRoutes from './routes/content.js'
import formsRoutes from './routes/forms.js'
import reviewsRoutes from './routes/reviews.js'
import { requireDb } from './middleware/requireDb.js'

const PORT = process.env.PORT || 5000

// Prefer MONGODB_USER + MONGODB_PASSWORD + MONGODB_CLUSTER (password is URL-encoded – fixes "bad auth" when password has @, #, etc.)
function getMongoUri() {
  const user = (process.env.MONGODB_USER || '').trim()
  const password = (process.env.MONGODB_PASSWORD || '').trim()
  const cluster = (process.env.MONGODB_CLUSTER || '').trim()
  const db = (process.env.MONGODB_DB || 'travel').trim()
  if (user && password && cluster) {
    const encoded = encodeURIComponent(password)
    return `mongodb+srv://${user}:${encoded}@${cluster}/${db}?retryWrites=true&w=majority`
  }
  let uri = (process.env.MONGODB_URI || '').trim()
  // If value was pasted as "MONGODB_URI=mongodb+srv://...", use only the URI part
  const srv = uri.indexOf('mongodb+srv://')
  const plain = uri.indexOf('mongodb://')
  if (srv >= 0) uri = uri.substring(srv)
  else if (plain >= 0) uri = uri.substring(plain)
  return uri
}
const MONGODB_URI = getMongoUri()

const app = express()
// Allow any origin so Vercel/Railway work without CORS issues (backend has no auth on these routes)
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '2mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminAuthRoutes)
app.use('/api/content', requireDb, contentRoutes)
app.use('/api', requireDb, formsRoutes)
app.use('/api/reviews', requireDb, reviewsRoutes)

app.get('/', (_, res) => res.json({ ok: true, service: 'Travel API' }))
app.get('/api/health', (_, res) => res.json({ ok: true }))

async function start() {
  if (MONGODB_URI) {
    const user = (process.env.MONGODB_USER || '').trim()
    const cluster = (process.env.MONGODB_CLUSTER || '').trim()
    if (user && cluster) console.log('MongoDB: connecting as', user, 'to', cluster)
    try {
      await mongoose.connect(MONGODB_URI)
      console.log('MongoDB connected')
    } catch (err) {
      console.error('MongoDB connection error:', err.message)
      if (err.message.includes('bad auth')) {
        console.error('Fix: Atlas → Database Access → Edit user password, then set MONGODB_PASSWORD in Render env.')
      } else if (err.message.includes('ENOTFOUND') || err.message.includes('ETIMEDOUT') || err.message.includes('ECONNREFUSED')) {
        console.error('Fix: Atlas → Network Access → Add IP Address → Allow access from anywhere (0.0.0.0/0) so Render can connect.')
      }
      console.error('Server starting without DB. Content/forms/reviews will return 503 until MongoDB connects.')
      // Do not exit – so Render deploy succeeds and you can fix Atlas, then redeploy
    }
  } else {
    console.warn('MONGODB_URI not set – content and forms will not persist')
  }
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
}

start().catch(console.error)
