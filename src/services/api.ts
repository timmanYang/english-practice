import { CapacitorHttp, Capacitor } from '@capacitor/core'
import type { Item, ApiResponse } from '../types'

const API_BASE_URL: string = (import.meta as any).env?.VITE_API_URL?.replace(/\/+$/, '') || ''

const isNative = Capacitor.isNativePlatform()

async function fetchJson(endpoint: string): Promise<ApiResponse> {
  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint
  if (isNative) {
    const res = await CapacitorHttp.get({ url })
    if (res.status < 200 || res.status >= 300) throw new Error(`HTTP ${res.status}`)
    return res.data as ApiResponse
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const fetchWords = (grade: number): Promise<Item[]> =>
  fetchJson(`/api/words/${grade}`).then(r => r.items)

export const fetchSentences = (grade: number): Promise<Item[]> =>
  fetchJson(`/api/sentences/${grade}`).then(r => r.items)

export const fetchReadings = (grade: number): Promise<Item[]> =>
  fetchJson(`/api/readings/${grade}`).then(r => r.items)

export const fetchGrades = (): Promise<ApiResponse> => fetchJson('/api/grades')
