import { useState, useEffect } from 'react'
import { fetchWords, fetchSentences, fetchReadings } from './api'

const cache = {}

function fetchData(type, grade) {
  switch (type) {
    case 'words': return fetchWords(grade)
    case 'sentences': return fetchSentences(grade)
    case 'readings': return fetchReadings(grade)
    default: return Promise.reject(new Error(`Unknown type: ${type}`))
  }
}

export function useData(grade, type) {
  const cacheKey = `${grade}_${type}`
  const [state, setState] = useState(() => {
    if (cache[cacheKey]) return { list: cache[cacheKey], loading: false, error: null }
    return { list: [], loading: true, error: null }
  })

  useEffect(() => {
    if (cache[cacheKey]) return
    let cancelled = false
    fetchData(type, grade)
      .then(data => {
        if (cancelled) return
        cache[cacheKey] = data
        setState({ list: data, loading: false, error: null })
      })
      .catch(err => {
        if (cancelled) return
        setState({ list: [], loading: false, error: err.message })
      })
    return () => { cancelled = true }
  }, [grade, type, cacheKey])

  return state
}
