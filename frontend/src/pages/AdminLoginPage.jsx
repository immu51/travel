/**
 * Admin login: password-only. Forgot password = OTP to recovery email, then set new password.
 */
import { useState, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { verifyAdminPassword, isAdminAuthenticated } from '../lib/adminAuth'
import { hasApi, getRecoveryEmail, forgotPasswordApi, verifyOtpResetApi } from '../lib/api'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotStep, setForgotStep] = useState(1)
  const [recoveryEmailMask, setRecoveryEmailMask] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (showForgot && hasApi()) {
      getRecoveryEmail().then((r) => {
        if (r?.ok && r.email) setRecoveryEmailMask(r.email)
      })
    }
  }, [showForgot])

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
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
        setError('Admin login not configured. Set VITE_ADMIN_PASSWORD_HASH in Vercel (or backend ADMIN_RECOVERY_EMAIL + Gmail for forgot password).')
      } else {
        setError('Invalid password. Use "Forgot password?" to reset via email OTP.')
      }
    } catch (_) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      const result = await forgotPasswordApi()
      if (result.ok) {
        setOtpSent(true)
        setForgotStep(2)
      } else {
        if (result.reason === 'not_configured') {
          setError('Recovery email not set up. Add ADMIN_RECOVERY_EMAIL, GMAIL_USER and GMAIL_APP_PASSWORD in backend .env.')
        } else {
          setError('Could not send OTP. Try again or check backend email config.')
        }
      }
    } catch (_) {
      setError('Network error. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtpAndReset = async (e) => {
    e.preventDefault()
    setError('')
    if (!otp.trim() || !newPassword.trim()) {
      setError('Enter OTP and new password.')
      return
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const result = await verifyOtpResetApi(otp, newPassword)
      if (result.ok) {
        setResetSuccess(true)
        setOtp('')
        setNewPassword('')
        setForgotStep(1)
        setOtpSent(false)
      } else {
        if (result.reason === 'otp_expired') setError('OTP expired. Request a new one.')
        else if (result.reason === 'invalid_otp') setError('Invalid OTP. Check the code and try again.')
        else setError('Could not reset password. Try again.')
      }
    } catch (_) {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const closeForgot = () => {
    setShowForgot(false)
    setForgotStep(1)
    setOtpSent(false)
    setOtp('')
    setNewPassword('')
    setError('')
    setResetSuccess(false)
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
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] transition-colors disabled:opacity-70"
                >
                  {loading ? 'Checking...' : 'Login'}
                </button>
                <p className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => { setShowForgot(true); setError('') }}
                    className="text-sm text-primary/60 hover:text-accent transition-colors"
                  >
                    Forgot password?
                  </button>
                </p>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              {resetSuccess ? (
                <>
                  <p className="text-green-600 text-sm font-medium text-center">
                    Password reset successfully. Log in with your new password.
                  </p>
                  <button
                    type="button"
                    onClick={closeForgot}
                    className="w-full py-3 rounded-xl font-heading font-semibold bg-accent text-primary"
                  >
                    Back to Login
                  </button>
                </>
              ) : hasApi() ? (
                <>
                  {forgotStep === 1 && (
                    <>
                      <p className="text-primary/90 text-sm">
                        We will send a 6-digit OTP to your recovery email{recoveryEmailMask ? ` (${recoveryEmailMask})` : ''}. Enter the OTP and set a new password in the next step.
                      </p>
                      {error && <p className="text-red-600 text-sm">{error}</p>}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={loading}
                          className="flex-1 py-3 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] disabled:opacity-70"
                        >
                          {loading ? 'Sending...' : 'Send OTP to email'}
                        </button>
                        <button
                          type="button"
                          onClick={closeForgot}
                          className="px-4 py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium"
                        >
                          Back
                        </button>
                      </div>
                    </>
                  )}
                  {forgotStep === 2 && (
                    <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
                      <p className="text-primary/90 text-sm">
                        Check your inbox (and spam) for the OTP. Enter it below with your new password.
                      </p>
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
                      <div>
                        <label htmlFor="forgot-new-password" className="block text-sm font-medium text-primary mb-1">New password</label>
                        <input
                          id="forgot-new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          minLength={6}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 text-primary outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                      </div>
                      {error && <p className="text-red-600 text-sm">{error}</p>}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3 rounded-xl font-heading font-semibold bg-accent text-primary hover:bg-[#e8914a] disabled:opacity-70"
                        >
                          {loading ? 'Resetting...' : 'Verify OTP & set password'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setForgotStep(1); setOtp(''); setNewPassword(''); setError(''); }}
                          className="px-4 py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium"
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <>
                  <p className="text-primary/90 text-sm font-medium mb-2">OTP reset needs the backend to be configured.</p>
                  <ul className="text-primary/80 text-sm list-disc list-inside space-y-1 mb-4">
                    <li><strong>Frontend (Vercel):</strong> Add <code className="bg-primary/10 px-1 rounded">VITE_API_URL</code> = your backend URL (e.g. <code className="bg-primary/10 px-1 rounded">https://your-api.railway.app</code>)</li>
                    <li><strong>Backend (.env):</strong> Add <code className="bg-primary/10 px-1 rounded">ADMIN_RECOVERY_EMAIL</code>, <code className="bg-primary/10 px-1 rounded">GMAIL_USER</code>, <code className="bg-primary/10 px-1 rounded">GMAIL_APP_PASSWORD</code></li>
                  </ul>
                  <p className="text-primary/70 text-xs">Redeploy the frontend after changing VITE_API_URL. Then use &quot;Forgot password?&quot; again to send OTP to your recovery email.</p>
                  <button type="button" onClick={closeForgot} className="w-full py-3 rounded-xl border border-primary/20 text-primary text-sm font-medium mt-3">
                    Back to Login
                  </button>
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
