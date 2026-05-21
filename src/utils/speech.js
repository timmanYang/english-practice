import { TextToSpeech } from '@capacitor-community/text-to-speech'

let useNative = true

export async function speak(text, rate = 0.9) {
  if (useNative) {
    try {
      await TextToSpeech.speak({ text, lang: 'en-US', rate, pitch: 1.1, volume: 1 })
      return
    } catch {
      useNative = false
    }
  }

  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    utterance.pitch = 1.1
    utterance.volume = 1

    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Female')
    ) || voices.find(v => v.lang.startsWith('en'))

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    return new Promise((resolve) => {
      utterance.onend = resolve
      utterance.onerror = resolve
      window.speechSynthesis.speak(utterance)
    })
  } catch {
    // Speech synthesis not available
  }
}
