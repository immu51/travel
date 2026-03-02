import mongoose from 'mongoose'

/**
 * Admin model for email-based reset flow.
 * password: bcrypt hash. resetOtp / resetOtpExpiry for forgot-password.
 * Existing login (password-only) remains unchanged; can sync via AdminSettings.
 */
const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    resetOtp: { type: String, default: '' },
    resetOtpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('Admin', adminSchema)
