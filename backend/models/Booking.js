import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    travelDate: String,
    travelers: String,
    message: String,
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
