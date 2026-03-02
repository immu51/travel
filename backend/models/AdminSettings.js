import mongoose from 'mongoose'

const adminSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    passwordHash: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('AdminSettings', adminSettingsSchema)
