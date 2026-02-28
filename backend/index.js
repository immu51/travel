/**
 * Travel backend: Express + MongoDB.
 * API: auth, content overrides, contact/booking/hotel/car forms, reviews.
 */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
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
  return (process.env.MONGODB_URI || '').trim()
}
const MONGODB_URI = getMongoUri()

const app = express()
const frontendOrigin = (process.env.FRONTEND_ORIGIN || '').trim().replace(/,\s*$/, '') || true
app.use(cors({ origin: frontendOrigin, credentials: true }))
app.use(express.json({ limit: '2mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/content', requireDb, contentRoutes)
app.use('/api', requireDb, formsRoutes)
app.use('/api/reviews', requireDb, reviewsRoutes)

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
        console.error('')
        console.error('Bad auth = Atlas rejected username or password.')
        console.error('1. MongoDB Atlas → Database Access → your user → Edit → Edit Password')
        console.error('2. Set a NEW password (e.g. SimplePass123) and save')
        console.error('3. In backend/.env set MONGODB_PASSWORD=SimplePass123 (the new password)')
        console.error('4. Restart: npm run dev')
        console.error('')
      }
      process.exit(1)
    }
  } else {
    console.warn('MONGODB_URI not set – content and forms will not persist')
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start().catch(console.error)
