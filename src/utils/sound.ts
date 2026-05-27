import type { Note } from '../types'

let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return ctx
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  try {
    const c = getCtx()
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, c.currentTime)
    gain.gain.setValueAtTime(volume, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start()
    osc.stop(c.currentTime + duration)
  } catch {}
}

function playNotes(notes: Note[], baseTime = 0, type: OscillatorType = 'sine', volume = 0.25) {
  try {
    const c = getCtx()
    notes.forEach(([freq, duration, delay]) => {
      const osc = c.createOscillator()
      const gain = c.createGain()
      osc.type = type
      const start = c.currentTime + (baseTime || 0) + (delay || 0)
      osc.frequency.setValueAtTime(freq, start)
      gain.gain.setValueAtTime(volume, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
      osc.connect(gain)
      gain.connect(c.destination)
      osc.start(start)
      osc.stop(start + duration)
    })
  } catch {}
}

export function playCorrect() {
  playNotes([
    [523, 0.15, 0],
    [659, 0.15, 0.12],
    [784, 0.25, 0.24],
  ], 0, 'sine', 0.3)
}

export function playWrong() {
  playNotes([
    [300, 0.2, 0],
    [200, 0.3, 0.15],
  ], 0, 'square', 0.15)
}

export function playFlip() {
  playNotes([
    [600, 0.08, 0],
    [800, 0.08, 0.06],
  ], 0, 'sine', 0.2)
}

export function playClick() {
  playTone(1000, 0.05, 'sine', 0.1)
}

export function playMatch() {
  playNotes([
    [523, 0.1, 0],
    [784, 0.1, 0.08],
    [1047, 0.2, 0.16],
  ], 0, 'sine', 0.25)
}

export function playComplete() {
  playNotes([
    [523, 0.12, 0],
    [587, 0.12, 0.12],
    [659, 0.12, 0.24],
    [784, 0.12, 0.36],
    [1047, 0.35, 0.48],
  ], 0, 'triangle', 0.3)
}

export async function initAudio() {
  try {
    const c = getCtx()
    if (c.state === 'suspended') {
      await c.resume()
    }
  } catch {}
}
