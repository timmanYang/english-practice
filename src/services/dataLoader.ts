import { useState, useEffect } from 'react'
import { fetchWords, fetchSentences, fetchReadings, fetchUnits } from './api'
import type { Item, DataType, DataState, Unit, UnitsResponse } from '../types'

const cache: Record<string, Item[]> = {}
const unitsCache: Record<string, Unit[]> = {}

function fetchData(type: DataType, grade: number, semester: string): Promise<Item[]> {
  switch (type) {
    case 'words': return fetchWords(grade, semester)
    case 'sentences': return fetchSentences(grade, semester)
    case 'readings': return fetchReadings(grade, semester)
    default: return Promise.reject(new Error(`Unknown type: ${type}`))
  }
}

export function useData(grade: number | undefined, type: DataType, semester: string = 'upper'): DataState {
  const cacheKey = `${grade}_${type}_${semester}`
  const [state, setState] = useState<DataState>(() => {
    if (cache[cacheKey]) return { list: cache[cacheKey], loading: false, error: null }
    return { list: [], loading: true, error: null }
  })

  useEffect(() => {
    if (cache[cacheKey] || grade === undefined) return
    let cancelled = false
    fetchData(type, grade, semester)
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
  }, [grade, type, semester, cacheKey])

  return state
}

export function useUnits(grade: number | undefined, semester: string = 'upper') {
  const cacheKey = `units_${grade}_${semester}`
  const [state, setState] = useState<{ units: Unit[]; loading: boolean; error: string | null }>(() => {
    if (unitsCache[cacheKey]) return { units: unitsCache[cacheKey], loading: false, error: null }
    return { units: [], loading: true, error: null }
  })

  useEffect(() => {
    if (unitsCache[cacheKey] || grade === undefined) return
    let cancelled = false
    fetchUnits(grade, semester)
      .then((res: UnitsResponse) => {
        if (cancelled) return
        unitsCache[cacheKey] = res.units
        setState({ units: res.units, loading: false, error: null })
      })
      .catch(err => {
        if (cancelled) return
        setState({ units: [], loading: false, error: err.message })
      })
    return () => { cancelled = true }
  }, [grade, semester, cacheKey])

  return state
}
