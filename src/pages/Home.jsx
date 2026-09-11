import { Link } from 'react-router-dom'
import { useFirestore } from '../hooks/useFirestore.js'

const Home = () => {
  const { data: courses } = useFirestore('courses')

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-sm mb-6">100% Free Education Platform</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Padhega India<br />Tabhi Toh Badhega India
            </h1>
            <p className="mt-6 text-lg text-blue-100">
              Free courses, video lectures and PDFs. No fees, no subscription.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/courses" className="px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold">Explore Courses</Link>
              <Link to="/videos" className="px-6 py-3 bg-blue-500/50 backdrop-blur border border-white/20 rounded-xl font-semibold">Watch Videos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border"><div className="text-2xl font-bold">{courses.length}+</div><div className="text-sm text-gray-500">Courses</div></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border"><div className="text-2xl font-bold">100%</div><div className="text-sm text-gray-500">Free</div></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border"><div className="text-2xl font-bold">24/7</div><div className="text-sm text-gray-500">Access</div></div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.slice(0, 6).map(course => (
            <Link key={course.id} to={`/courses/${course.id}`} className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-3xl">{course.emoji || '📚'}</div>
              <div className="p-4">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
              </div>
            </Link>
          ))}
          {courses.length === 0 && <p className="text-gray-500">No courses yet. Admin can add from /admin</p>}
        </div>
      </section>
    </div>
  )
}

export default Home
