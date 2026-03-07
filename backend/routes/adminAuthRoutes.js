import { Router } from 'express'
import { sendOtp, verifyOtp, resetPassword } from '../controllers/adminAuthController.js'
import { requireDb } from '../middleware/requireDb.js'
import { rateLimitSendOtp } from '../middleware/rateLimit.js'

const router = Router()

router.post('/send-otp', requireDb, rateLimitSendOtp, sendOtp)
router.post('/verify-otp', requireDb, verifyOtp)
router.post('/reset-password', requireDb, resetPassword)

export default router
