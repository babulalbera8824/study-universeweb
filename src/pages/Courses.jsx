import { Link } from 'react-router-dom'
import { useFirestore } from '../hooks/useFirestore.js'

const Courses = () => {
  const { data: courses, loading } = useFirestore('courses')

  if (loading) return <div className="p-8 text-center">Loading courses...</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">All Courses</h1>
      <p className="text-gray-600 mb-8">Choose your course and start learning for free</p>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`} className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition group">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex flex-col justify-between text-white">
              <div className="text-4xl">{course.emoji || '🎓'}</div>
              <div>
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-sm text-blue-100 mt-1">{course.category || 'General'}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              <div className="mt-3 text-sm font-medium text-blue-600 group-hover:underline">View Course →</div>
            </div>
          </Link>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="bg-white border rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="font-semibold">No courses yet</h3>
          <p className="text-sm text-gray-500 mt-1">Admin can add courses from /admin panel</p>
        </div>
      )}
    </div>
  )
}

export default Courses
