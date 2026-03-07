import { Router } from 'express'
import Contact from '../models/Contact.js'
import Booking from '../models/Booking.js'
import HotelEnquiry from '../models/HotelEnquiry.js'
import CarRental from '../models/CarRental.js'
import { sendFormEmail, formBodyHtml } from '../lib/sendFormEmail.js'

const router = Router()

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {}
    const data = {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      message: String(message || '').trim(),
    }
    await Contact.create(data)
    try {
      await sendFormEmail(
        null,
        `[TraverraX] Contact form: ${data.name}`,
        formBodyHtml({ Name: data.name, Email: data.email, Phone: data.phone, Message: data.message })
      )
    } catch (e) {
      console.warn('Form email failed:', e?.message)
    }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/booking', async (req, res) => {
  try {
    const { name, email, phone, travelDate, travelers, message } = req.body || {}
    const data = {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      travelDate: String(travelDate || '').trim(),
      travelers: String(travelers || '').trim(),
      message: String(message || '').trim(),
    }
    await Booking.create(data)
    try {
      await sendFormEmail(
        null,
        `[TraverraX] Tour booking enquiry: ${data.name}`,
        formBodyHtml({
          Name: data.name,
          Email: data.email,
          Phone: data.phone,
          'Travel date': data.travelDate,
          'Number of travelers': data.travelers,
          Message: data.message,
        })
      )
    } catch (e) {
      console.warn('Form email failed:', e?.message)
    }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/hotel', async (req, res) => {
  try {
    const { name, email, phone, checkIn, checkOut, guests, city, roomType, message } = req.body || {}
    const data = {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      checkIn: String(checkIn || '').trim(),
      checkOut: String(checkOut || '').trim(),
      guests: String(guests || '').trim(),
      city: String(city || '').trim(),
      roomType: String(roomType || '').trim(),
      message: String(message || '').trim(),
    }
    await HotelEnquiry.create(data)
    try {
      await sendFormEmail(
        null,
        `[TraverraX] Hotel reservation: ${data.name} – ${data.city || 'Any'}`,
        formBodyHtml({
          Name: data.name,
          Email: data.email,
          Phone: data.phone,
          'Check-in': data.checkIn,
          'Check-out': data.checkOut,
          Guests: data.guests,
          City: data.city,
          'Room type': data.roomType,
          Message: data.message,
        })
      )
    } catch (e) {
      console.warn('Form email failed:', e?.message)
    }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/car-rental', async (req, res) => {
  try {
    const { name, email, phone, pickupDate, vehicle, message } = req.body || {}
    const data = {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      pickupDate: String(pickupDate || '').trim(),
      vehicle: String(vehicle || '').trim(),
      message: String(message || '').trim(),
    }
    await CarRental.create(data)
    try {
      await sendFormEmail(
        null,
        `[TraverraX] Car rental / taxi: ${data.name}`,
        formBodyHtml({
          Name: data.name,
          Email: data.email,
          Phone: data.phone,
          'Pickup date': data.pickupDate,
          Vehicle: data.vehicle,
          Message: data.message,
        })
      )
    } catch (e) {
      console.warn('Form email failed:', e?.message)
    }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
