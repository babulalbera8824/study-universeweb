import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Protected from './components/Protected.jsx'
import Home from './pages/Home.jsx'
import Videos from './pages/Videos.jsx'
import PDFs from './pages/PDFs.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/pdfs" element={<PDFs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <Protected adminOnly>
                  <Admin />
                </Protected>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
