import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore.js'

const Videos = () => {
  const { data: videos, loading } = useFirestore('videos')
  const [selected, setSelected] = useState(null)

  const getYouTubeId = (url) => {
    if (!url) return null
    const reg = /(?:youtube\.com.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(reg)
    return match ? match[1] : null
  }

  if (loading) return <div className="p-8 text-center">Loading videos...</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">Video Lectures</h1>
      <p className="text-gray-600 mb-8">Free video lectures for all subjects</p>

      {selected && (
        <div className="mb-8 bg-black rounded-2xl overflow-hidden">
          <div className="aspect-video">
            {selected.youtubeUrl ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeId(selected.youtubeUrl)}`}
                allowFullScreen
                title={selected.title}
              />
            ) : (
              <video controls className="w-full h-full" src={selected.videoUrl} />
            )}
          </div>
          <div className="p-4 bg-gray-900 text-white">
            <h3 className="font-semibold">{selected.title}</h3>
            <p className="text-sm text-gray-400">{selected.description}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map(video => {
          const ytId = video.youtubeUrl ? getYouTubeId(video.youtubeUrl) : null
          return (
            <div key={video.id} onClick={() => setSelected(video)} className="bg-white rounded-2xl border overflow-hidden cursor-pointer hover:shadow-md transition">
              <div className="aspect-video bg-gray-100 relative">
                {ytId ? (
                  <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🎥</div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">▶</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{video.courseName || 'General'}</p>
              </div>
            </div>
          )
        })}
      </div>

      {videos.length === 0 && <div className="text-center py-12 text-gray-500">No videos yet. Add from Admin panel.</div>}
    </div>
  )
}

export default Videos
