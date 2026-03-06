/**
 * Admin login: password-only. Forgot password = step-based (email → OTP → new password).
 * Uses /api/admin/send-otp, verify-otp, reset-password when VITE_API_URL is set.
 */
import { useState, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { verifyAdminPassword, isAdminAuthenticated } from '../lib/adminAuth'
import { hasApi, adminSendOtp, adminVerifyOtp, adminResetPassword } from '../lib/api'

const RESEND_COOLDOWN_SEC = 30

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resendSec, setResendSec] = useState(0)
  const navigate = useNavigate()

  // Resend OTP cooldown timer
  useEffect(() => {
    if (resendSec <= 0) return
    const t = setInterval(() => setResendSec((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [resendSec])

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!password.trim()) {
      setError('Please enter the admin password.')
      return
    }
    setLoading(true)
    try {
      const result = await verifyAdminPassword(password)
      if (result.ok) {
        navigate('/admin', { replace: true })
        return
      }
      if (result.reason === 'not_configured') {
        setError('Backend URL not in build. In Vercel: add VITE_API_URL = your Railway URL (e.g. https://travel-production-f211.up.railway.app) for Production, then redeploy.')
      } else {
        setError('Invalid password. Use "Forgot password?" to reset.')
      }
    } catch (_) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async (e) => {
    e?.preventDefault()
    setError('')
    const em = email.trim().toLowerCase()
    if (!em) {
      setError('Enter your admin email.')
      return
    }
    setLoading(true)
    try {
      const result = await adminSendOtp(em)
      if (result.ok) {
        setStep(2)
        setResendSec(RESEND_COOLDOWN_SEC)
      } else {
        setError(result.message || 'Could not send OTP.')
      }
    } catch (_) {
      setError('Network error. Check VITE_API_URL and that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (!otp.trim()) {
      setError('Enter the OTP.')
      return
    }
    setLoading(true)
    try {
      const result = await adminVerifyOtp(email.trim().toLowerCase(), otp)
      if (result.ok) {
        setStep(3)
      } else {
        setError(result.message || 'Invalid or expired OTP.')
      }
    } catch (_) {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const result = await adminResetPassword(email.trim().toLowerCase(), newPassword)
      if (result.ok) {
        setShowForgot(false)
        setStep(1)
        setEmail('')
        setOtp('')
        setNewPassword('')
        setConfirmPassword('')
        setResendSec(0)
        setError('Password reset successfully. Log in with your new password.')
      } else {
        setError(result.message || 'Failed to reset password.')
      }
    } catch (_) {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const closeForgot = () => {
    setShowForgot(false)
    setStep(1)
    setEmail('')
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
    setError('')
    setResendSec(0)
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-2xl shadow-xl p-8 relative">
          <Link
            to="/"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-primary/50 hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Close and go back to site"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-primary text-center mb-2 pr-8">
            Admin Login
          </h1>
          <p className="text-text/70 text-sm text-center mb-6">
            TraverraX – content management
          </p>

          {!showForgot ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-primary mb-1">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 text-primary outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    autoFocus
                  />
                </div>
                {error && (
                  <p className={`text-sm ${error.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading && (
                    <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  )}
                  {loading ? 'Checking...' : 'Login'}
                </button>
                <p className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => { setShowForgot(true); setError(''); setStep(1); setEmail(''); setOtp(''); setNewPassword(''); setConfirmPassword(''); }}
                    className="text-sm text-primary/60 hover:text-accent transition-colors"
                  >
                    Forgot password?
                  </button>
                </p>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              {!hasApi() ? (
                <>
                  <div className="space-y-2 text-primary/90 text-sm">
                    <p className="font-medium">Backend not connected</p>
                    <p>1. In Vercel: your project → <strong>Settings</strong> → <strong>Environment Variables</strong>.</p>
                    <p>2. Add: <strong>Name</strong> = <code className="bg-primary/10 px-1 rounded">VITE_API_URL</code>, <strong>Value</strong> = your backend URL (e.g. <code className="bg-primary/10 px-1 rounded">https://travel-production-f211.up.railway.app</code>). No slash at the end.</p>
                    <p>3. Save and <strong>Redeploy</strong> the project. Then try Forgot password again.</p>
                  </div>
                  <button type="button" onClick={closeForgot} className="w-full py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium mt-3">
                    Back to Login
                  </button>
                </>
              ) : (
                <>
                  {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <p className="text-primary/90 text-sm">Enter your admin email. We will send a 6-digit OTP.</p>
                      <div>
                        <label htmlFor="forgot-email" className="block text-sm font-medium text-primary mb-1">Email</label>
                        <input
                          id="forgot-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 text-primary outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                          required
                        />
                      </div>
                      {error && <p className="text-red-600 text-sm">{error}</p>}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                          {loading && <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />}
                          {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                        <button type="button" onClick={closeForgot} className="px-4 py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium">
                          Back
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <p className="text-primary/90 text-sm">Check your inbox for the OTP and enter it below.</p>
                      <div>
                        <label htmlFor="forgot-otp" className="block text-sm font-medium text-primary mb-1">OTP</label>
                        <input
                          id="forgot-otp"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                          placeholder="000000"
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 text-primary outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                      </div>
                      {error && <p className="text-red-600 text-sm">{error}</p>}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] disabled:opacity-70 flex items-center justify-center gap-2 min-w-[120px]"
                        >
                          {loading && <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />}
                          {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={loading || resendSec > 0}
                          className="px-4 py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium disabled:opacity-50"
                        >
                          {resendSec > 0 ? `Resend OTP (${resendSec}s)` : 'Resend OTP'}
                        </button>
                        <button type="button" onClick={() => { setStep(1); setOtp(''); setError(''); }} className="px-4 py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium">
                          Back
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <p className="text-primary/90 text-sm">Enter your new password (min 6 characters).</p>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-primary mb-1">New password</label>
                        <input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          minLength={6}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 text-primary outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-primary mb-1">Confirm password</label>
                        <input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          minLength={6}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 text-primary outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                      </div>
                      {error && <p className="text-red-600 text-sm">{error}</p>}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                          {loading && <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />}
                          {loading ? 'Resetting...' : 'Reset password'}
                        </button>
                        <button type="button" onClick={() => { setStep(2); setNewPassword(''); setConfirmPassword(''); setError(''); }} className="px-4 py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium">
                          Back
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          )}

          <p className="text-center mt-4">
            <Link to="/" className="text-sm text-primary/60 hover:text-accent transition-colors">
              ← Close &amp; back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
