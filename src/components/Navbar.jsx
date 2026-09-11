import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const linkClass = (path) => 
    `px-3 py-2 rounded-lg text-sm font-medium transition ${location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">S</div>
          Study Universe
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/courses" className={linkClass('/courses')}>Courses</Link>
          <Link to="/videos" className={linkClass('/videos')}>Videos</Link>
          <Link to="/pdfs" className={linkClass('/pdfs')}>PDFs</Link>
          {isAdmin && <Link to="/admin" className={linkClass('/admin')}>Admin</Link>}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-gray-600">{user.email}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile bottom */}
      <div className="md:hidden flex gap-1 p-2 overflow-x-auto border-t bg-white">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/courses" className={linkClass('/courses')}>Courses</Link>
        <Link to="/videos" className={linkClass('/videos')}>Videos</Link>
        <Link to="/pdfs" className={linkClass('/pdfs')}>PDFs</Link>
        {isAdmin && <Link to="/admin" className={linkClass('/admin')}>Admin</Link>}
      </div>
    </nav>
  )
}

export default Navbar
