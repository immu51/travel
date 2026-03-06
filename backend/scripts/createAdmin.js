/**
 * Create or update the first Admin (for forgot-password flow).
 * Run: node scripts/createAdmin.js (from backend folder or with backend as cwd)
 * Requires: ADMIN_EMAIL, ADMIN_PASSWORD, and MongoDB connection (MONGODB_URI or MONGODB_USER+PASSWORD+CLUSTER).
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'

function getMongoUri() {
  const user = (process.env.MONGODB_USER || '').trim()
  const password = (process.env.MONGODB_PASSWORD || '').trim()
  const cluster = (process.env.MONGODB_CLUSTER || '').trim()
  const db = (process.env.MONGODB_DB || 'travel').trim()
  if (user && password && cluster) {
    return `mongodb+srv://${user}:${encodeURIComponent(password)}@${cluster}/${db}?retryWrites=true&w=majority`
  }
  return (process.env.MONGODB_URI || process.env.MONGO_URI || '').trim()
}

const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = (process.env.ADMIN_PASSWORD || '').trim()

async function run() {
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env')
    process.exit(1)
  }
  const uri = getMongoUri()
  if (!uri || !uri.startsWith('mongodb')) {
    console.error('Set MONGODB_URI (or MONGODB_USER, MONGODB_PASSWORD, MONGODB_CLUSTER) in .env')
    process.exit(1)
  }
  await mongoose.connect(uri)
  const hash = await bcrypt.hash(password, 10)
  await Admin.findOneAndUpdate(
    { email },
    { $set: { email, password: hash, resetOtp: '', resetOtpExpiry: null } },
    { upsert: true, new: true }
  )
  console.log('Admin created/updated for:', email)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
