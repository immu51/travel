import { Router } from 'express'
import { sendOtp, verifyOtp, resetPassword } from '../controllers/adminAuthController.js'
import { requireDb } from '../middleware/requireDb.js'

const router = Router()

// All admin auth routes require DB (Admin model)
router.post('/send-otp', requireDb, sendOtp)
router.post('/verify-otp', requireDb, verifyOtp)
router.post('/reset-password', requireDb, resetPassword)

export default router
