import { CapacitorHttp } from '@capacitor/core'
import { Capacitor } from '@capacitor/core'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

const isNative = Capacitor.isNativePlatform()

async function fetchJson(endpoint) {
  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint
  if (isNative) {
    const res = await CapacitorHttp.get({ url })
    if (res.status < 200 || res.status >= 300) throw new Error(`HTTP ${res.status}`)
    return res.data
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const fetchWords = (grade) =>
  fetchJson(`/api/words/${grade}`).then(r => r.items)

export const fetchSentences = (grade) =>
  fetchJson(`/api/sentences/${grade}`).then(r => r.items)

export const fetchReadings = (grade) =>
  fetchJson(`/api/readings/${grade}`).then(r => r.items)

export const fetchGrades = () => fetchJson('/api/grades')
