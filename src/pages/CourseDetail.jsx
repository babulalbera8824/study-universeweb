import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { useFirestore } from '../hooks/useFirestore.js'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loadingCourse, setLoadingCourse] = useState(true)
  const { data: videos } = useFirestore('videos', 'courseId', id)
  const { data: pdfs } = useFirestore('pdfs', 'courseId', id)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const snap = await getDoc(doc(db, 'courses', id))
        if (snap.exists()) setCourse({ id: snap.id, ...snap.data() })
      } finally {
        setLoadingCourse(false)
      }
    }
    fetchCourse()
  }, [id])

  if (loadingCourse) return <div className="p-8 text-center">Loading course...</div>
  if (!course) return <div className="p-8 text-center">Course not found</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link to="/courses" className="text-sm text-gray-600 hover:text-black">← Back to Courses</Link>

      <div className="mt-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
        <div className="flex gap-4 items-start">
          <div className="text-5xl">{course.emoji || '🎓'}</div>
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-3 text-blue-100 max-w-2xl">{course.description}</p>
            <div className="mt-4 flex gap-6 text-sm">
              <span>{videos.length} Videos</span>
              <span>{pdfs.length} PDFs</span>
              <span>100% Free</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Videos ({videos.length})</h2>
          <div className="space-y-3">
            {videos.map(v => (
              <Link key={v.id} to="/videos" className="flex gap-3 p-3 bg-white border rounded-xl hover:bg-gray-50">
                <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center">▶</div>
                <div><div className="font-medium text-sm">{v.title}</div><div className="text-xs text-gray-500">{v.duration || 'Lecture'}</div></div>
              </Link>
            ))}
            {videos.length === 0 && <p className="text-sm text-gray-500">No videos added yet</p>}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">PDFs & Notes ({pdfs.length})</h2>
          <div className="space-y-3">
            {pdfs.map(p => (
              <a key={p.id} href={p.pdfUrl} target="_blank" rel="noopener" className="flex gap-3 p-3 bg-white border rounded-xl hover:bg-gray-50">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">PDF</div>
                <div><div className="font-medium text-sm">{p.title}</div><div className="text-xs text-gray-500">{p.size || 'Document'}</div></div>
              </a>
            ))}
            {pdfs.length === 0 && <p className="text-sm text-gray-500">No PDFs added yet</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
