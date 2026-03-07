import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    stars: { type: Number, default: 5 },
    quote: String,
    image: String,
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)
