/**
 * Admin login: password-only. SHA-256 compared with VITE_ADMIN_PASSWORD_HASH.
 * Close option to go back to site. Forgot password = instructions to reset via env.
 */
import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { verifyAdminPassword, isAdminAuthenticated } from '../lib/adminAuth'
import { hasApi } from '../lib/api'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const navigate = useNavigate()

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
        setError('Admin login not configured. Set VITE_ADMIN_PASSWORD_HASH in Vercel → Project Settings → Environment Variables, then redeploy.')
      } else {
        setError('Invalid password. Access denied. Use "Forgot password?" below if you need to reset.')
      }
    } catch (_) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
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
                onClick={() => setShowForgot(!showForgot)}
                className="text-sm text-primary/60 hover:text-accent transition-colors"
              >
                Forgot password?
              </button>
            </p>
            {showForgot && (
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm text-primary/90 space-y-2">
                <p className="font-medium">Reset admin password</p>
                <p>There is no email recovery. To set a new password:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>On your computer, run: <code className="bg-white px-1 rounded text-xs">cd frontend && node scripts/generate-admin-hash.js "YourNewPassword"</code></li>
                  <li>Copy the value after <code className="bg-white px-1 rounded text-xs">VITE_ADMIN_PASSWORD_HASH=</code></li>
                  <li>In Vercel: Project → Settings → Environment Variables. Set <code className="bg-white px-1 rounded text-xs">VITE_ADMIN_PASSWORD_HASH</code> to that value. Redeploy.</li>
                  {hasApi() && <li>If you use a backend: set <code className="bg-white px-1 rounded text-xs">ADMIN_PASSWORD_HASH</code> to the same value in your backend env.</li>}
                </ol>
                <p>Then log in with <strong>YourNewPassword</strong>.</p>
              </div>
            )}
          </form>
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
