import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { speak } from '../utils/speech'

export default function SpeakerButton({ text, size = 28, className = '', style = {} }) {
  const [playing, setPlaying] = useState(false)

  const handleSpeak = useCallback(async (e) => {
    e.stopPropagation()
    if (playing) return
    setPlaying(true)
    await speak(text)
    setPlaying(false)
  }, [text, playing])

  return (
    <motion.button
      className={`speaker-btn ${className}`}
      onClick={handleSpeak}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.15 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 4,
        height: size + 4,
        borderRadius: '50%',
        border: 'none',
        background: playing ? 'rgba(78,205,196,0.2)' : 'rgba(0,0,0,0.04)',
        cursor: 'pointer',
        fontSize: size * 0.65,
        transition: 'all 0.2s',
        position: 'relative',
        ...style,
      }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.span
            key="wave"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            🔊
          </motion.span>
        ) : (
          <motion.span
            key="speaker"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            🔈
          </motion.span>
        )}
      </AnimatePresence>
      {/* Ripple animation */}
      <AnimatePresence>
        {playing && (
          <motion.span
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid var(--secondary)',
            }}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
