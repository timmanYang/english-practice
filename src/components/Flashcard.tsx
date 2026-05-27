import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../services/dataLoader'
import { playFlip, playClick } from '../utils/sound'
import { pickItems } from '../utils/shuffle'
import SpeakerButton from './SpeakerButton'
import ConfirmLeave from './ConfirmLeave'
import type { DataType } from '../types'

export default function Flashcard() {
  const { grade } = useParams<{ grade: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const dataType: DataType = location.pathname.includes('sentence-') ? 'sentences' : 'words'
  const gradeNum = Number(grade)
  const { list, loading } = useData(gradeNum, dataType)

  const [localShuffled, setLocalShuffled] = useState<{ en: string; zh: string }[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (list.length) {
      setLocalShuffled(pickItems(list, list.length, `flashcard_${grade}_${dataType}`))
      setIndex(0)
    }
  }, [list, grade, dataType])

  const [showZh, setShowZh] = useState(false)

  const displayWord = localShuffled[index] || { en: '', zh: '' }
  const progress = ((index + 1) / localShuffled.length) * 100

  const handleFlip = useCallback(() => {
    setShowZh(v => !v)
    playFlip()
  }, [])

  const next = useCallback(() => {
    if (index < localShuffled.length - 1) {
      setIndex(i => i + 1)
      setShowZh(false)
      playClick()
    }
  }, [index, localShuffled.length])

  const prev = useCallback(() => {
    if (index > 0) {
      setIndex(i => i - 1)
      setShowZh(false)
      playClick()
    }
  }, [index])

  const shuffle = useCallback(() => {
    const reshuffled = pickItems(list, list.length, `flashcard_${grade}_${dataType === 'sentences' ? 'sentence' : 'word'}`)
    setIndex(0)
    setShowZh(false)
    setLocalShuffled(reshuffled)
    playClick()
  }, [list, grade, dataType])

  if (loading) {
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
      <span className="page-deco" style={{ top: '8%', left: '5%' }}>🃏</span>
      <span className="page-deco" style={{ top: '15%', right: '8%', fontSize: 22, animationDelay: '1.5s' }}>💡</span>
      <span className="page-deco" style={{ bottom: '12%', left: '8%', fontSize: 22, animationDelay: '3s' }}>📖</span>
      <div className="game-container">
        <div className="game-header">
          <button className="back-btn" onClick={() => setShowLeaveConfirm(true)}>← 返回</button>
          <span className="progress-text">{index + 1} / {localShuffled.length}</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <motion.div
          className="game-card flashcard-inner"
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          onClick={handleFlip}
          whileTap={{ scale: 0.97 }}
        >
          {!showZh ? (
            <motion.div className="flashcard-face" key="en" initial={{ rotateY: 0 }} animate={{ rotateY: 0 }}>
              <span className="hint">{dataType === 'sentences' ? '🇬🇧 英文句式' : '🇬🇧 英文'}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="big-word">{displayWord.en}</span>
                <SpeakerButton text={displayWord.en} size={30} />
              </div>
              <span className="tap-hint">👆 点击翻转</span>
            </motion.div>
          ) : (
            <motion.div
              className="flashcard-face" key="zh"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <span className="hint">🇨🇳 中文</span>
              <span className="big-word zh">{displayWord.zh}</span>
              <span className="tap-hint">👆 点击翻回</span>
            </motion.div>
          )}
        </motion.div>
        <div className="flash-nav">
          <button className="btn-prev" onClick={prev} disabled={index === 0}>← 上一个</button>
          <button className="btn-shuffle" onClick={shuffle}>🔀 随机</button>
          <button className="btn-next" onClick={next} disabled={index === localShuffled.length - 1}>下一个 →</button>
        </div>
      </div>
      <ConfirmLeave show={showLeaveConfirm} onConfirm={() => navigate('/')} onCancel={() => setShowLeaveConfirm(false)} />
    </motion.div>
  )
}
