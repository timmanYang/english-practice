import { TextToSpeech } from '@capacitor-community/text-to-speech'
import { Capacitor } from '@capacitor/core'

export async function speak(text: string, rate = 0.9): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.speak({ text, lang: 'en-US', rate, pitch: 1.1, volume: 1 })
      return
    } catch {}
  }

  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()

    let voices = window.speechSynthesis.getVoices()
    if (!voices.length) {
      await new Promise<void>(resolve => {
        window.speechSynthesis.onvoiceschanged = () => resolve()
      })
      voices = window.speechSynthesis.getVoices()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    utterance.pitch = 1.1
    utterance.volume = 1

    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Female'))
    ) || voices.find(v => v.lang.startsWith('en'))

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    return new Promise(resolve => {
      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()
      window.speechSynthesis.speak(utterance)
    })
  } catch {}
}
