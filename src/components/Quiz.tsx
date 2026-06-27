import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../services/dataLoader'
import { playCorrect, playWrong, playComplete } from '../utils/sound'
import { getResultMsg } from '../utils/messages'
import { pickItems } from '../utils/shuffle'
import Confetti from './Confetti'
import SpeakerButton from './SpeakerButton'
import type { DataType, Question } from '../types'

const QUIZ_COUNT = 10

export default function Quiz() {
  const { grade, semester } = useParams<{ grade: string; semester: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const dataType: DataType = location.pathname.includes('sentence-') ? 'sentences' : 'words'
  const gradeNum = Number(grade)
  const sem = (semester === 'lower' ? 'lower' : 'upper') as 'upper' | 'lower'
  const { list, loading } = useData(gradeNum, dataType, sem)

  const questions = useMemo(() => {
    const selected = pickItems(list, QUIZ_COUNT, `quiz_${grade}_${dataType === 'sentences' ? 'sentence' : 'word'}`)
    return selected.map((word): Question => {
      const others = list
        .filter((w) => w.zh !== word.zh)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.zh)
      const options = [word.zh, ...others].sort(() => Math.random() - 0.5)
      return { en: word.en, correct: word.zh, options }
    })
  }, [list, grade, dataType])

  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = questions[qIndex] || { en: '', correct: '', options: [] }
  const progress = (qIndex / questions.length) * 100

  const handleAnswer = useCallback((opt: string) => {
    if (selected) return
    setSelected(opt)

    if (opt === current.correct) {
      setScore((s) => s + 1)
      playCorrect()
    } else {
      playWrong()
    }

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex((i) => i + 1)
        setSelected(null)
      } else {
        setFinished(true)
        playComplete()
      }
    }, 800)
  }, [selected, current, qIndex, questions.length])

  const getButtonClass = (opt: string): string => {
    let cls = 'quiz-option'
    if (selected) {
      if (opt === current.correct) cls += ' correct'
      else if (opt === selected) cls += ' wrong'
    }
    return cls
  }

  const result = finished ? getResultMsg(score, questions.length) : null

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
      <span className="page-deco" style={{ top: '8%', left: '5%' }}>🧠</span>
      <span className="page-deco" style={{ top: '20%', right: '8%', fontSize: 22, animationDelay: '1.5s' }}>🤔</span>
      <span className="page-deco" style={{ bottom: '12%', left: '8%', fontSize: 22, animationDelay: '3s' }}>💡</span>
      <div className="game-container">
        <div className="game-header">
          <button className="back-btn" onClick={() => navigate('/')}>← 返回</button>
          <span className="progress-text">{qIndex + 1} / {questions.length}</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="game-card"
            key={qIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <span className="game-hint-label">🤔 请选出正确的中文翻译</span>
            <motion.span
              className="quiz-question"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                {current.en}
                <SpeakerButton text={current.en} size={28} />
              </div>
            </motion.span>
            <div className="quiz-options">
              {current.options.map((opt, i) => (
                <motion.button
                  key={i}
                  className={getButtonClass(opt)}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                  whileTap={{ scale: 0.92 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {opt}
                  {selected && opt === current.correct && <span style={{ marginLeft: 6 }}>✓</span>}
                  {selected && opt === selected && opt !== current.correct && <span style={{ marginLeft: 6 }}>✗</span>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {finished && result && (
          <motion.div className="results-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {score >= 7 && <Confetti count={40} duration={3000} />}
            <motion.div
              className="results-card"
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <motion.div
                className="result-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                {result.emoji}
              </motion.div>
              <h2>{result.title}</h2>
              <div className="score">{score} / {questions.length}</div>
              <p className="result-message">{result.msg}</p>
              <div className="results-actions">
                <button className="btn-retry" onClick={() => window.location.reload()}>🔄 再来一次</button>
                <button className="btn-home" onClick={() => navigate('/')}>🏠 返回</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
