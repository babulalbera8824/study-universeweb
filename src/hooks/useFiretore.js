import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from '../firebase.js'

export const useFirestore = (collectionName, filterField = null, filterValue = null) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      let q
      if (filterField && filterValue) {
        q = query(
          collection(db, collectionName), 
          where(filterField, '==', filterValue),
          orderBy('createdAt', 'desc')
        )
      } else {
        q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
      }

      const unsub = onSnapshot(q, 
        (snap) => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          setData(docs)
          setLoading(false)
        },
        (err) => {
          setError(err.message)
          setLoading(false)
        }
      )

      return () => unsub()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }, [collectionName, filterField, filterValue])

  return { data, loading, error }
}
