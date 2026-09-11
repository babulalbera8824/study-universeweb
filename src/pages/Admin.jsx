import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase.js'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('course')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  // Course form
  const [courseData, setCourseData] = useState({ title: '', description: '', category: '', emoji: '📚' })
  // Video form
  const [videoData, setVideoData] = useState({ title: '', description: '', youtubeUrl: '', courseId: '', courseName: '' })
  const [videoFile, setVideoFile] = useState(null)
  // PDF form
  const [pdfData, setPdfData] = useState({ title: '', description: '', courseId: '', courseName: '' })
  const [pdfFile, setPdfFile] = useState(null)

  const handleUpload = async (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path)
      const task = uploadBytesResumable(storageRef, file)
      task.on('state_changed',
        (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
          setProgress(pct)
        },
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(task.snapshot.ref)
          resolve(url)
        }
      )
    })
  }

  const handleCourseSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      await addDoc(collection(db, 'courses'), {
        ...courseData,
        createdAt: serverTimestamp()
      })
      setMessage('✅ Course added successfully!')
      setCourseData({ title: '', description: '', category: '', emoji: '📚' })
    } catch (err) {
      setMessage('❌ ' + err.message)
    } finally {
      setUploading(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleVideoSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setProgress(0)
    try {
      let videoUrl = ''
      if (videoFile) {
        videoUrl = await handleUpload(videoFile, `videos/${Date.now()}_${videoFile.name}`)
      }
      await addDoc(collection(db, 'videos'), {
        ...videoData,
        videoUrl,
        createdAt: serverTimestamp()
      })
      setMessage('✅ Video added successfully!')
      setVideoData({ title: '', description: '', youtubeUrl: '', courseId: '', courseName: '' })
      setVideoFile(null)
    } catch (err) {
      setMessage('❌ ' + err.message)
    } finally {
      setUploading(false)
      setProgress(0)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handlePdfSubmit = async (e) => {
    e.preventDefault()
    if (!pdfFile) {
      setMessage('❌ Please select a PDF file')
      return
    }
    setUploading(true)
    setProgress(0)
    try {
      const pdfUrl = await handleUpload(pdfFile, `pdfs/${Date.now()}_${pdfFile.name}`)
      await addDoc(collection(db, 'pdfs'), {
        ...pdfData,
        pdfUrl,
        size: `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB`,
        createdAt: serverTimestamp()
      })
      setMessage('✅ PDF uploaded successfully!')
      setPdfData({ title: '', description: '', courseId: '', courseName: '' })
      setPdfFile(null)
    } catch (err) {
      setMessage('❌ ' + err.message)
    } finally {
      setUploading(false)
      setProgress(0)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const tabBtn = (id, label) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-xl text-sm font-medium ${activeTab === id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
    >
      {label}
    </button>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="text-gray-600 mt-1">Manage courses, videos and PDFs - Firebase Storage upload working</p>

      <div className="mt-6 flex gap-2">
        {tabBtn('course', 'Add Course')}
        {tabBtn('video', 'Add Video')}
        {tabBtn('pdf', 'Add PDF')}
      </div>

      {message && <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm">{message}</div>}
      {uploading && progress > 0 && (
        <div className="mt-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-gray-500 mt-1">Uploading {progress}%</div>
        </div>
      )}

      <div className="mt-6 bg-white border rounded-2xl p-6">
        {activeTab === 'course' && (
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <h3 className="font-semibold">New Course</h3>
            <input required value={courseData.title} onChange={e => setCourseData({ ...courseData, title: e.target.value })} placeholder="Course Title e.g. Class 12 Physics" className="w-full px-4 py-2.5 border rounded-xl" />
            <textarea required value={courseData.description} onChange={e => setCourseData({ ...courseData, description: e.target.value })} placeholder="Description" className="w-full px-4 py-2.5 border rounded-xl" rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <input value={courseData.category} onChange={e => setCourseData({ ...courseData, category: e.target.value })} placeholder="Category e.g. Science" className="w-full px-4 py-2.5 border rounded-xl" />
              <input value={courseData.emoji} onChange={e => setCourseData({ ...courseData, emoji: e.target.value })} placeholder="Emoji icon" className="w-full px-4 py-2.5 border rounded-xl" />
            </div>
            <button disabled={uploading} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium">Add Course</button>
          </form>
        )}

        {activeTab === 'video' && (
          <form onSubmit={handleVideoSubmit} className="space-y-4">
            <h3 className="font-semibold">New Video Lecture</h3>
            <input required value={videoData.title} onChange={e => setVideoData({ ...videoData, title: e.target.value })} placeholder="Video Title" className="w-full px-4 py-2.5 border rounded-xl" />
            <input value={videoData.youtubeUrl} onChange={e => setVideoData({ ...videoData, youtubeUrl: e.target.value })} placeholder="YouTube URL (optional, e.g. https://youtu.be/... )" className="w-full px-4 py-2.5 border rounded-xl" />
            <textarea value={videoData.description} onChange={e => setVideoData({ ...videoData, description: e.target.value })} placeholder="Description" className="w-full px-4 py-2.5 border rounded-xl" rows={2} />
            <div className="grid grid-cols-2 gap-4">
              <input value={videoData.courseId} onChange={e => setVideoData({ ...videoData, courseId: e.target.value })} placeholder="Course ID (from Firestore)" className="w-full px-4 py-2.5 border rounded-xl" />
              <input value={videoData.courseName} onChange={e => setVideoData({ ...videoData, courseName: e.target.value })} placeholder="Course Name" className="w-full px-4 py-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium">Upload Video File (optional if YouTube used)</label>
              <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} className="mt-1 w-full px-4 py-2.5 border rounded-xl" />
            </div>
            <button disabled={uploading} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium">Add Video</button>
          </form>
        )}

        {activeTab === 'pdf' && (
          <form onSubmit={handlePdfSubmit} className="space-y-4">
            <h3 className="font-semibold">Upload PDF</h3>
            <input required value={pdfData.title} onChange={e => setPdfData({ ...pdfData, title: e.target.value })} placeholder="PDF Title e.g. Physics Notes Ch1" className="w-full px-4 py-2.5 border rounded-xl" />
            <textarea value={pdfData.description} onChange={e => setPdfData({ ...pdfData, description: e.target.value })} placeholder="Description" className="w-full px-4 py-2.5 border rounded-xl" rows={2} />
            <div className="grid grid-cols-2 gap-4">
              <input value={pdfData.courseId} onChange={e => setPdfData({ ...pdfData, courseId: e.target.value })} placeholder="Course ID" className="w-full px-4 py-2.5 border rounded-xl" />
              <input value={pdfData.courseName} onChange={e => setPdfData({ ...pdfData, courseName: e.target.value })} placeholder="Course Name" className="w-full px-4 py-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium">Select PDF File *</label>
              <input required type="file" accept=".pdf" onChange={e => setPdfFile(e.target.files[0])} className="mt-1 w-full px-4 py-2.5 border rounded-xl" />
            </div>
            <button disabled={uploading} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium">
              {uploading ? `Uploading ${progress}%` : 'Upload PDF to Firebase Storage'}
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
        <strong>Storage Rules:</strong> Firebase Console {'>'} Storage {'>'} Rules me ye lagao: allow read: if true; allow write: if request.auth != null;
      </div>
    </div>
  )
}

export default Admin
