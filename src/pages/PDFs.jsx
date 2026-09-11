import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore.js'

const PDFs = () => {
  const { data: pdfs, loading } = useFirestore('pdfs')
  const [selected, setSelected] = useState(null)

  if (loading) return <div className="p-8 text-center">Loading PDFs...</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">Study Material PDFs</h1>
      <p className="text-gray-600 mb-8">Download free notes, PYQs and books</p>

      {selected && (
        <div className="mb-8 bg-white rounded-2xl border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">{selected.title}</h3>
            <div className="flex gap-2">
              <a href={selected.pdfUrl} target="_blank" rel="noopener" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Open / Download</a>
              <button onClick={() => setSelected(null)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Close</button>
            </div>
          </div>
          <div className="h-[70vh] bg-gray-100">
            <iframe src={selected.pdfUrl} className="w-full h-full" title={selected.title} />
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {pdfs.map(pdf => (
          <div key={pdf.id} className="bg-white rounded-2xl border p-5 hover:shadow-md transition">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl mb-3">📄</div>
            <h3 className="font-semibold">{pdf.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{pdf.description}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setSelected(pdf)} className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-sm">View</button>
              <a href={pdf.pdfUrl} target="_blank" rel="noopener" className="flex-1 py-2 bg-white border text-center rounded-lg text-sm">Download</a>
            </div>
            <div className="mt-3 text-xs text-gray-400">{pdf.courseName || 'General'} • {pdf.size || ''}</div>
          </div>
        ))}
      </div>

      {pdfs.length === 0 && <div className="text-center py-12 text-gray-500">No PDFs yet. Upload from Admin panel.</div>}
    </div>
  )
}

export default PDFs
