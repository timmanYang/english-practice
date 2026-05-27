import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../services/dataLoader'
import { playClick } from '../utils/sound'
import { speak } from '../utils/speech'
import SpeakerButton from './SpeakerButton'
import ConfirmLeave from './ConfirmLeave'

export default function Reading() {
  const { grade } = useParams<{ grade: string }>()
  const navigate = useNavigate()
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const gradeNum = Number(grade)
  const { list, loading } = useData(gradeNum, 'readings')

  const queueRef = useRef<number[]>([])

  const pickNext = useCallback(() => {
    if (list.length === 0) return undefined
    if (queueRef.current.length === 0) {
      const indices = Array.from({ length: list.length }, (_, i) => i)
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]
      }
      queueRef.current = indices
    }
    return queueRef.current.shift()
  }, [list.length])

  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    if (list.length) {
      const indices = Array.from({ length: list.length }, (_, i) => i)
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]
      }
      queueRef.current = indices.slice(1)
      setCurrentIndex(indices[0])
    }
  }, [list.length])

  const [isSpeaking, setIsSpeaking] = useState(false)
  const hasAutoRead = useRef(false)

  const current = list[currentIndex] || { en: '', zh: '' }

  useEffect(() => {
    if (!hasAutoRead.current && current.en) {
      hasAutoRead.current = true
      setIsSpeaking(true)
      speak(current.en, 0.85).finally(() => setIsSpeaking(false))
    }
  }, [currentIndex, current.en])

  const handleSpeak = useCallback(() => {
    if (isSpeaking) return
    setIsSpeaking(true)
    speak(current.en, 0.85).finally(() => setIsSpeaking(false))
  }, [current.en, isSpeaking])

  const handleNext = useCallback(() => {
    const nextIndex = pickNext()
    if (nextIndex === undefined || nextIndex === null) return
    setCurrentIndex(nextIndex)
    hasAutoRead.current = false
    playClick()
  }, [pickNext])

  if (loading || currentIndex === -1) {
    return (
      <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="loading-state"><div className="loading-spinner" />加载中...</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.25 }}
    >
      <div className="polkadot-bg" />
      <span className="page-deco" style={{ top: '8%', left: '5%' }}>📖</span>
      <span className="page-deco" style={{ top: '18%', right: '8%', fontSize: 22, animationDelay: '1.5s' }}>✨</span>
      <span className="page-deco" style={{ bottom: '12%', left: '8%', fontSize: 22, animationDelay: '3s' }}>🌟</span>
      <div className="game-container">
        <div className="game-header">
          <button className="back-btn" onClick={() => setShowLeaveConfirm(true)}>← 返回</button>
          <span className="progress-text">美文欣赏</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="game-card reading-card"
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <span className="game-hint-label">📖 美文欣赏</span>
            <div className="reading-en-row">
              <span className="reading-en">{current.en}</span>
              <SpeakerButton text={current.en} size={28} />
            </div>
            <div className="reading-divider" />
            <span className="reading-zh">{current.zh}</span>
            <div className="reading-actions">
              <motion.button
                className={`btn-read ${isSpeaking ? 'speaking' : ''}`}
                onClick={handleSpeak}
                disabled={isSpeaking}
                whileTap={{ scale: 0.92 }}
              >
                {isSpeaking ? '🔊 朗读中...' : '🔊 再听一次'}
              </motion.button>
              <motion.button
                className="btn-next-reading"
                onClick={handleNext}
                whileTap={{ scale: 0.92 }}
              >
                下一篇 →
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <ConfirmLeave show={showLeaveConfirm} onConfirm={() => navigate('/')} onCancel={() => setShowLeaveConfirm(false)} />
    </motion.div>
  )
}
