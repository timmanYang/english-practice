import type React from 'react'

export interface Item {
  en: string
  zh: string
}

export interface ApiResponse {
  grade: number
  count: number
  label: string
  items: Item[]
}

export interface DataState {
  list: Item[]
  loading: boolean
  error: string | null
}

export type Semester = 'upper' | 'lower'

export type DataType = 'words' | 'sentences' | 'readings' | 'units'

export interface UnitEntry {
  en: string
  zh: string
}

export interface Unit {
  label: string
  title: string
  items: UnitEntry[]
}

export interface UnitsResponse {
  grade: number
  totalUnits: number
  units: Unit[]
}

export interface GameResult {
  emoji: string
  title: string
  msg: string
}

export interface MatchCard {
  id: string
  text: string
  pairId: number
  type: 'en' | 'zh'
}

export interface Question {
  en: string
  correct: string
  options: string[]
}

export interface ConfirmLeaveProps {
  show: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  confirmText?: string
  cancelText?: string
}

export interface SpeakerButtonProps {
  text: string
  size?: number
  className?: string
  style?: React.CSSProperties
}

export interface ConfettiProps {
  count?: number
  duration?: number
}

export interface Note {
  freq: number
  duration: number
  delay: number
}
