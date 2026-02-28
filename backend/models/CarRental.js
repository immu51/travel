import mongoose from 'mongoose'

const carRentalSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    pickupDate: String,
    vehicle: String,
    message: String,
  },
  { timestamps: true }
)

export default mongoose.model('CarRental', carRentalSchema)
