import mongoose from 'mongoose'

const hotelEnquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    checkIn: String,
    checkOut: String,
    guests: String,
    city: String,
    roomType: String,
    message: String,
  },
  { timestamps: true }
)

export default mongoose.model('HotelEnquiry', hotelEnquirySchema)
