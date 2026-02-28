import { Router } from 'express'
import Contact from '../models/Contact.js'
import Booking from '../models/Booking.js'
import HotelEnquiry from '../models/HotelEnquiry.js'
import CarRental from '../models/CarRental.js'

const router = Router()

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {}
    await Contact.create({
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      message: String(message || '').trim(),
    })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/booking', async (req, res) => {
  try {
    const { name, email, phone, travelDate, travelers, message } = req.body || {}
    await Booking.create({
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      travelDate: String(travelDate || '').trim(),
      travelers: String(travelers || '').trim(),
      message: String(message || '').trim(),
    })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/hotel', async (req, res) => {
  try {
    const { name, email, phone, checkIn, checkOut, guests, city, roomType, message } = req.body || {}
    await HotelEnquiry.create({
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      checkIn: String(checkIn || '').trim(),
      checkOut: String(checkOut || '').trim(),
      guests: String(guests || '').trim(),
      city: String(city || '').trim(),
      roomType: String(roomType || '').trim(),
      message: String(message || '').trim(),
    })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/car-rental', async (req, res) => {
  try {
    const { name, email, phone, pickupDate, vehicle, message } = req.body || {}
    await CarRental.create({
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      pickupDate: String(pickupDate || '').trim(),
      vehicle: String(vehicle || '').trim(),
      message: String(message || '').trim(),
    })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
