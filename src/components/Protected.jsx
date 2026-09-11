import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Protected = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-600">Only admin can access this page.</p>
        <p className="text-sm mt-2 text-gray-500">Admin: {import.meta.env.VITE_ADMIN_EMAIL}</p>
      </div>
    )
  }

  return children
}

export default Protected
