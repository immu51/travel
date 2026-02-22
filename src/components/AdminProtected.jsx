import { Navigate, useLocation } from 'react-router-dom'
import { isAdminAuthenticated } from '../lib/adminAuth'

/**
 * Protects /admin: redirect to /admin/login if not authenticated.
 */
export default function AdminProtected({ children }) {
  const location = useLocation()
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return children
}
