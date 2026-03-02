/**
 * Create or update the first Admin (for forgot-password flow).
 * Run: node scripts/createAdmin.js
 * Requires in .env: ADMIN_EMAIL, ADMIN_PASSWORD, and MongoDB connection vars.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'

const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = (process.env.ADMIN_PASSWORD || '').trim()

async function run() {
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env')
    process.exit(1)
  }
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI
  if (!uri) {
    console.error('Set MONGODB_URI or MONGO_URI in .env')
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
